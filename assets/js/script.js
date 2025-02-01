document.addEventListener('DOMContentLoaded', () => {
    const moles = document.querySelectorAll('.mole');
    const scoreBoard = document.getElementById('score');
    const timeBoard = document.getElementById('time');
    const startButton = document.getElementById('start-button');
    let lastMole;
    let timeUp = false;
    let score = 0;
    let time = 60;
    let timer;

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

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomMole(moles) {
        const idx = Math.floor(Math.random() * moles.length);
        const mole = moles[idx];
        if (mole === lastMole) {
            return randomMole(moles);
        }
        lastMole = mole;
        return mole;
    }

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

    function startGame() {
        score = 0;
        time = 60;
        scoreBoard.textContent = score;
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

    function stopGame() {
        clearInterval(timer);
        timeUp = true;
        startButton.textContent = 'Start Game';
    }

    function hitMole(mole) {
        if (!mole.classList.contains('up')) return;
        mole.classList.remove('up');
        score++;
        scoreBoard.textContent = score;
    }

    moles.forEach(mole => mole.addEventListener('click', () => hitMole(mole)));

    document.addEventListener('keydown', (event) => {
        const moleId = keyMap[event.key.toUpperCase()];
        if (moleId) {
            const mole = document.getElementById(moleId);
            hitMole(mole);
        }
    });

    startButton.addEventListener('click', () => {
        if (startButton.textContent === 'Start Game') {
            startGame();
        } else {
            stopGame();
        }
    });
});