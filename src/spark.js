import io from 'socket.io-client'
import dotenv from 'dotenv'
import winston from 'winston'
import path from 'path'

import Presence from './modules/presence'
import music from './modules/music'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

let presence = new Presence({
    interval: 5 * 1000
})

let socket = io(process.env.SERVER_URL, {
    reconnection: true
})

socket.on('connect', () => {
    winston.info('connected', { host: process.env.SERVER_URL })
    socket.emit('hello', {
        token: process.env.HOME_SPARK_TOKEN
    })

    socket.on('set-behavior', (behaviors) => {
        for (let behavior of behaviors) {
            if (behavior.type === 'watch-presence') {
                presence.addDevice({
                    device: behavior.device,
                    ip: behavior.device.ip,
                    isPresent: null
                })
                // console.log(behavior)
            }
        }
        winston.info('behavior-ready', { behaviors: behaviors })
    })

    socket.on('start-music', ({ speed }) => {
      winston.info('start-music')
      music.setVolume(80)
      music.play(path.join(__dirname, '../', process.env.MUSIC))
      // if (speed !== 'none') {
      //   let volume = 0
      //   let intervalTimeout = 100
      //   let pitch = 1
      //   if (speed === 'fast') {
      //     intervalTimeout = 50
      //   } else if (speed === 'medium') {
      //     intervalTimeout = 150
      //   } else if (speed === 'slow') {
      //     intervalTimeout = 250
      //   }
      //
      //   let interval = setInterval(() => {
      //     volume += pitch
      //     music.setVolume(volume)
      //     winston.info('setVolume', volume)
      //     if (volume >= 90) {
      //       clearInterval(interval)
      //     }
      //   }, intervalTimeout)
      // }
    })

    socket.on('stop-music', ({ speed }) => {
      winston.info('stop-music')
      music.stop()
    })

    socket.on('volume-up', () => {
      winston.info('volume-up')
      music.setVolume(music.getVolume() + 5)
    })

    socket.on('volume-down', () => {
      winston.info('volume-down')
      music.setVolume(music.getVolume() - 5)
    })
})
/*
presence.watch()

presence.on('device-presence-changed', ({ device, previous }) => {

    socket.emit('behavior-result', {
        token: process.env.HOME_SPARK_TOKEN,
        type: 'watch-presence',
        payload: {
            device: device.device,
            currentState: device.isPresent,
            previousState: previous
        }
    })
    winston.info('device-presence-changed', { name: device.name, previous: previous, new:device.isPresent })
})*/
