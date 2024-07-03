const video = document.getElementById('videoPlayer');
const videoList = document.getElementById('videoList').getElementsByTagName('li');
let currentVideoIndex = -1;
let currentVideoElement = null;

const videoDescriptions = {
    video1: [
        "Introduction to IT Resources",
        "Understanding AWS Services",
        "Best Practices for Resource Management",
        "Common Pitfalls and Solutions"
    ],
    video2: [
        "Video 2 Topic 1",
        "Video 2 Topic 2",
        "Video 2 Topic 3"
    ],
    video3: [
        "Video 3 Topic 1",
        "Video 3 Topic 2",
        "Video 3 Topic 3"
    ],
    // Add descriptions for other videos here
};

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
    updateDescription(elementId);
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

function updateDescription(videoId) {
    const descriptionContainer = document.getElementById('description');
    const descriptionList = videoDescriptions[videoId] || [];
    descriptionContainer.innerHTML = `
        <h2>Video Description</h2>
        <p>This video covers the following topics:</p>
        <ul>
            ${descriptionList.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
}
