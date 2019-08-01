export default (fileName, audioRef) => {
    if(audioRef) {
        audioRef.current.play();
    }
    console.log(fileName)
}