import pandas as pd
from math import radians, sin, cos, sqrt, atan2
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/get_paths_and_accidents": {"origins": "*", "supports_credentials": True}})

traindata=pd.read_csv('AccidentsBig.csv')

usedata = traindata[['Accident_Index','longitude','latitude','Accident_Severity']]

usedata = usedata.dropna()

def get_paths_between_points(api_key, origin, destination, alternatives=True):
    # Define the API endpoint URL
    endpoint = 'https://maps.googleapis.com/maps/api/directions/json'

    # Define the parameters for the API request
    params = {
        'origin': origin,
        'destination': destination,
        'key': api_key,
        'alternatives': str(alternatives).lower()  # Convert boolean to string ('true' or 'false')
    }
    # Send the API request
    response = requests.get(endpoint, params=params)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        
        # Extract paths from the response
        paths = []
        if 'routes' in data:
            for route in data['routes']:
                steps = route['legs'][0]['steps']
                path = [(step['start_location']['lat'], step['start_location']['lng']) for step in steps]
                path.append((steps[-1]['end_location']['lat'], steps[-1]['end_location']['lng']))
                paths.append(path)
            return paths
        else:
            print("No routes found between the specified points.")
            return None
    else:
        print("Error:", response.status_code)
        return None
    

def haversine(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    # Haversine formula
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    distance = 6371 * c  # Earth radius in kilometers
    return distance

@app.route('/get_paths_and_accidents', methods=['GET'])
def get_paths_and_accidents():
    # Get origin and destination from the request
    origin = request.args.get('origin')
    destination = request.args.get('destination')

    distance_threshold = 1
    
    # Call the function to get paths between points
    api_key = 'AIzaSyC8tfwaEKz18BqOeJ8pPplFCjIxJsuNbrU'  # Replace with your Google Maps API key
    paths = get_paths_between_points(api_key, origin, destination, alternatives=True)
    print(paths)
    if paths:
        # Pre-process the dataset to filter accidents within a certain latitude and longitude range
        lat_min = min(lat for path in paths for lat, _ in path) - distance_threshold
        lat_max = max(lat for path in paths for lat, _ in path) + distance_threshold
        lon_min = min(lon for path in paths for _, lon in path) - distance_threshold
        lon_max = max(lon for path in paths for _, lon in path) + distance_threshold
        df_filtered = usedata[(usedata['latitude'].between(lat_min, lat_max)) & (usedata['longitude'].between(lon_min, lon_max))]

        # Count the number of accidents on each path
        accidents_counts = []
        for path_index, path in enumerate(paths, start=1):
            path_accident_severity = 0
            for _, accident in df_filtered.iterrows():
                for i in range(len(path) - 1):
                    lat1, lon1 = path[i]
                    lat2, lon2 = path[i + 1]
                    distance = haversine(accident['latitude'], accident['longitude'], lat1, lon1)
                    if distance <= distance_threshold:
                        path_accident_severity += accident['Accident_Severity']
                        break  # Move to the next accident 
            accidents_counts.append(path_accident_severity)

        # Combine paths and accident counts into a dictionary
        result = {'paths': paths, 'accidents_counts': accidents_counts}

        combined_data = list(zip(result['paths'], result['accidents_counts']))


        sorted_combined_data = sorted(combined_data, key=lambda x: x[1])

        sorted_paths, sorted_accidents_counts = zip(*sorted_combined_data)

        result['paths'] = sorted_paths
        result['accidents_counts'] = sorted_accidents_counts

        # Return the result as JSON
        return jsonify(result)
    else:
        return jsonify({'error': 'No paths found.'})
    
if __name__ == "__main__":
    app.run(debug=True)

