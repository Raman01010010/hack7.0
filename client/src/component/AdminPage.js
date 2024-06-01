import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { User } from "../context/User";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import { io } from "socket.io-client";
// const socket = io("http://localhost:3500");

const AdminPage = ({socket}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [reqdata, setReqdata] = useState([]);
    const [currentCardData, setCurrentCardData] = useState(null); 

    const { newUser } = useContext(User);

      useEffect(() => {
        
        socket.on('getNotification', ({imgurl,email}) => {
            console.log("notification");
            setReqdata(old => { 
                return ([...old, {imgurl,email}])
            })
            console.log(reqdata);
        });

      }, [socket]);

      
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3500/req/getreqdata");
                setReqdata(response.data);
                console.log("mai idhar hu ",response.data);
            } catch (error) {
                console.error(' mau Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleRequestClick = (data) => {
        setCurrentCardData(data); // Update the current card data
        // console.log("hey this is card data", currentCardData);
    };

    const deleteReq = async () => { 
        
        try {
            const res = await axios.post("http://localhost:3500/delete/deleteReq", { currentCardData });
            console.log("Response data:", res.data);
            toast.success("Request deleted successfully!");
            const email = currentCardData.email;
            socket.emit('rejected',{email});
        } catch (error) {
            console.error("Error deleting data:", error);
            toast.error("Error deleting request. Please try again later.");
        }
    };
    

    const acceptReq = async() => {
         
        try {
            const res = await axios.post("http://localhost:3500/accept/acceptReq", { currentCardData });
            console.log("Response data:", res.data);
            toast.success("Request accepted successfully!");
            const email = currentCardData.email;
            socket.emit('accepted',{email});
        } catch (error) {
            console.error("Error accepting data:", error);
            toast.error("Error accepting request. Please try again later.");
        }

    }

    return (
        <div style={{ 
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/008/014/115/non_2x/tropical-leaves-background-design-summer-leaves-flat-illustration-simple-banner-with-copy-space-free-vector.jpg)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            width: '100vw', 
            height: '100vh', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center'
          }}>
            <div className="flex flex-wrap justify-center space-x-96 mt-16 w-full px-4">
                <div className="relative max-w-sm min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
                    <div className="card bg-slate-300 py-6 border-2 border-black rounded-xl">
                        <div className="card-header mx-auto">
                            <a href="#" blur-shadow-image="true">
                                <img
                                    className="w-auto rounded-lg"
                                    style={{ width: '300px', height: '200px' }}
                                    src={currentCardData ? currentCardData.imgurl : "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"}
                                    alt="card-image"
                                />
                            </a>
                        </div>

                        <div className="card-body flex justify-around mt-6">
                            <button onClick={acceptReq} className="button bg-green-500 text-white py-2 px-4 rounded" data-ripple-light="true">
                                Accept
                            </button>
                            <button onClick={deleteReq} className="button bg-red-500 text-white py-2 px-4 rounded" data-ripple-light="true">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dropdown */}

                <div className="flex justify-center mt-10">
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                                id="menu-button"
                                aria-expanded={isOpen}
                                aria-haspopup="true"
                                onClick={toggleDropdown}
                            >
                                Show All Requests
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {isOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" style={{ maxHeight: 'calc(100vh - 2rem)' }}>
                                <div className="py-1" role="none">
                                    {reqdata.map((key, index) => {
                                        // const emailLength = key.email.length;
                                        // const boxWidth = emailLength * 8;

                                        return (
                                            <a
                                            key={index}
                                            href="#"
                                            className="text-gray-700 block px-4 py-2 text-sm"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id={`menu-item-${index}`}
                                            style={{ width: "200px",  }} // Set a fixed width here
                                            onClick={() => handleRequestClick(key)} // Set current card data on click
                                        >
                                            <button>{key.email}</button>
                                        </a>
                                        
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div> 
            <ToastContainer />

        </div>
    );
};

export default AdminPage;
