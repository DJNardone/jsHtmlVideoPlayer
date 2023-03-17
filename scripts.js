// GLOBAL ELEMENTS
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// FUNCTIONS
// play/pause toggle
function togglePlay () {
    if(video.paused) {
        video.play();
    }   else {
        video.pause();
    }
};

// play & pause icon change 
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    //console.log(icon);
}

// video skip buttons
function skip() {
    //console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

// volume & playback rate sliders
function rangeSliders() {
    video[this.name] = this.value;
};

// video progress bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

// fast scrub on the video progress bar
function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    //console.log(e);
}

// EVENT LISTENERS
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(slider => slider.addEventListener("change", rangeSliders));
ranges.forEach(slider => slider.addEventListener("mousemove", rangeSliders));

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
