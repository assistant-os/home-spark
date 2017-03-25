import EventEmitter from 'events'
import ping from 'ping'

class Presence extends EventEmitter {

    constructor (opts) {
        super()
        this.devices = []
        this.timeout = 1000 * 10
        if (opts && opts.interval) {
            this.timeout = opts.interval
        }
        this.interval = null
    }

    addDevice (device) {
        this.devices.push(device)
    }

    check () {
        for (let device of this.devices) {
            // console.log('check', device.ip)
            ping.sys.probe(device.ip, (isAlive) => {
                let isPresent = isAlive
                let previousIsPresent = device.isPresent
                device.isPresent = isPresent
                if (isPresent !== previousIsPresent && previousIsPresent !== null) {
                    this.emit('device-presence-changed', {
                        device: device,
                        previous: previousIsPresent
                    })
                }
            })
        }
    }

    watch () {
        // console.log('watch')
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
        this.check()
        this.interval = setInterval(() => {
            this.check()
        }, this.timeout)
    }
}

export default Presence
