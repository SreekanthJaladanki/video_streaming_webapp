const video = document.getElementById('videoPlayer');
let currentVideoElement = null;

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

function changeVideo(videoSrc, elementId) {
    video.src = videoSrc;
    currentVideoElement = document.getElementById(elementId);
    video.play();
}

function markAsWatched() {
    if (currentVideoElement) {
        currentVideoElement.classList.add('watched');
    }
}
