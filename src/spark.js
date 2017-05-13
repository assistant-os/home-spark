import io from 'socket.io-client'
import dotenv from 'dotenv'
import winston from 'winston'

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

    socket.on('start-music', () => {
      winston.info('start-music')
      music.play(process.env.MUSIC)
    })

    socket.on('stop-music', () => {
      winston.info('stop-music')
      music.stop()
    })
})

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
})
