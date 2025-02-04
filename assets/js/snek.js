const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('snake-score')
const timerElement = document.getElementById('snake-time')
const fullscreenButton = document.getElementById('snake-fullscreen')

console.log('canvas.width', canvas.width)
const frameRate = 1000 / 10

let userInput = 'ArrowUp'
let lastInput = 'ArrowUp'
let frameCounter = 0

// const gameWidth = 600
// const gameHeight = 600

const gameWidth = 300
const gameHeight = 300

canvas.width = gameWidth
canvas.height = gameHeight
canvas.style.maxWidth = '600px'
canvas.style.width = '100%'
canvas.style.maxHeight = '600px'
canvas.style.height = '100%'

const sSize = 10
const snakeStartingLength = 2

// Snake Sprites & Declarations
let snake = []
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

// Background Image
let background = new Image()
background.src = 'assets/snake/snek-bg.png'

// Scores & Timer
const scoreText = 'Score: '
const timerText = 'Time: '
let score = 0
let timer = 0

// Intro & Game Over Text
const introText = 'Welcome to Snake'
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

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    canvas.style.width = '100vw'
    canvas.style.height = '100vh'
  } else {
    canvas.style.width = '100%'
    canvas.style.height = '100%'
  }
})

// Timer
setInterval(() => {
  timer++
}, 1000)

// Start Button Event Listener
let startButton = document.getElementById('snakeButton')
startButton.addEventListener('click', e => {
  gameState = 'playing'
})

// Keyboard Event Listener
document.addEventListener('keydown', e => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
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
      gameState = 'playing'
      break
  }
})

/**
 * Initialize the game & reset variables for new game
 */
function initGame () {
  let spriteRotation = 0
  score.innerText = '0'
  timer.innerText = '0'
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
  ctx.fillText(`${scoreText}${score}`, 10, 10)
  ctx.fillText(`${timerText}${timer}`, 10, 20)
  timerElement.innerText = timer
  scoreElement.innerText = score
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
      score++
      fruit = [
        Math.floor(Math.random() * (gameWidth / fruitSize)) * fruitSize,
        Math.floor(Math.random() * (gameHeight / fruitSize)) * fruitSize
      ]
    } else {
      snake.shift()
    }
  }

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
  initGame()
  gameState = 'intro'
}

/**
 * Display intro screen
 */
function gameIntro () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.font = '30px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(
    introText,
    canvas.width / 2 - ctx.measureText(introText).width / 2,
    canvas.height / 2 - 30
  )
  ctx.fillStyle = 'red'
  ctx.fillText(
    startText,
    canvas.width / 2 - ctx.measureText(introText).width / 2,
    canvas.height / 2 + 30
  )
}

/**
 * Start the game loop and call game functions
 */
function startGame () {
  if (gameState === 'intro') {
    gameIntro()
  } else if (gameState === 'playing') {
    moveSnake(userInput, sSize)
    draw()

    backgroundMusic.play()
  } else if (gameState === 'gameover') {
    backgroundMusic.pause()
    gameEnd()
  }

  setTimeout(() => {
    startGame()
  }, frameRate)
}
initGame()
startGame()

// experiment with the snake game

// Add touch event listeners to the canvas
canvas.addEventListener('touchstart', handleTouchStart, false)
canvas.addEventListener('touchmove', handleTouchMove, false)
canvas.addEventListener('touchend', handleTouchEnd, false)

let touchStartX = 0
let touchStartY = 0

function handleTouchStart (event) {
  const touch = event.touches[0]
  touchStartX = touch.clientX
  touchStartY = touch.clientY
}

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
