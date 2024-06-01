import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from "../context/User";
import { makeRequest } from '../api/api';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const GoAuthorize = ({ socket }) => {

    const [userType, setUserType] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    const { newUser } = useContext(User);



    useEffect(() => {
        const handleAcceptedNotification = () => {
            console.log("your request is accepted");
        };
        if (socket) {
            socket.on('acceptedNotf', handleAcceptedNotification);
        }
    }, [socket]);



    useEffect(() => {
        if (newUser?.email === 'priyanshusingh202010@gmail.com') {
            navigate('/adminpage');
        }
    }, [newUser, navigate]);


    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        try {
            const data = new FormData();
            data.append("file", selectedFile);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushproj");

            const response = await fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            const imgUrl = result.url.toString();

            const payload = {
                imgurl: imgUrl,
                email: newUser.email,
                receiveremail: "priyanshusingh202010@gmail.com"
            };

            if (socket) {
                console.log("hlo man");
                socket.emit("RequestingToAuth", payload);
            }

            try {
                const res = await makeRequest(payload);
                navigate('/dashboard');
            } catch (err) {
                console.error("Error making request:", err);
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div style={{ 
            backgroundImage: 'url(https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
            <div className='mt-60'>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 bg-slate-400 p-10 rounded-lg">
                    <form className="max-w-sm mx-auto">
                        <div className="mt-4">
                            <label
                                htmlFor="id-card"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white font-bold"
                            >
                                Upload ID Card
                            </label>
                            <input
                                type="file"
                                id="id-card"
                                className="bg-gray-50 border border-gray-300 font-bold text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload
                        </button>
                        <div className='font-bold'>If you want to Register As Authority, then You Have to upload Your ID</div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default GoAuthorize;
