class VideoPlayer {
    constructor(videoElement) {
        this.videoElement = videoElement;
        this.init();
    }

    init() {
        this.videoElement.controls = true;
        this.videoElement.volume = 0.5; // Set default volume
    }

    play() {
        this.videoElement.play();
    }

    pause() {
        this.videoElement.pause();
    }

    setVolume(value) {
        this.videoElement.volume = value;
    }
}

export default VideoPlayer;