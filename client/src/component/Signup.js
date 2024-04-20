import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addClient, addUser } from '../api/api';

export default function Signup() {
  const [col, setCol] = React.useState('gray');
  const [userType, setUserType] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: Number, 
    idCardPhoto: null,
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    const delay = 500;
    const timerId = setTimeout(async () => {
      const t = await addUser(newUser);
      if (t.status === 200) {
        setCol('red');
      }
      if (!t.data?.email) {
        setCol('gray');
      }
      console.log(t.data);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [newUser]);

  async function handleSubmit() {
    const res = await addClient(newUser);
    console.log(res);
    if (res.status === 201 || res.status === 202) {
      console.log('success');
      navigate('/otp');
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleChange2 = (e) => {
    const selectedUserType = e.target.value;
    setUserType(selectedUserType);
    let role;
    if (selectedUserType === "authority") {
      role = 1;
    } else {
      role = 0;
    }
    setNewUser((prevUser) => ({
      ...prevUser,
      role: role,
    }));
  };
   

  const handleIdCardPhotoUpload = (e) => {
    const file = e.target.files[0];
    setNewUser((prevUser) => ({
      ...prevUser,
      idCardPhoto: file,
    }));
  };
  
  console.log("JHJIHIUHIUHIUIHUHUHUH",newUser);

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white">
              Create Account Now
            </h1>
            <p className="leading-relaxed mt-4">Join Us Today</p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-white text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                className={`w-full bg-${col}-600 bg-opacity-20 focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="user-type"
                className="leading-7 text-sm text-gray-400"
              >
                User Type
              </label>
              <select
                id="user-type"
                name="user-type"
                value={userType}
                onChange={handleChange2}
                className="w-full bg-gray-600 bg-black focus:bg-transparent  focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                <option value="user " className='text-black	font-bold'>User</option>
                <option value="authority" className='text-black	font-bold'>Authority</option>
              </select>
            </div>
            {/* Conditional rendering of ID card photo upload field */}
            {userType === 'authority' && (
              <div className="relative mb-4">
                <label
                  htmlFor="id-card-photo"
                  className="leading-7 text-sm text-gray-400"
                >
                  Upload ID Card Photo
                </label>
                <input
              type="file"
              id="id-card-photo"
              name="id-card-photo"
              onChange={handleIdCardPhotoUpload}
              className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
            >
              Sign Up
            </button>
            <p className="text-xs mt-3">
              Literally you probably haven't heard of them jean shorts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
