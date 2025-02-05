document.addEventListener('DOMContentLoaded', () => {
  // Hero Carousel Logic
  const slides = document.querySelectorAll('.hero-slide')
  let currentSlide = 0

  function nextSlide () {
    slides[currentSlide].style.opacity = '0'
    currentSlide = (currentSlide + 1) % slides.length
    slides[currentSlide].style.opacity = '1'
  }

  setInterval(nextSlide, 5000)

  // Update the total score logic

  function updateTotalScore () {
    const scoreElements = document.querySelectorAll('.scoreToTot')
    let totalScore = 0

    scoreElements.forEach(element => {
      totalScore += parseInt(element.textContent, 10) || 0
    })

    const totalScoreElement = document.getElementById('totalscore')
    if (totalScoreElement) {
      totalScoreElement.textContent = totalScore
    }
  }

  // Whack-a-Mole Game Logic
  const moles = document.querySelectorAll('.mole')
  const moleScoreBoard = document.getElementById('molescore')
  const timeBoard = document.getElementById('time')
  const startButton = document.getElementById('start-button')
  const gameArea = document.querySelector('.mole-game-area')
  const playPauseButton = document.getElementById('play-pause-button')
  const backgroundAudio = document.getElementById('background-audio')
  const breakingGlassAudio = new Audio('assets/audio/breaking-glass-88411.mp3')
  const missedMoleAudio = new Audio('assets/audio/loud-thud-45719.mp3')
  let lastMole
  let timeUp = true
  let score = 0
  let time = 60
  let timer
  let consecutiveMisses = 0

  // Set initial volume and play audio
  backgroundAudio.volume = 0.05
  breakingGlassAudio.volume = 0.5

  // Attempt to play audio and handle autoplay restrictions
  function playAudio () {
    backgroundAudio.play().catch(error => {
      console.log('Autoplay prevented:', error)
      // Show a message or button to prompt user interaction
    })
  }

  playAudio()

  // Update play/pause button icon based on audio state
  function updatePlayPauseButton () {
    if (backgroundAudio.paused) {
      playPauseButton.classList.remove('fa-pause')
      playPauseButton.classList.add('fa-play')
    } else {
      playPauseButton.classList.remove('fa-play')
      playPauseButton.classList.add('fa-pause')
    }
  }

  // Map keys to mole IDs
  const keyMap = {
    Q: 'mole1',
    W: 'mole2',
    E: 'mole3',
    A: 'mole4',
    S: 'mole5',
    D: 'mole6',
    Z: 'mole7',
    X: 'mole8',
    C: 'mole9'
  }

  // Generate a random time between min and max
  function randomTime (min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }

  // Select a random mole that is not the same as the last one
  function randomMole (moles) {
    const idx = Math.floor(Math.random() * moles.length)
    const mole = moles[idx]
    if (mole === lastMole) {
      return randomMole(moles)
    }
    lastMole = mole
    return mole
  }

  // Show moles for a random time
  function peep () {
    let minTime = 1200
    let maxTime = 1500
    let moleCount = 1

    if (score >= 10) {
      minTime = 900
      maxTime = 1200
      moleCount = 2
    }

    if (score >= 20) {
      minTime = 600
      maxTime = 900
      moleCount = 3
    }

    const time = randomTime(minTime, maxTime)
    const molesToShow = []
    for (let i = 0; i < moleCount; i++) {
      const mole = randomMole(moles)
      molesToShow.push(mole)
      mole.classList.add('up')
    }

    setTimeout(() => {
      molesToShow.forEach(mole => mole.classList.remove('up'))
      if (!timeUp) peep()
    }, time)
  }

  // Start the game
  function startGame () {
    score = 0
    time = 60
    consecutiveMisses = 0
    moleScoreBoard.textContent = score
    gameArea.classList.remove('miss-one', 'miss-two')
    gameArea.style.borderColor = 'green'
    timeBoard.textContent = time
    timeUp = false
    startButton.textContent = 'Stop Game'
    peep()
    timer = setInterval(() => {
      time--
      timeBoard.textContent = time
      if (time <= 0) {
        clearInterval(timer)
        timeUp = true
        startButton.textContent = 'Start Game'
        updateTotalScore()
      }
    }, 1000)
  }

  // Stop the game
  function stopGame () {
    clearInterval(timer)
    timeUp = true
    startButton.textContent = 'Start Game'
    updateTotalScore()
  }

  // Handle mole hit
  function hitMole (mole) {
    if (timeUp) return

    if (mole.classList.contains('up')) {
      mole.classList.remove('up')
      mole.classList.add('whack')
      mole.textContent = 'Whack!'

      // Reset and play breaking glass Audio
      breakingGlassAudio.currentTime = 0
      breakingGlassAudio.play()

      score++
      moleScoreBoard.textContent = score
      consecutiveMisses = 0
      gameArea.classList.remove('miss-one', 'miss-two')
      gameArea.style.borderColor = 'green'
      setTimeout(() => {
        mole.classList.remove('whack')
        mole.textContent = Object.keys(keyMap).find(
          key => keyMap[key] === mole.id
        )
      }, 500)
    } else {
      mole.classList.add('miss')
      mole.textContent = 'Miss!'

      // Reset and play missed mole Audio
      missedMoleAudio.currentTime = 0
      missedMoleAudio.play()

      consecutiveMisses++
      if (consecutiveMisses === 1) {
        gameArea.classList.add('miss-one')
      } else if (consecutiveMisses === 2) {
        score--
        moleScoreBoard.textContent = score
        consecutiveMisses = 0
        gameArea.classList.remove('miss-one')
        gameArea.classList.add('miss-two')
        setTimeout(() => {
          gameArea.classList.remove('miss-two')
          gameArea.style.borderColor = 'green'
        }, 500)
      }
      setTimeout(() => {
        mole.classList.remove('miss')
        mole.textContent = Object.keys(keyMap).find(
          key => keyMap[key] === mole.id
        )
      }, 500)
    }
  }

  // Add event listeners to moles
  moles.forEach(mole => mole.addEventListener('click', () => hitMole(mole)))

  // Add event listener for keydown events
  document.addEventListener('keydown', event => {
    const moleId = keyMap[event.key.toUpperCase()]
    if (moleId) {
      const mole = document.getElementById(moleId)
      hitMole(mole)
    }
  })

  // Add event listener to start button
  startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Start Game') {
      startGame()
    } else {
      stopGame()
    }
  })

  // Add event listener to play/pause button
  playPauseButton.addEventListener('click', () => {
    if (backgroundAudio.paused) {
      backgroundAudio.play()
    } else {
      backgroundAudio.pause()
    }
    updatePlayPauseButton()
  })

  // Update play/pause button text on audio play/pause events
  backgroundAudio.addEventListener('play', updatePlayPauseButton)
  backgroundAudio.addEventListener('pause', updatePlayPauseButton)

  // Other Page wide Scripts

  // Set initial state of play/pause button
  updatePlayPauseButton()

  // Scroll behavior for hero section
  window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero-section')
    if (window.scrollY > 0) {
      heroSection.style.position = 'relative'
    } else {
      heroSection.style.position = 'absolute'
    }
  })


  // Adjust scroll position for navbar offset
  document.querySelectorAll('.linky').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const heroSection = document.getElementById('hero-section')

      if ((heroSection.style.position = 'absolute')) {
        heroSection.style.position = 'relative'
      }

      const targetId = this.getAttribute('href').substring(1)
      const targetElement = document.getElementById(targetId)
      const offset = 70 // Adjust this value based on the height of your navbar
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      // Check if the current scroll position is already at the target position
      if (Math.abs(window.scrollY - offsetPosition) > 1) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }

      // Activate the specified tab if data-tab attribute is present
      const tabId = this.getAttribute('data-bs-tab')
      if (tabId) {
        if (tabId === 'random') {
          const tabs = [
            'whack-a-mole-tab',
            'smash-tab',
            'snake-tab',
            'hangman-tab'
          ]
          const activeTab = document.querySelector('.nav-link.active').id
          const availableTabs = tabs.filter(tab => tab !== activeTab)
          const randomTabId =
            availableTabs[Math.floor(Math.random() * availableTabs.length)]
          const randomTabElement = document.getElementById(randomTabId)
          if (randomTabElement) {
            const randomTab = new bootstrap.Tab(randomTabElement)
            randomTab.show()
          }
        } else {
          const tabElement = document.getElementById(tabId)
          if (tabElement) {
            const tab = new bootstrap.Tab(tabElement)
            tab.show()
          }
        }
      }

      // Collapse the navbar
      const navbarCollapse = document.querySelector('.navbar-collapse')
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: true
        })
        bsCollapse.hide()
      }
    })
  })
})
