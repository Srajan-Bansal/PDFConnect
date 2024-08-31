import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { useContextAPI } from './../../context/ContextAPI';
import './../Chat/Chat.css';
import config from './../../config';
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const GenerativeAI = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const { authUser } = useContextAPI();
    const { id } = useParams();

    useEffect(() => {
        try {
            const savedMessages = JSON.parse(localStorage.getItem(id) || '[]');
            setMessages(savedMessages);
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const prompt = newMessage;
        setNewMessage('');

        const userMessage = { name: authUser.user.name, text: prompt, isSender: true };
        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, userMessage];
            localStorage.setItem(id, JSON.stringify(updatedMessages));
            return updatedMessages;
        });

        try {
            const response = await axios.post(`${config.viewAPI}/generativeText`, { prompt }, {
                withCredentials: true
            });

            const generatedMessage = response.data;
            if (response.status === 200 && typeof generatedMessage === 'string') {
                const aiMessage = { name: 'Gemini', text: generatedMessage, isSender: false };
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, aiMessage];
                    localStorage.setItem(id, JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    }

    return (
        <>
            <Helmet>
                <title>Gemini Powered AI - PDFConnect</title>
                <meta name="description" content="Use generative AI tools for advanced document management and insights on PDFConnect." />
                <meta name="keywords" content="Generative AI, PDFConnect, document insights, AI tools" />
            </Helmet>
            <div className='chat-container'>
                <div className="chat-header">
                    <FaComments />
                    <span>Gemini Powered AI</span>
                </div>

                <div className="chat-body">
                    {messages.map((message, index) => (
                        <div className={`message ${message.isSender ? 'sent' : 'received'}`} key={index}>
                            <strong>{message.name}</strong>: <br /> {message.text}
                        </div>
                    ))}
                </div>

                <form className='chat-input' onSubmit={handleSubmit}>
                    <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder='Type your message...' />
                    <button type='submit'>Send</button>
                    <button type='button' onClick={() => {
                        localStorage.removeItem(id);
                        setMessages([]);
                    }}>Clear</button>
                </form>
            </div>
        </>
    );
}

export default GenerativeAI;
