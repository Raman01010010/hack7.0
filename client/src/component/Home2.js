import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import img1 from "./image.png";
// import img2 from "./pexels-anna-shvets-4226140.jpg";
// import img3 from "./pexels-lukas-590016 (1).jpg"
import 'animate.css/animate.css';
import { useInView } from 'react-intersection-observer';
import About from "./AboutUs"
import Footer from "./Footer"
const Home2 = () => {
  const pageStyle = {
    background: '#212534',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });
  const [ref3, inView3] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  const [isScrollingIn1, setIsScrollingIn1] = useState(true);
  const [isScrollingIn2, setIsScrollingIn2] = useState(true);
  const [isScrollingIn3, setIsScrollingIn3] = useState(true);
  const [thresholdRange1, thresholdRange2] = [0, 250];
const [thresholdRange3, thresholdRange4] = [200, 550];
const [thresholdRange5, thresholdRange6] = [600, 900];
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
  
      if (offset >= thresholdRange1 && offset < thresholdRange2 && !isScrollingIn1) {
        setIsScrollingIn1(true);
      } else if ((offset < thresholdRange1 || offset >= thresholdRange2) && isScrollingIn1) {
        setIsScrollingIn1(false);
      }
  
      if (offset >= thresholdRange3 && offset < thresholdRange4 && !isScrollingIn2) {
        setIsScrollingIn2(true);
      } else if ((offset < thresholdRange3 || offset >= thresholdRange4) && isScrollingIn2) {
        setIsScrollingIn2(false);
      }
  
      if (offset >= thresholdRange5 && offset < thresholdRange6 && !isScrollingIn3) {
        setIsScrollingIn3(true);
      } else if ((offset < thresholdRange5 || offset >= thresholdRange6) && isScrollingIn3) {
        setIsScrollingIn3(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollingIn1, isScrollingIn2, isScrollingIn3]);

  return (
    <>
    <Element name="home2">
      <div style={pageStyle}>
        <div className="text-center text-white p-4">
          <h1 className="text-6xl mb-8 font-bold">Welcome to the BE Bop</h1>
          <div className="space-x-4 mt-8">
            <Link to="/signin" className="text-white">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </Link>
            <Link to="/signup" className="text-white">
              <button className="border border-green-500 hover:bg-green-500 hover:text-white text-green-500 font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </Link>
          </div>
          <div className="space-y-8">
            <motion.div className="flex items-center p-4 animate__animated animate__fadeInRight ">
              <motion.img
                ref={ref1}
                src={img1}
                alt="Image 1"
                className="w-2/5 rounded-lg mr-4"
                initial={{ opacity: 0, x: 50 }}
                animate={inView1 && isScrollingIn1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              />
              <div className="flex-1 ">
              <h1 className="text-4xl	">Your Carrear,Our Responsibilty</h1>

                <p>"Welcome to BeBop, your professional hub for networking, career growth, and skill showcase. Connect with professionals, build your digital resume, and explore opportunities in a vibrant community. Elevate your career journey with us!"</p>
              </div>
            </motion.div>
            <motion.div className="flex items-center p-4 animate__animated animate__fadeInLeft">
              <div className="flex-1">
            <h1 className="text-6xl	">Video Chat</h1>
                <p className="text-xl mb-4">
                  Connect face-to-face effortlessly with our Video Chat feature. Seamlessly conduct virtual meetings, interviews, or networking sessions. Experience the power of real-time communication, fostering meaningful connections in a digital world.
                </p>
              </div>
              <motion.img
                ref={ref2}
                src={img1}
                alt="Image 2"
                className="w-2/5 rounded-lg ml-4"
                initial={{ opacity: 0, x: -50 }}
                animate={inView2 && isScrollingIn2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              />
            </motion.div>
            <motion.div className="flex items-center p-4 animate__animated animate__fadeInRight">
              <motion.img
                ref={ref3}
                src={img1}
                alt="Image 3"
                className="w-2/5 rounded-lg mr-4"
                initial={{ opacity: 0, x: 50 }}
                animate={inView3 && isScrollingIn3 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1 }}
              />
              <div className="flex-1">
              <h1 className="text-6xl	">Resume Builder</h1>

                <p>                  Build your professional narrative seamlessly with our Resume Builder. Craft customized resumes, showcase your skills, and make a lasting impression. Elevate your career journey with ease and precision using our intuitive and powerful resume-building feature.
</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Element>
   
    <div style={{ padding: '10vh' }}>
  <About />
</div>
<div style={{ padding: '10vh' }}>
  <Footer />
</div>

    </>
  );
};

export default Home2;
