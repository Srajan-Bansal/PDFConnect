import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FaComments } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import './Chat.css';
import config from './../../config';
import { useContextAPI } from './../../context/ContextAPI';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const { authUser } = useContextAPI();
    const { id: documentID } = useParams();

    useEffect(() => {
        const s = io(`${config.viewAPI}/chat`);
        setSocket(s);
        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket == null) return;

        socket.once('load-messages', messages => {
            setMessages(messages);
        })
        socket.emit('get-messages', documentID);
    }, [socket, documentID]);

    useEffect(() => {
        if (socket == null) return;

        socket.on('receive-message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('receive-message');
        }
    }, [socket]);

    function handleSubmit(e) {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        console.log(authUser._id);
        const message = { senderId: authUser._id, name: authUser.name, text: newMessage, timestamp: new Date() }
        socket.emit('send-message', { message, documentID });
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage('');
    }

    return (
        <>
            <Helmet>
                <title>Chat - PDFConnect</title>
                <meta name="description" content="Use PDFConnect chat for real-time collaboration on documents." />
                <meta name="keywords" content="Chat, collaboration, real-time chat, PDFConnect" />
            </Helmet>
            <div className='chat-container'>
                <div className="chat-header">
                    <FaComments />
                    <span>Chat</span>
                </div>

                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div className={`message ${message.senderId === authUser._id ? 'sent' : 'received'}`} key={index}>
                            <strong>{message.name}</strong>: <br /> {message.text}
                            <span className='timestamp'>{new Date(message.timestamp).toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <form className='chat-input' onSubmit={handleSubmit}>
                    <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder='Type your message...' />
                    <button type='submit'>Send</button>
                </form>
            </div>
        </>
    );
};

export default Chat;
