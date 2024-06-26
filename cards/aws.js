const video = document.getElementById('videoPlayer');
const videoList = document.getElementById('videoList').getElementsByTagName('li');
let currentVideoIndex = -1;
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
    currentVideoIndex = Array.prototype.indexOf.call(videoList, currentVideoElement);
    video.play();
}

function markAsWatched() {
    if (currentVideoElement) {
        currentVideoElement.classList.add('watched');
    }
}

function nextVideo() {
    if (currentVideoIndex < videoList.length - 1) {
        currentVideoIndex++;
        const nextVideoElement = videoList[currentVideoIndex];
        const videoSrc = nextVideoElement.getAttribute('onclick').match(/'(.*?)'/)[1];
        changeVideo(videoSrc, nextVideoElement.id);
    }
}

function prevVideo() {
    if (currentVideoIndex > 0) {
        currentVideoIndex--;
        const prevVideoElement = videoList[currentVideoIndex];
        const videoSrc = prevVideoElement.getAttribute('onclick').match(/'(.*?)'/)[1];
        changeVideo(videoSrc, prevVideoElement.id);
    }
}

function updateProgress() {
    const percentage = Math.floor((video.currentTime / video.duration) * 100);
    document.getElementById('progress').innerText = `${percentage}% watched`;
}
