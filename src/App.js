import React, { useRef, useEffect, useState } from 'react'


const App = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [hashPhoto, setHashPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 640,
        height: 480,
        facingMode: "environment"

      }
    }).then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
      .catch(err => {
        console.error(err);
      })
  }


  const dataURLtoFile = (dataurl) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    console.log(dataurl);
    const data = new File([u8arr], "capture.jpg", { type: mime });
    data.download = 'captured-image.txt'
    
    const imgfile = new FormData()
    imgfile.append("image", data);
    console.log(imgfile);
  };




  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    const video = videoRef.current;
    const photo = photoRef.current;

    photo.width = width;
    photo.height = height;


    const cxt = photo.getContext('2d');
    cxt.drawImage(video, 0, 0, width, height);
    setHashPhoto(true);
    setImageData(photoRef.current.toDataURL("image/jpeg"));
    dataURLtoFile(photoRef.current.toDataURL("image/jpeg"));
  }

  const closePhoto = () => {
    const photo = photoRef.current;
    const ctx = photo.getContext('2d');
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHashPhoto(false);

  }

  const handleSave = () => {
    const dataString = JSON.stringify(imageData);
    const file = new Blob([dataString], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'captured-image.txt';
    a.click();
  }

  // const handleSave  = (img) => {
  //   const link = document.createElement("a");
  //   link.download = "capture.jpg";
  //   link.href = img;
  //   link.click();
  //   link.remove();
  // };


  useEffect(() => {
    getVideo();
  }, [videoRef]);



  return (
    <div>
      <div className="camera">
        <video src="" ref={videoRef}></video>
        <button onClick={takePhoto}>SNAP</button>
      </div>

      <div className={'result' + (hashPhoto ? 'hashPhoto' : '')}>
        {/* <canvas ref={}></canvas> */}

        <canvas ref={photoRef} width={300} height={300} />
        <button onClick={closePhoto}>CLOSE!</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}

export default App