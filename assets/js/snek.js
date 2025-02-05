const canvas = document.getElementById('gameCanvas')
const snakeDiv = document.getElementById('snakeDiv')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('snake-score')
const timerElement = document.getElementById('snake-time')
const fullscreenButton = document.getElementById('snake-fullscreen')

const snakeTab = document.getElementById('snake-tab')

// console.log('canvas.width', canvas.width)
const frameRate = 1000 / 10

// Game Variables
let userInput = 'ArrowUp'
let lastInput = 'ArrowUp'
let frameCounter = 0

// Canvas Size
const gameWidth = 300
const gameHeight = 300

canvas.width = gameWidth
canvas.height = gameHeight
canvas.style.width = '100%'
canvas.style.height = '100%'
canvas.style.maxWidth = '600px'
canvas.style.maxHeight = '600px'

// Snake Sprites & Declarations
let snake = []
const sSize = 15
const snakeStartingLength = 2
const spritePaths = {
  head_up: 'assets/snake/sprites/head_up.png',
  head_down: 'assets/snake/sprites/head_down.png',
  head_left: 'assets/snake/sprites/head_left.png',
  head_right: 'assets/snake/sprites/head_right.png',
  body_vertical: 'assets/snake/sprites/body_vertical.png',
  body_horizontal: 'assets/snake/sprites/body_horizontal.png',
  tail_up: 'assets/snake/sprites/tail_up.png',
  tail_down: 'assets/snake/sprites/tail_down.png',
  tail_left: 'assets/snake/sprites/tail_left.png',
  tail_right: 'assets/snake/sprites/tail_right.png',
  bend_topright: 'assets/snake/sprites/body_topright.png',
  bend_topleft: 'assets/snake/sprites/body_topleft.png',
  bend_bottomright: 'assets/snake/sprites/body_bottomright.png',
  bend_bottomleft: 'assets/snake/sprites/body_bottomleft.png'
}
const sprites = {}
for (const [key, path] of Object.entries(spritePaths)) {
  const img = new Image()
  img.src = path
  sprites[key] = img
}

// Fruit Sprites & Declarations
let fruitImage = new Image()
fruitImage.src = 'assets/snake/apple.png'
const fruitSize = 40
fruit = [
  Math.floor(Math.random() * 30) * 10,
  Math.floor(Math.random() * 30) * 10
]

// Title Image
let titleImage = new Image()
titleImage.src = 'assets/snake/Snek2048-title.gif'

// Background Image
let background = new Image()
background.src = 'assets/snake/snek-bg.png'

// Scores & Timer
const scoreText = 'Score: '
const timerText = 'Time: '
let snakeScore = 0
let snakeTimer = 0
var timerIntervalSnake

// Intro & Game Over Text
const introText = 'Welcome to snek2048'
const startText = 'Press Enter to Start'
const gameOverText = 'Game Over'

// Game State
let gameState = 'intro'

// Load Sounds
const eatSound = new Audio('assets/snake/sounds/EatSound.ogg')
const backgroundMusic = new Audio('assets/snake/sounds/level-1-bg.wav')
backgroundMusic.loop = true
backgroundMusic.volume = 0.2 // Set volume to 20%

// Fullscreen Functionality
fullscreenButton.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.getElementById('snakeContainer').requestFullscreen()
  }
})

