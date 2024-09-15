import './Chat.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FaComments } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { baseURL } from './../../config';
import { useContextAPI } from './../../context/ContextAPI';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const { authUser } = useContextAPI();
    const { id: documentID } = useParams();

    const SAVE_INTERVAL_MS = import.meta.env.VITE_CHAT_SAVE_INTERVAL_MS || 30000;

    useEffect(() => {
        const s = io(`${baseURL}/chat`);
        setSocket(s);
        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.once('load-messages', (messages) => {
            setMessages(messages);
        });

        socket.emit('get-messages', documentID);
    }, [socket, documentID]);

    useEffect(() => {
        if (!socket) return;

        socket.on('receive-message', (message) => {
            setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, message] : [message]);
        });

        return () => {
            socket.off('receive-message');
        }
    }, [socket]);

    useEffect(() => {
        if (!socket) return;
        const interval = setInterval(() => {
            const unsavedMessages = JSON.parse(localStorage.getItem('unsavedMessages')) || [];
            if (unsavedMessages.length === 0) return;
            socket.emit('save-message-batch', { messages: unsavedMessages, documentID });
            localStorage.removeItem('unsavedMessages');
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        }
    }, [socket, documentID, SAVE_INTERVAL_MS]);

    function handleSubmit(e) {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const message = { senderId: authUser.user._id, name: authUser.user.name, text: newMessage, timestamp: new Date() };

        const unsavedMessages = JSON.parse(localStorage.getItem('unsavedMessages')) || [];
        localStorage.setItem('unsavedMessages', JSON.stringify([...unsavedMessages, message]));

        socket.emit('send-message', { message, documentID });
        setMessages((prevMessages) => Array.isArray(prevMessages) ? [...prevMessages, message] : [message]);
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
                    {messages?.map((message, index) => (
                        <div className={`message ${message.senderId === authUser.user._id ? 'sent' : 'received'}`} key={index}>
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
