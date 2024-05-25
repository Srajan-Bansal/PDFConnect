import Chat from "../Chat/Chat";
import QuillRTE from "../../Quill/QuillRTE";
import './docs.css';

const Docs = () => {
    return (
        <div className="docs-container">
            <Chat />
            <QuillRTE />
        </div>
    )
}

export default Docs;
