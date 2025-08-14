if ($(".podcast-container").length > 0) {
    let audio = new Audio();
    let currentPlayingButton = null;
    let firstAudioPlayed = false;  // Track if first audio has played
    
    const playPauseButton = document.getElementById('podcast-playPauseButton');
    const podcastImage = document.getElementById('podcastImage');

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;

    let bufferLength = analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    let source = null;
    let animationId = null;

    const connectAudioGraph = () => {
        if (!source) {
            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
        }
    };

    const ensureAudioContextActive = async () => {
        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }
    };

    const drawWaveform = () => {
        animationId = requestAnimationFrame(drawWaveform);
        const canvas = document.getElementById('podcast-waveform');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteTimeDomainData(dataArray);
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        
        let sliceWidth = canvas.width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            let v = dataArray[i] / 128.0;
            let y = v * canvas.height / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            x += sliceWidth;
        }
        
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    };

    // ✅ Play/Pause Button for Main Podcast Controls
    window.playPauseAudio = async () => {
        await ensureAudioContextActive();
        connectAudioGraph();

        if (audio.paused) {
            if (!firstAudioPlayed) {
                const firstButton = document.querySelector(".podcast-play-button");
                if (firstButton) {
                    await playAudio(firstButton); // Automatically play first audio
                    firstAudioPlayed = true;
                }
            } else {
                audio.play();
                drawWaveform();
            }

            playPauseButton.src = playPauseButton.getAttribute('data-pause-src');
            if (currentPlayingButton) {
                currentPlayingButton.innerHTML = "⏸ PAUSE";
            }
        } else {
            audio.pause();
            playPauseButton.src = playPauseButton.getAttribute('data-play-src');

            if (currentPlayingButton) {
                currentPlayingButton.innerHTML = "▶ PLAY";
            }
        }
    };

    // ✅ Play/Pause for Episode Buttons
    window.playAudio = async (buttonElement) => {
        await ensureAudioContextActive();
        connectAudioGraph();
    
        const audioSrc = buttonElement.getAttribute('data-audio-src');
        const episodeImage = buttonElement.getAttribute('data-image-src');

        // 🔹 If clicking the same button, toggle play/pause
        if (currentPlayingButton === buttonElement) {
            if (audio.paused) {
                audio.play();
                drawWaveform();
                buttonElement.innerHTML = "⏸ PAUSE";
                buttonElement.style.backgroundColor = "#005e9e"; // Active color
                buttonElement.style.color= "#EEEFF5";
                playPauseButton.src = playPauseButton.getAttribute('data-pause-src');
            } else {
                audio.pause();
                buttonElement.innerHTML = "▶ PLAY";
                buttonElement.style.backgroundColor = ""; // Reset color
                buttonElement.style.color = "";
                playPauseButton.src = playPauseButton.getAttribute('data-play-src');
            }
            return;
        }

        // 🔹 If clicking a different button, stop previous audio and reset styles
        if (currentPlayingButton && currentPlayingButton !== buttonElement) {
            currentPlayingButton.innerHTML = "▶ PLAY";
            currentPlayingButton.style.backgroundColor = ""; // Reset previous button color
            currentPlayingButton.style.color = "";
            audio.pause(); // Stop previous audio
        }

        // 🔹 Set new audio source and play
        audio.src = audioSrc;
        podcastImage.src = episodeImage;
        audio.play().then(() => {
            drawWaveform();
            playPauseButton.src = playPauseButton.getAttribute('data-pause-src');
            buttonElement.innerHTML = "⏸ PAUSE";
            buttonElement.style.backgroundColor = "#005e9e"; // Active color
            buttonElement.style.color= "#EEEFF5";
            currentPlayingButton = buttonElement; // Update currently playing button
            firstAudioPlayed = true;  // Mark first audio as played
        }).catch(error => console.error('Audio play error:', error));
    };

    // Reset button color when audio ends
    audio.addEventListener("ended", () => {
        if (currentPlayingButton) {
            currentPlayingButton.innerHTML = "▶ PLAY";
            currentPlayingButton.style.backgroundColor = ""; // Reset color
            currentPlayingButton.style.color = "";
        }
    });

    // Rewind & Forward Functions
    window.rewindAudio = () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    window.forwardAudio = () => {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    };

    // Ensure UI Updates on Pause
    audio.addEventListener('pause', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        if (currentPlayingButton) {
            currentPlayingButton.innerHTML = "▶ PLAY";
        }

        playPauseButton.src = playPauseButton.getAttribute('data-play-src');
    });
}