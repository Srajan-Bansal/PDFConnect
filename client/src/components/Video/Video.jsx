import { useEffect, useRef, useState } from 'react';
import { useContextAPI } from '../../context/ContextAPI';
import { toast } from "react-toastify";

import './video.css';

const Video = () => {
    const { authUser } = useContextAPI();
    const [streams, setStreams] = useState([]);
    const [joined, setJoined] = useState(false);
    const videoGridRef = useRef();

    const getUserMedia = async () => {
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            setStreams((streams) => [...streams, newStream]);

            if (!videoGridRef.current) return;

            videoGridRef.current.srcObject = newStream;
            videoGridRef.current.play();
        } catch (err) {
            toast.error('Error getting user media');
            console.log(err);
        }
    };

    // useEffect(() => {
    //     // getUserMedia();
    // }, []);

    if (!joined) {

        return (
            <div className="video-container">
                <h2>Video Calling</h2>
                <div className="video-grid">
                    {/* {streams.map((stream) => ( */}
                    {/* // eslint-disable-next-line react/jsx-key */}
                    <div className="video-item">
                        <video autoPlay ref={videoGridRef}></video>
                        {authUser.name}
                    </div>
                    {/* ))} */}
                </div>
            </div>
        );
    }
};

export default Video;
