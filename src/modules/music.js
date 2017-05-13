import { spawn } from 'child_process'

let p = null

let isPlaying = false

let volume = 0

const setVolume = (value) => {
  spawn('amixer', [ 'set', '"PCM"', `${value}%` ])
  volume = value
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

setVolume(50)

export default {
  play,
  stop,
  setVolume,
  getVolume: () => {
    return volume
  }
}
