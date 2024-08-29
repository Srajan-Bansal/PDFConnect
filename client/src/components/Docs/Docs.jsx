import { useState } from "react";
import Chat from "../Chat/Chat";
import GenerativeAI from "../GenerativeAI/GenerativeAI";
import QuillRTE from "../../Quill/QuillRTE";
import './docs.css';

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
            <button className="extract-btn" style={{ marginLeft: "25px" }} onClick={() => handleClick('chat')}>Chat</button>
            <button className="extract-btn" style={{ marginLeft: "25px" }} onClick={() => handleClick('GenerativeAI')}>GenerativeAI</button>

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
