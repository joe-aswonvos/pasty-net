document.addEventListener('DOMContentLoaded', () => {
    // Hero Carousel Logic
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
    }

    setInterval(nextSlide, 5000);

    // Whack-a-Mole Game Logic
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.getElementById('score');
    const timeBoard = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    const gameArea = document.querySelector('.game-area');
    const playPauseButton = document.getElementById('play-pause-button');
    const backgroundAudio = document.getElementById('background-audio');
    let lastMole;
    let timeUp = false;
    let score = 0;
    let time = 60;
    let timer;
    let consecutiveMisses = 0;

    // Set initial volume and play audio
    backgroundAudio.volume = 0.1;
    
    // Attempt to play audio and handle autoplay restrictions
    function playAudio() {
        backgroundAudio.play().catch(error => {
            console.log('Autoplay prevented:', error);
            // Show a message or button to prompt user interaction
        });
    }

    playAudio();


    // Update play/pause button icon based on audio state
    function updatePlayPauseButton() {
        if (backgroundAudio.paused) {
            playPauseButton.classList.remove('fa-pause');
            playPauseButton.classList.add('fa-play');
        } else {
            playPauseButton.classList.remove('fa-play');
            playPauseButton.classList.add('fa-pause');
        }
    }

    // Map keys to mole IDs
    const keyMap = {
        'Q': 'mole1',
        'W': 'mole2',
        'E': 'mole3',
        'A': 'mole4',
        'S': 'mole5',
        'D': 'mole6',
        'Z': 'mole7',
        'X': 'mole8',
        'C': 'mole9'
    };

    // Generate a random time between min and max
    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    // Select a random mole that is not the same as the last one
    function randomMole(moles) {
        const idx = Math.floor(Math.random() * moles.length);
        const mole = moles[idx];
        if (mole === lastMole) {
            return randomMole(moles);
        }
        lastMole = mole;
        return mole;
    }

    // Show moles for a random time
    function peep() {
        let minTime = 1000; // 1 second
        let maxTime = 1000; // 1 second
        let moleCount = 1;

        if (score >= 10) {
            minTime = 500; // 0.5 seconds
            maxTime = 500; // 0.5 seconds
            moleCount = 2;
        }

        if (score >= 20) {
            minTime = 300; // 0.3 seconds
            maxTime = 300; // 0.3 seconds
            moleCount = 3;
        }

        const time = randomTime(minTime, maxTime);
        const molesToShow = [];
        for (let i = 0; i < moleCount; i++) {
            const mole = randomMole(moles);
            molesToShow.push(mole);
            mole.classList.add('up');
        }

        setTimeout(() => {
            molesToShow.forEach(mole => mole.classList.remove('up'));
            if (!timeUp) peep();
        }, time);
    }

    // Start the game
    function startGame() {
        score = 0;
        time = 60;
        consecutiveMisses = 0;
        scoreBoard.textContent = score;
        gameArea.classList.remove('miss-one', 'miss-two');
        gameArea.style.borderColor = 'green';
        timeBoard.textContent = time;
        timeUp = false;
        startButton.textContent = 'Stop Game';
        peep();
        timer = setInterval(() => {
            time--;
            timeBoard.textContent = time;
            if (time <= 0) {
                clearInterval(timer);
                timeUp = true;
                startButton.textContent = 'Start Game';
            }
        }, 1000);
    }

    // Stop the game
    function stopGame() {
        clearInterval(timer);
        timeUp = true;
        startButton.textContent = 'Start Game';
    }

    // Handle mole hit
    function hitMole(mole) {
        if (mole.classList.contains('up')) {
            mole.classList.remove('up');
            mole.classList.add('whack');
            mole.textContent = 'Whack!';
            score++;
            scoreBoard.textContent = score;
            consecutiveMisses = 0;
            gameArea.classList.remove('miss-one', 'miss-two');
            gameArea.style.borderColor = 'green';
            setTimeout(() => {
                mole.classList.remove('whack');
                mole.textContent = Object.keys(keyMap).find(key => keyMap[key] === mole.id);
            }, 500);
        } else {
            mole.classList.add('miss');
            mole.textContent = 'Miss!';
            consecutiveMisses++;
            if (consecutiveMisses === 1) {
                gameArea.classList.add('miss-one');
            } else if (consecutiveMisses === 2) {
                score--;
                scoreBoard.textContent = score;
                consecutiveMisses = 0;
                gameArea.classList.remove('miss-one');
                gameArea.classList.add('miss-two');
                setTimeout(() => {
                    gameArea.classList.remove('miss-two');
                    gameArea.style.borderColor = 'green';
                }, 500);
            }
            setTimeout(() => {
                mole.classList.remove('miss');
                mole.textContent = Object.keys(keyMap).find(key => keyMap[key] === mole.id);
            }, 500);
        }
    }

    // Add event listeners to moles
    moles.forEach(mole => mole.addEventListener('click', () => hitMole(mole)));

    // Add event listener for keydown events
    document.addEventListener('keydown', (event) => {
        const moleId = keyMap[event.key.toUpperCase()];
        if (moleId) {
            const mole = document.getElementById(moleId);
            hitMole(mole);
        }
    });

    // Add event listener to start button
    startButton.addEventListener('click', () => {
        if (startButton.textContent === 'Start Game') {
            startGame();
        } else {
            stopGame();
        }
    });

    // Add event listener to play/pause button
    playPauseButton.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
        } else {
            backgroundAudio.pause();
        }
        updatePlayPauseButton();
    });

    // Update play/pause button text on audio play/pause events
    backgroundAudio.addEventListener('play', updatePlayPauseButton);
    backgroundAudio.addEventListener('pause', updatePlayPauseButton);

    // Set initial state of play/pause button
    updatePlayPauseButton();
});



