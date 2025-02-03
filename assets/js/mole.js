document.addEventListener('DOMContentLoaded', function () {
  const timerDisplay = document.querySelector('.timer')
  const scoreDisplay = document.querySelector('.score')
  const startButton = document.getElementById('start')
  const stopButton = document.getElementById('stop')
  const holes = document.querySelectorAll('.hole')

  let timer = 0
  let score = 0
  let countdown = 0
  let moleInterval = 0

  let gameOver = true

  function comeout () {
    holes.forEach(hole => {
      hole.classList.remove('mole')
      hole.removeEventListener('click', handleMoleClick)
    })

    let random = holes[Math.floor(Math.random() * 9)]

    random.classList.add('mole')
    random.addEventListener('click', handleMoleClick)
  }

  function handleMoleClick () {
    if (!gameOver) {
      score++
      scoreDisplay.textContent = `Score: ${score}`
    }
    this.classList.remove('mole')
  }

  function startGame () {
    if (!gameOver) {
      return
    }

    gameOver = false
    score = 0
    scoreDisplay.textContent = `Score: ${score}`
    timer = 60
    timerDisplay.textContent = `Time: ${timer}s`

    startButton.disabled = true
    stopButton.disabled = false

    countdown = setInterval(() => {
      timer--
      timerDisplay.textContent = `Time: ${timer}s`

      if (timer <= 0) {
        clearInterval(countdown)
        clearInterval(moleInterval)
        gameOver = true
        startButton.disabled = false
        stopButton.disabled = true
      }
    }, 1000)

    moleInterval = setInterval(comeout, 1000)
  }
  function endGame () {
    clearInterval(countdown)
    clearInterval(moleInterval)
    gameOver = true
    alert(`Game Ended!\nYour final score: ${score}`)
    score = 0
    timer = 60
    scoreDisplay.textContent = `Score: ${score}`
    timerDisplay.textContent = `Time: ${timer}s`
    startButton.disabled = false
    endButton.disabled = true
  }

  startButton.addEventListener('click', startGame)
  endButton.addEventListener('click', endGame)
})
