import { useState } from "react";
import Chat from "../Chat/Chat";
import GenerativeAI from "../GenerativeAI/GenerativeAI";
import QuillRTE from "../../Quill/QuillRTE";
import './docs.css';
import { Helmet } from 'react-helmet-async';

const Docs = () => {
    const [button, setButton] = useState(null);

    const handleClick = (value) => {
        if (button === value) {
            setButton(null);
        } else {
            setButton(value);
        }
    }

    return (
        <>
            <Helmet>
                <title>Document Editing - PDFConnect</title>
                <meta name="description" content="Edit, convert, and manage your documents easily on PDFConnect." />
                <meta name="keywords" content="Document editing, PDF tools, PDFConnect, document management" />
            </Helmet>
            <button className="extract-btn" style={{ marginLeft: "25px" }} onClick={() => handleClick('chat')}>Chat</button>
            <button className="extract-btn" style={{ marginLeft: "25px" }} onClick={() => handleClick('GenerativeAI')}>Gemini</button>

            <div className="docs-container" style={{ marginTop: '50px' }}>
                {button === 'chat' && <Chat />}
                {button === 'GenerativeAI' && <GenerativeAI />}
                <QuillRTE />
            </div>
        </>
    )
}

export default Docs;
