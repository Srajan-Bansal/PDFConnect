import { useState } from "react";
import Chat from "../Chat/Chat";
import GenerativeAI from "../GenerativeAI/GenerativeAI";
import QuillRTE from "../../Quill/QuillRTE";
import './docs.css';

const Docs = () => {
    const [button, setButton] = useState(null);
    return (
        <>
            <button onClick={() => setButton('chat')}>Chat</button>
            <button onClick={() => setButton('GenerativeAI')}>GenerativeAI</button>

            <div className="docs-container" style={{ marginTop: '50px' }}>

                {button === 'chat' && <Chat />}
                {button === 'GenerativeAI' && <GenerativeAI />}
                {/* <Chat /> */}
                <QuillRTE />
            </div>
        </>
    )
}

export default Docs;
