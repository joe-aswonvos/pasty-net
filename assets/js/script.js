const videos = [
  'assets/videos/video1.mp4',
  'assets/videos/video2.webm',
  'assets/videos/video3.webm',
  'assets/videos/video4.webm'
]
let currentVideoIndex = 0

const heroVideo = document.getElementById('hero-video')
const heroVideoSource = document.getElementById('hero-video-source')

heroVideo.addEventListener('ended', () => {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length
  heroVideoSource.src = videos[currentVideoIndex]
  heroVideo.load()
  heroVideo.play()
})

// whack-a-mole
// document.addEventListener('DOMContentLoaded', function () {
//   const holes = document.querySelectorAll('.hole')
//   const startButton = document.getElementById('startButton')
//   const endButton = document.getElementById('endButton')
//   const scoreDisplay = document.getElementById('score')
//   const timerDisplay = document.getElementById('timer')

//   let timer
//   let score = 0
//   let countdown
//   let moleInterval

//   // Set the initial state to game over
//   let gameOver = true

//   function comeout () {
//     holes.forEach(hole => {
//       hole.classList.remove('mole')
//       hole.removeEventListener('click', handleMoleClick)
//     })

//     let random = holes[Math.floor(Math.random() * 9)]

//     random.classList.add('mole')
//     random.addEventListener('click', handleMoleClick)
//   }

//   function handleMoleClick () {
//     if (!gameOver) {
//       score++
//       scoreDisplay.textContent = `Score: ${score}`
//     }
//     this.classList.remove('mole')
//   }

//   function startGame () {
//     if (!gameOver) {
//       // Prevent starting the game
//       // again if it's already in progress
//       return
//     }

//     gameOver = false
//     score = 0
//     scoreDisplay.textContent = `Score: ${score}`
//     timer = 60
//     timerDisplay.textContent = `Time: ${timer}s`

//     startButton.disabled = true
//     endButton.disabled = false

//     countdown = setInterval(() => {
//       timer--
//       timerDisplay.textContent = `Time: ${timer}s`

//       if (timer <= 0) {
//         clearInterval(countdown)
//         gameOver = true
//         alert(`Game Over!\nYour final score: ${score}`)
//         startButton.disabled = false
//         endButton.disabled = true
//       }
//     }, 1000)

//     moleInterval = setInterval(() => {
//       if (!gameOver) comeout()
//     }, 1000)

//     console.log('Game started')
//   }

//   function endGame () {
//     clearInterval(countdown)
//     clearInterval(moleInterval)
//     gameOver = true
//     alert(`Game Ended!\nYour final score: ${score}`)
//     score = 0
//     timer = 60
//     scoreDisplay.textContent = `Score: ${score}`
//     timerDisplay.textContent = `Time: ${timer}s`
//     startButton.disabled = false
//     endButton.disabled = true
//   }

//   startButton.addEventListener('click', startGame)
//   endButton.addEventListener('click', endGame)
// })

// SNAKE GAME
// function snakeGame () {
const canvas = document.getElementById('snake')
const ctx = canvas.getContext('2d')

const gameWidth = '500px'
const gameHeight = '500px'

canvas.style.width = gameWidth
canvas.style.height = gameHeight

const sSize = 10
const snakeStartingLength = 3
let snake = []
for (let i = 0; i < snakeStartingLength; i++) {
  snake.push([canvas.width / 2 - sSize, canvas.height / 2 - sSize])
  console.log('snake', snake)
}
// let snake = [gameWidth / 2 - sSize, gameHeight / 2 - sSize]

fruit = [
  Math.floor(Math.random() * 30) * 10,
  Math.floor(Math.random() * 30) * 10
]

const fruitSize = 10

let userInput = 'up'

const scoreText = 'Score: '
const timerText = 'Time: '
let score = 0
let timer = 0

let gameOver = false

function draw () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'red'
  ctx.fillRect(fruit[0], fruit[1], 10, 10)

  ctx.fillStyle = 'black'
  if (snake.length) {
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = 'black'
      ctx.fillRect(snake[i][0], snake[i][1], sSize, sSize)
    }
  }
  ctx.fillStyle = 'black'
  ctx.fillText(`${scoreText}${score}`, 10, 10)
  ctx.fillText(`${timerText}${timer}`, 10, 20)
}

gameOver = false
score = 0
timer = 0
// snake = [[0, 0]]
fruit = [
  Math.floor(Math.random() * 30) * 10,
  Math.floor(Math.random() * 30) * 10
]

setInterval(() => {
  timer++
}, 1000)

console.log('Game started')

// function moveSnake (input) {}

function getInput (input) {
  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        return 'up'
      case 'ArrowDown':
        return 'down'
      case 'ArrowLeft':
        return 'left'
      case 'ArrowRight':
        return 'right'
      default:
        return input
    }
  })
}

function collision (snake) {
  // const [headX, headY] = snake[-1]
  let sLength = snake.length - 1
  if (snake.length) {
    if (snake[sLength][0] === fruit[0] && snake[sLength][1] === fruit[1]) {
      score++
      fruit = [
        Math.floor(Math.random() * 30) * 10,
        Math.floor(Math.random() * 30) * 10
      ]
    } else {
      snake.pop()
    }
    sLength = snake.length - 1

    console.log(snake[sLength][0], snake[sLength][1])

    if (
      snake[sLength][0] < 0 ||
      snake[sLength][0] >= canvas.width + sSize ||
      snake[sLength][1] < 0 ||
      snake[sLength][1] >= canvas.height - sSize
    ) {
      gameOver = true
    }
  }
}

