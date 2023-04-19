// Convert DataURL to File
const dataURLtoFile = (dataurl) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);



  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], "capture.jpg", { type: mime });
};


// import React, { useRef, useState } from 'react';



// function ImageCaptureApp() {
//   const [imageData, setImageData] = useState(null);
//   const imageCaptureRef = useRef(null);



//   const handleCapture = () => {
//     const context = imageCaptureRef.current.getContext('2d');
//     const imageData = context.getImageData(0, 0, imageCaptureRef.current.width, imageCaptureRef.current.height);
//     setImageData(imageData);
//   };



//   const handleSave = () => {
//     const dataString = JSON.stringify(imageData);
//     const file = new Blob([dataString], { type: 'text/plain' });
//     const fileUrl = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = fileUrl;
//     a.download = 'captured-image.txt';
//     a.click();
//   };



//   return (
//     <div>
//       <canvas ref={imageCaptureRef} width={300} height={300} />
//       <button onClick={handleCapture}>Capture</button>
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// }

// export default ImageCaptureApp;