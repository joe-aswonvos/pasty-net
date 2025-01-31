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