function moveSnake (input, sSize) {
  // console.log(input)

  let newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1]]

  switch (input) {
    case 'up':
      newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] - sSize]
      break
    case 'down':
      newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] + sSize]
      break
    case 'left':
      newHead = [snake[snake.length - 1][0] - sSize, snake[snake.length - 1][1]]
      break
    case 'right':
      newHead = [snake[snake.length - 1][0] + sSize, snake[snake.length - 1][1]]
      break
  }
  snake.push(newHead)

  let sLength = snake.length - 1
  if (snake.length) {
    if (snake[sLength][0] === fruit[0] && snake[sLength][1] === fruit[1]) {
      score++
      fruit = [
        Math.floor(Math.random() * 30) * 10,
        Math.floor(Math.random() * 30) * 10
      ]
    } else {
      // snake.pop()
      snake.shift()
    }
    sLength = snake.length - 1

    console.log(snake[sLength][0], snake[sLength][1])

    if (
      snake[sLength][0] < 0 ||
      snake[sLength][0] >= canvas.width + sSize ||
      snake[sLength][1] < 0 ||
      snake[sLength][1] >= canvas.height - sSize
    ) {
      gameOver = true
    }
  }

  // Remove the tail to keep the snake the same length
}

function startGame () {
  let userInput = 'up'
  // for (let i = 0; i < snakeStartingLength; i++) {
  //   snake.push([canvas.width / 2 - sSize, canvas.height / 2 - sSize])
  // }
  fruit = [
    Math.floor(Math.random() * 30) * 10,
    Math.floor(Math.random() * 30) * 10
  ]

  while (!gameOver) {
    console.log('Game running')
    userInput = getInput(userInput)
    collision(snake)
    moveSnake(userInput, sSize)

    draw()
    setTimeout(() => {
      startGame()
    }, 1000)
  }

  // update()
}

startGame()
// }

// const fruitSize = 10
// let input = 'up'

// const scoreText = 'Score: '
// const timerText = 'Time: '
// let score = 0
// let timer = 0

// let gameOver = false
// let snake = [[0, 0]]
// let fruit = [
//   Math.floor(Math.random() * 30) * 10,
//   Math.floor(Math.random() * 30) * 10
// ]

// function draw () {
//   ctx.clearRect(0, 0, canvas.width, canvas.height)

//   ctx.fillStyle = 'red'
//   ctx.fillRect(fruit[0], fruit[1], fruitSize, fruitSize)

//   ctx.fillStyle = 'black'

//   for (let i = 0; i < snake.length; i++) {
//     ctx.fillStyle = 'black'
//     ctx.fillRect(snake[i][0], snake[i][1], sSize, sSize)
//   }
//   ctx.fillStyle = 'black'
//   ctx.fillText(`${scoreText}${score}`, 10, 10)
//   ctx.fillText(`${timerText}${timer}`, 10, 20)
// }

// function moveSnake (input) {
//   let newHead
//   switch (input) {
//     case 'up':
//       newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] - sSize]
//       break
//     case 'down':
//       newHead = [snake[snake.length - 1][0], snake[snake.length - 1][1] + sSize]
//       break
//     case 'left':
//       newHead = [snake[snake.length - 1][0] - sSize, snake[snake.length - 1][1]]
//       break
//     case 'right':
//       newHead = [snake[snake.length - 1][0] + sSize, snake[snake.length - 1][1]]
//       break
//   }
//   snake.push(newHead)
//   snake.shift() // Remove the tail to keep the snake the same length
// }

// function getInput () {
//   window.addEventListener('keydown', e => {
//     switch (e.key) {
//       case 'ArrowUp':
//         input = 'up'
//         break
//       case 'ArrowDown':
//         input = 'down'
//         break
//       case 'ArrowLeft':
//         input = 'left'
//         break
//       case 'ArrowRight':
//         input = 'right'
//         break
//       default:
//         break
//     }
//   })
// }

// function collision (snake) {
//   let sLength = snake.length - 1

//   if (snake[sLength][0] === fruit[0] && snake[sLength][1] === fruit[1]) {
//     score++
//     fruit = [
//       Math.floor(Math.random() * 30) * 10,
//       Math.floor(Math.random() * 30) * 10
//     ]
//   } else {
//     snake.pop()
//   }

//   sLength = snake.length - 1
//   if (snake.length) {
//     console.log(snake[sLength][0], snake[sLength][1])
//   }

//   if (
//     snake[sLength][0] < 0 ||
//     snake[sLength][0] >= canvas.width ||
//     snake[sLength][1] < 0 ||
//     snake[sLength][1] >= canvas.height
//   ) {
//     gameOver = true
//   }
// }

// function startGame () {
//   gameOver = false
//   score = 0
//   timer = 0
//   snake = [[0, 0]]
//   fruit = [
//     Math.floor(Math.random() * 30) * 10,
//     Math.floor(Math.random() * 30) * 10
//   ]

//   getInput() // Initialize input event listener

//   setInterval(() => {
//     timer++
//   }, 1000)

//   function gameLoop () {
//     if (!gameOver) {
//       console.log('Game running')
//       collision(snake)
//       moveSnake(input)
//       draw()
//       setTimeout(gameLoop, 100) // Adjust the delay to control the game speed
//     }
//   }

//   gameLoop()
// }

// // Call startGame to begin the game
// startGame()
