if (document.querySelector(".podcastsVideo")) {
    let video = document.createElement("video");
    video.controls = true;
    let currentPlayingButton = null;
    const podcastVideoContainer = document.getElementById('podcastVideoContainer');
    podcastVideoContainer.appendChild(video);
    // Play Video when Clicking on a Button
    window.playVideo = async (buttonElement) => {
        const videoSrc = buttonElement.getAttribute('data-video-src');
        const episodeImage = buttonElement.getAttribute('data-image-src');

        // If clicking the same button, toggle play/pause
        if (currentPlayingButton === buttonElement) {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updateAllButtons(video.paused);
            return;
        }

        // Set new video source and play
        video.src = videoSrc;
        video.poster = episodeImage;
        currentPlayingButton = buttonElement;
        video.play().then(() => {
            updateAllButtons(false);
        }).catch(error => console.error('Video play error:', error));
    };

    // Handle Video End (Ensure Replay Works Correctly)
    video.addEventListener("ended", () => {
        updateAllButtons(true); // Update button to "Play" when video ends
    });

    video.addEventListener('pause', () => {
        updateAllButtons(true);
    });

    video.addEventListener('play', () => {
        updateAllButtons(false);
    });

    // Auto-play the first video on page load & update button state
    window.onload = () => {
        const firstButton = document.querySelector(".podcastsVideo .podcast-play-button");
        if (firstButton) {
            playVideo(firstButton);
            currentPlayingButton = firstButton;  // Ensure the button is set
        }
    };

    function updateAllButtons(isPaused) {
        document.querySelectorAll(".podcast-play-button").forEach(button => {
            if (button === currentPlayingButton) {
                button.innerHTML = isPaused ? "▶ Play" : "⏸ Pause";
                button.style.backgroundColor = isPaused ? "" : "#005e9e";
                button.style.color = isPaused ? "" : "#EEEFF5";
            } else {
                button.innerHTML = "▶ Play";
                button.style.backgroundColor = "";
                button.style.color = "";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".podcastVideo-mobile", {
        slidesPerView: 1.05,
        spacebetween: 10,
        mousewheel: {
            forceToAxis: true,
        },
        loop: true,
        navigation: {
            nextEl: ".podcast-swiper-button-next",
            prevEl: ".podcast-swiper-button-prev",
        },
        pagination: {
            el: ".podcastvideo-swiperpagination",
            clickable: true,
        },
    });
})
