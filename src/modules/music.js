import { spawn } from 'child_process'

let p = null

let isPlaying = false

const setVolume = (value) => {
  spawn('amixer', [ 'set', '"PCM"', `${value}%` ])
}

const play = (filename) => {
  p = spawn('mpg123', [filename])
  isPlaying = true
}

const stop = () => {
  if (null !== p) {
    p.kill('SIGKILL')
    isPlaying = false
  }
}

export default {
  play,
  stop,
  setVolume
}
