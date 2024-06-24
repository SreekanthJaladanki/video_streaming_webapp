const video = document.getElementById('videoPlayer');

function playPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
}

function skip(value) {
    video.currentTime += value;
}

function setVolume(value) {
    video.volume = value;
}

function changeVideo(videoSrc) {
    video.src = videoSrc;
    video.play();
}
