// const videos = [
//   'assets/videos/video1.mp4',
//   'assets/videos/video2.webm',
//   'assets/videos/video3.webm',
//   'assets/videos/video4.webm'
// ]
// let currentVideoIndex = 0

// const heroVideo = document.getElementById('hero-video')
// const heroVideoSource = document.getElementById('hero-video-source')

// heroVideo.addEventListener('ended', () => {
//   currentVideoIndex = (currentVideoIndex + 1) % videos.length
//   heroVideoSource.src = videos[currentVideoIndex]
//   heroVideo.load()
//   heroVideo.play()
// })

// SNAKE GAME
// function snakeGame () {
const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const scoreElement = document.getElementById('snake-score')
const timerElement = document.getElementById('snake-time')

// const parentContainer = document.getElementById('snake-container')
// canvas.width = parentContainer.clientWidth
// canvas.height = parentContainer.clientHeight

console.log('canvas.width', canvas.width)
const frameRate = 1000 / 10

let userInput = 'ArrowUp'
let lastInput = 'ArrowUp'
let frameCounter = 0

// const gameWidth = 600
// const gameHeight = 600

const gameWidth = 400
const gameHeight = 400

canvas.width = gameWidth
canvas.height = gameHeight
canvas.style.width = '100%'
canvas.style.height = '100%'

const sSize = 10
const snakeStartingLength = 1

let snake = []

let fruitImage = new Image()
fruitImage.src = 'assets/snake/apple.png'
const fruitSize = 40
fruit = [
  Math.floor(Math.random() * 30) * 10,
  Math.floor(Math.random() * 30) * 10
]

let background = new Image()
background.src = 'assets/snake/grass.png'

const scoreText = 'Score: '
const timerText = 'Time: '
let score = 0
let timer = 0

const introText = 'Welcome to Snake'
const startText = 'Press Enter to Start'
const gameOverText = 'Game Over'

let gameState = 'intro'

const eatSound = new Audio('assets/snake/sounds/EatSound.ogg')

// Load and loop background music
const backgroundMusic = new Audio('assets/snake/sounds/level-1-bg.wav')
backgroundMusic.loop = true
backgroundMusic.volume = 0.2 // Set volume to 20%

setInterval(() => {
  timer++
}, 1000)

let startButton = document.getElementById('snakeButton')
startButton.addEventListener('click', e => {
  gameState = 'playing'
})

document.addEventListener('keydown', e => {
  // console.log(e.key)
  // console.log('userddddInput', userInput)

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
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
  ctx.drawImage(fruitImage, fruit[0], fruit[1], fruitSize, fruitSize)

  ctx.fillStyle = 'black'
  if (snake.length) {
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = 'darkgreen'
      ctx.strokeStyle = 'yellow'
      ctx.fillRect(snake[i][0], snake[i][1], sSize, sSize)
      ctx.strokeRect(snake[i][0], snake[i][1], sSize, sSize)
      // ctx.(snakePart.x, snakePart.y, 10, 10);}
    }
  }
  ctx.font = '10px Arial'
  ctx.fillStyle = 'yellow'
  ctx.fillText(`${scoreText}${score}`, 10, 10)
  ctx.fillText(`${timerText}${timer}`, 10, 20)
  timerElement.innerText = timer
  scoreElement.innerText = score
}

/**
 * Moves snake and checks collision
 * @param {*} input User input
 * @param {*} sSize Size of snake
 * @returns none
 */
function moveSnake (input, sSize) {
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

function gameEnd () {
  initGame()
  gameState = 'intro'
}

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
