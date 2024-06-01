import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { User } from "../context/User";
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';

export default function AccordionUsage({socket}) {

    const [reqdata, setReqdata] = useState([]);
    const { newUser } = useContext(User);
    const[notif,setNotif] = useState([]);
    
      useEffect(() => {
        
        socket.on('getNotification', ({imgurl,email}) => {
            // console.log("notification");

            setReqdata(old => { 
                return ([...old, {imgurl,email}])
            })

            console.log(reqdata);
        });

        socket.on('acceptedNotf', ({ email }) => {
            console.log("notification");

            if (newUser.email === email) {
                const tn = `${email} Your verification request has been accepted`;
                setNotif(old => [...old, tn]);
                console.log(notif);
            }
        });

      }, [socket]);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3500/req/getreqdata");
                setReqdata(response.data);
            //    console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

   

   useEffect(() => {
       const fetchNotif = async () => {
         try{
            const email = newUser.email;
            const response = await axios.post("http://localhost:3500/notif/getnotif",{email});
            setNotif(response.data); 
         }catch(err){
            console.error('Error fetching data:', err);                              
         }
       }
       fetchNotif();
   },[]);

   const background = {
    backgroundImage: 'url(https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    padding: '20px', // Optional: add some padding for inner content
    overflowY: 'auto' // Optional: if content overflows, enable vertical scrolling
  };

  return (

    
    <div style={background}>
    <div>
    {newUser.email === "priyanshusingh202010@gmail.com" ? (
        reqdata.map((element, index) => (
            <div key={index} style={{ maxWidth: '800px', margin: '10px auto' }}>
                <Accordion className='bg-stone-400'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='bg-stone-400'
                    >
                        Notification {index + 1}
                    </AccordionSummary>
                    <AccordionDetails>
                        {element.email} has requested to verify ID
                    </AccordionDetails>
                </Accordion>
            </div>
        ))
    ) : (
        notif.map((element, index) => (
            <div key={index} style={{ maxWidth: '800px', margin: '10px auto' }}>
                <Accordion className='bg-stone-400'>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className='bg-stone-400'
                    >
                        Notification {index + 1}
                    </AccordionSummary>
                    <AccordionDetails>
                        {element}
                    </AccordionDetails>
                </Accordion>
            </div>
        ))
    )}
</div>
</div>

  );
}
