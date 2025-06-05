import React, { useMemo } from 'react';
import './Chat.css'; // Importing the CSS file for styling
import { useEffect,useState} from 'react';
// Importing the socket.io-client library to handle real-time communication
import io from 'socket.io-client';


const Chat = () => {

    // Establish a connection to the Socket.IO server
// Replace 'http://localhost:3000' with your server URL if different
    const socket = useMemo(() => io('https://chatbot-server-khrn.onrender.com', { }), []); // Empty dependency array ensures this runs only once when the component mounts

    const [message, setMessage] = useState(''); // State to hold the message input
    const [receivedMessages, setReceivedMessages] = useState(' '); // State to hold received messages



    const handleSendMessage = (e) => {
    
        e.preventDefault(); // Prevent the default form submission behavior
        socket.emit('message', message); // Emit the message to the server
        setMessage(''); // Clear the input field after sending the message
       
    }
    useEffect(() => {
     // Connect to the Socket.IO server
      // This will automatically connect to the server when the component mounts
      socket.on('connect', () => {
        console.log('Connected to server with ID:', socket.id);
      });
    // Handle events from the server for with socket.emit method
      socket.on('Welcome', (message) => {
        console.log(message);
      });
    
      //Hndle events from the server for with socket.broadcast.emit method
      // This will log a message when a new user joins
      socket.on('message', (msg) => {
        console.log('Received message:', msg);
        setReceivedMessages(prevMessages => prevMessages + '\n' + msg); // Append the new message to the received messages
       
      }
      );
    
      // Cleanup on component unmount
      
    
      
    
    }, []);
    // ...


    return (
        <div>
        
        <h1 id='heading'>Chating App</h1>
        <form  onSubmit={handleSendMessage} >

        <input  value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Enter your message' id='input' />
        <button  type='submit' id='send'  >Send</button>   
        
        <h3 >Recived Massages</h3>
        <textarea id='recived' value={receivedMessages} readOnly></textarea>
        </form>
      
        
        </div>
        );
      }

      export default Chat;
