import { useState, useRef } from 'react';
import { useContextAPI } from './../../context/ContextAPI';
import './Video.css';

const Video = () => {
    const { data } = useContextAPI();
    const [users, setUsers] = useState([]);
    const myVideo = useRef();

    return (
        <div className="video-call-container">
            <div className="video-wrapper">
                <div className="video-item">
                    <video playsInline muted ref={myVideo} autoPlay className="video" />
                    <div className="video-name">Alice</div>
                </div>
                {users.map(user => (
                    user.id !== 1 && user.stream && (
                        <div key={user.id} className="video-item">
                            <video playsInline ref={(ref) => { if (ref) ref.srcObject = user.stream }} autoPlay className="video" />
                            <div className="video-name">{user.name}</div>
                        </div>
                    )
                ))}
            </div>
            <button
            //   onClick={() => callUser(/* Pass the signal data and userId */)}
            >
                Call User
            </button>
        </div>
    )
}

export default Video
