const constraints = {
  video: true,
  facingMode: { exact: 'environment' }
};

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  console.log("Let's get this party started")
}
navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {video.srcObject = stream});
function displayImage()
{
  const selectedFile = document.getElementById('fileinput')
  //var image =document.getElementById('output')
  //image.src = URL.createObjectURL(selectedFile.files[0]);
  //selectedFile.files[0]
  const img = new Image()
  img.src = URL.createObjectURL(selectedFile.files[0])
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  video.style.display="none"
  canvas.style.display ="inline"
  console.log(img)
  console.log("image uploaded")

  img.onload = function() {
      canvas.getContext('2d').drawImage(img, 0, 0,video.videoWidth,video.videoHeight);
      console.log('the image is drawn');
  }

}