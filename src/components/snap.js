import React, { useRef, useEffect, useState } from 'react'


const APP = () => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hashPhoto, setHashPhoto] = useState(false);
    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1920,
                height: 1080
            }
        }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getVideo();

    }, [videoRef])



    return (



        <div>
            <div className="camera">
                <video src="" ref={videoRef}></video>
                <button>SNAP</button>
            </div>
            <div className={'result' + (hashPhoto ? 'hashPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button>CLOSE!</button>
            </div>
        </div>
    )
}

export default APP