// Fullscreen Event Listener
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    if (window.innerWidth > window.innerHeight) {
      canvas.style.width = `${window.innerHeight}px`
      canvas.style.height = `${window.innerHeight}px`
      canvas.style.maxWidth = `${window.innerHeight}px`
      canvas.style.maxHeight = `${window.innerHeight}px`
    } else if (window.innerHeight > window.innerWidth) {
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerWidth}px`
      canvas.style.maxWidth = `${window.innerWidth}px`
      canvas.style.maxHeight = `${window.innerWidth}px`
    } else {
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.maxWidth = '600px'
      canvas.style.maxHeight = '600px'
    }
  } else {
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.maxWidth = '600px'
    canvas.style.maxHeight = '600px'
  }
})

// experiment with the snake game

// Add touch event listeners to the canvas
canvas.addEventListener('touchstart', handleTouchStart, false)
canvas.addEventListener('touchmove', handleTouchMove, false)
canvas.addEventListener('touchend', handleTouchEnd, false)

let touchStartX = 0
let touchStartY = 0

function handleTouchStart (event) {
  event.preventDefault()
  const touch = event.touches[0]
  touchStartX = touch.clientX
  touchStartY = touch.clientY

  // Check if the touch is near the center of the canvas
  const canvasCenterX = canvas.width / 2
  const canvasCenterY = canvas.height / 2
  const touchThreshold = 100 // Adjust this value as needed

  if (
    Math.abs(touchStartX - canvasCenterX) < touchThreshold &&
    Math.abs(touchStartY - canvasCenterY) < touchThreshold
  ) {
    // Start the game if the touch is near the center
    if (gameState !== 'playing') {
      gameState = 'playing'
      startTimer()
      gameIntro()
      startButtonLabel.innerText = 'Pause'
    } else {
      gameState = 'pause'
      // stopTimer()
      startButtonLabel.innerText = 'Play'
    }
  }
}
/**
 * Handle touch move events
 *
 * @param {*} event
 */
function handleTouchMove (event) {
  if (event.touches.length > 1) return // Ignore multi-touch
  const touch = event.touches[0]
  const touchEndX = touch.clientX
  const touchEndY = touch.clientY

  const deltaX = touchEndX - touchStartX
  const deltaY = touchEndY - touchStartY

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    if (deltaX > 0 && lastInput !== 'ArrowLeft') {
      userInput = 'ArrowRight'
    } else if (deltaX < 0 && lastInput !== 'ArrowRight') {
      userInput = 'ArrowLeft'
    }
  } else {
    // Vertical swipe
    if (deltaY > 0 && lastInput !== 'ArrowUp') {
      userInput = 'ArrowDown'
    } else if (deltaY < 0 && lastInput !== 'ArrowDown') {
      userInput = 'ArrowUp'
    }
  }

  // Update touch start coordinates for continuous swipes
  touchStartX = touchEndX
  touchStartY = touchEndY
}

function handleTouchEnd (event) {
  // Reset touch start coordinates
  touchStartX = 0
  touchStartY = 0
}

// Start the game loop when the tab becomes active
document.getElementById('snake-tab').addEventListener('click', () => {
  gameState = 'intro' // Set initial game state
  requestAnimationFrame(startGame)
})

function startTimer () {
  timerIntervalSnake = setInterval(() => {
    if (gameState === 'playing') {
      snakeTimer++
      timerElement.innerText = snakeTimer
    }
  }, 1000)
}

function stopTimer () {
  clearInterval(timerIntervalSnake)
}

// Start Button Event Listener
let startButton = document.getElementById('snakeButton')
let startButtonLabel = document.getElementById('snakeButtonLabel')
startButtonLabel.innerText = 'Play'
startButton.addEventListener('click', e => {
  if (startButtonLabel.innerHTML === 'Play') {
    gameState = 'playing'
    startButtonLabel.innerText = 'Pause'
    startTimer()
  } else {
    gameState = 'pause'
    startButtonLabel.innerText = 'Play'
    stopTimer()
  }
})

// Keyboard Event Listener
document.addEventListener('keydown', e => {
  const snakeTab = document.getElementById('snake-tab')
  if (snakeTab && snakeTab.classList.contains('active')) {
    if (
      [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Enter',
        ' ',
        'f',
        'Escape'
      ].includes(e.key)
    ) {
      e.preventDefault()
    }
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (lastInput !== 'ArrowDown') userInput = 'ArrowUp'
        break
      case 'ArrowDown':
      case 's':
        if (lastInput !== 'ArrowUp') userInput = 'ArrowDown'
        break
      case 'ArrowLeft':
      case 'a':
        if (lastInput !== 'ArrowRight') userInput = 'ArrowLeft'
        break
      case 'ArrowRight':
      case 'd':
        if (lastInput !== 'ArrowLeft') userInput = 'ArrowRight'
        break
      case 'Enter':
      case ' ':
        gameState = 'playing'
        break
      case 'f':
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          document.getElementById('snakeContainer').requestFullscreen()
        }
        break
      case 'Escape':
        pauseGame()
        console.log('gameState', gameState)
        break
    }
  }
})

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

/**
 * Initialize the game & reset variables for new game
 */
function initGame () {
  let spriteRotation = 0
  snakeScore = '0'
  snakeTimer = '0'
  lastInput = 'ArrowUp'
  userInput = 'ArrowUp'

  snake = []
  for (let i = 0; i < snakeStartingLength; i++) {
    snake.push([canvas.width / 2 - sSize, canvas.height / 2 - sSize])
  }

  fruit = [
    Math.floor(Math.random() * (gameWidth / fruitSize)) * fruitSize,
    Math.floor(Math.random() * (gameHeight / fruitSize)) * fruitSize
  ]
}

/**
 * Draw the game to the screen
 */
function draw () {
  drawBackground()
  ctx.drawImage(fruitImage, fruit[0], fruit[1], fruitSize, fruitSize)
  drawSnake()
  drawScore()
}

/**
 * Draw the score and timer
 */
function drawScore () {
  ctx.font = '10px Arial'
  ctx.fillStyle = 'yellow'
  ctx.fillText(`${scoreText}${snakeScore}`, 10, 10)
  ctx.fillText(`${timerText}${snakeTimer}`, 10, 20)
  timerElement.innerText = snakeTimer
  scoreElement.innerText = snakeScore
}

/**
 * Draw the snake to the screen & calculates segment direction
 */
function drawSnake () {
  if (snake.length) {
    for (let i = 0; i < snake.length; i++) {
      let segment = snake[i]
      let nextSegment = snake[i + 1] || segment
      let prevSegment = snake[i - 1] || segment

      let direction = getDirection(prevSegment, segment)
      if (i === snake.length - 1) {
        // Draw head
        direction = getDirection(prevSegment, segment)
        drawSegment(ctx, sprites[`head_${direction}`], segment)
      } else if (i === 0) {
        // Draw tail
        direction = getDirection(nextSegment, segment)
        drawSegment(ctx, sprites[`tail_${direction}`], segment)
      } else {
        // Draw body or bend
        let prevDirection = getDirection(prevSegment, segment)
        let nextDirection = getDirection(segment, nextSegment)
        if (prevDirection !== nextDirection) {
          // Draw bend
          const bendKey = getBendKey(prevDirection, nextDirection)
          drawSegment(ctx, sprites[bendKey], segment)
        } else {
          const bodyKey =
            direction === 'left' || direction === 'right'
              ? 'body_horizontal'
              : 'body_vertical'
          drawSegment(ctx, sprites[bodyKey], segment)
        }
      }
    }
  }
}
/**
 * Draw the background image
 */
function drawBackground () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
}

/**
 * Draw a segment of the snake
 * @param {*} ctx
 * @param {*} image
 * @param {*} segment
 */
function drawSegment (ctx, image, segment) {
  if (image && image.complete) {
    ctx.drawImage(image, segment[0], segment[1], sSize, sSize)
  } else {
    console.error('Image not loaded or invalid:', image)
  }
}

/**
 * Returns the direction of the snake segment
 * @param {*} segment
 * @param {*} nextSegment
 * @returns
 */
function getDirection (segment, nextSegment) {
  if (segment[0] < nextSegment[0]) return 'right'
  if (segment[0] > nextSegment[0]) return 'left'
  if (segment[1] < nextSegment[1]) return 'down'
  if (segment[1] > nextSegment[1]) return 'up'
  return 'right' // Default direction
}

/**
 * Returns the bend key based on the previous and next direction
 * @param {*} prevDirection
 * @param {*} nextDirection
 * @returns bend key
 */
function getBendKey (prevDirection, nextDirection) {
  if (prevDirection === 'up' && nextDirection === 'right')
    return 'bend_bottomright'
  if (prevDirection === 'up' && nextDirection === 'left')
    return 'bend_bottomleft'
  if (prevDirection === 'down' && nextDirection === 'right')
    return 'bend_topright'
  if (prevDirection === 'down' && nextDirection === 'left')
    return 'bend_topleft'
  if (prevDirection === 'left' && nextDirection === 'up') return 'bend_topright'
  if (prevDirection === 'left' && nextDirection === 'down')
    return 'bend_bottomright'
  if (prevDirection === 'right' && nextDirection === 'up') return 'bend_topleft'
  if (prevDirection === 'right' && nextDirection === 'down')
    return 'bend_bottomleft'
  return 'body_horizontal' // Default bend
}

/**
 * Moves snake and checks collision
 * @param {*} input User input
 * @param {*} sSize Size of snake
 * @returns none
 */
function moveSnake (input, sSize) {
  newHead(input, sSize)

  let sLength = snake.length - 1
  if (snake.length) {
    const head = snake[sLength]
    if (
      head[0] < fruit[0] + fruitSize &&
      head[0] + sSize > fruit[0] &&
      head[1] < fruit[1] + fruitSize &&
      head[1] + sSize > fruit[1]
    ) {
      eatSound.play()
      snakeScore++
      fruit = [
        Math.floor(Math.random() * ((canvas.width - fruitSize) / fruitSize)) *
          fruitSize,
        Math.floor(Math.random() * ((canvas.height - fruitSize) / fruitSize)) *
          fruitSize
      ]
    } else {
      snake.shift()
    }
  }

  // Check if snake collides with canvas walls
  sLength = snake.length - 1
  if (
    snake[sLength][0] < 0 ||
    snake[sLength][0] >= canvas.width + sSize ||
    snake[sLength][1] < 0 ||
    snake[sLength][1] >= canvas.height - sSize
  ) {
    gameState = 'gameover'
  }
}

/**
 * Adds new head to snake
 * @param {*} input User input
 * @param {*} sSize Size of snake
 * @returns
 */
function newHead (input, sSize) {
  let newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1]]
  switch (input) {
    case 'ArrowUp':
      newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] - sSize]
      break
    case 'ArrowDown':
      newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] + sSize]
      break
    case 'ArrowLeft':
      newHead = [snake[snake.length - 1][0] - sSize, snake[snake.length - 1][1]]
      break
    case 'ArrowRight':
      newHead = [snake[snake.length - 1][0] + sSize, snake[snake.length - 1][1]]
      break
  }
  lastInput = input

  for (let i = 0; i < snake.length; i++) {
    if (newHead[0] === snake[i][0] && newHead[1] === snake[i][1]) {
      gameState = 'gameover'
      return
    }
  }
  snake.push(newHead)
}

/**
 * End the game and reset variables
 */
function gameEnd () {
  let msg = 'Game Over'
  initGame()
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(
    msg,
    canvas.width / 2 - ctx.measureText(msg).width / 2,
    canvas.height / 2 - 30
  )
  ctx.fillStyle = 'red'
  ctx.fillText(
    startText,
    canvas.width / 2 - ctx.measureText(startText).width / 2,
    canvas.height / 2 + 30
  )
  // gameState = 'intro'
  startButtonLabel.innerText = 'Play'
  // updateTotalScore()
}

function pauseGame () {
  if (gameState === 'playing') {
    gameState = 'pause'
  } else if (gameState === 'pause') {
    gameState = 'playing'
  }
  if (gameState === 'playing') {
    startButtonLabel.innerText = 'Pause'
    startTimer()
  } else {
    gameState = 'pause'
    startButtonLabel.innerText = 'Play'
    stopTimer()
  }
}
/**
 * Display intro screen
 */
function gameIntro () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.drawImage(titleImage, 0, 0, canvas.width, canvas.height)
}

/**
 * Start the game loop and call game functions
 */
function startGame (timestamp) {
  const snakeTab = document.getElementById('snake-tab')
  if (snakeTab && snakeTab.classList.contains('active')) {
    const deltaTime = timestamp - lastTime

    if (deltaTime >= frameRate) {
      lastTime = timestamp

      if (gameState === 'intro') {
        gameIntro()
      } else if (gameState === 'playing') {
        moveSnake(userInput, sSize)
        draw()
        backgroundMusic.play()
      } else if (gameState === 'pause') {
        backgroundMusic.pause()
        // pauseGame();
      } else if (gameState === 'gameover') {
        updateTotalScore()
        backgroundMusic.pause()
        gameEnd()
      }
    }

    // Schedule the next frame
    requestAnimationFrame(startGame)
  } else {
    // If the snake-tab is not active, stop the loop
    initGame()
    lastTime = 0
    backgroundMusic.pause()
  }
}

initGame()
startGame()
