import { states } from '../config/states.json'

export default {
  anims: {
    live: {
      interval: 60000,
      getProgress: now => {
        const time = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds()
        return time / 86400
      }
    },
    cycle: {
      interval: 50,
      getProgress: now => {
        const time = (now.getSeconds() * 1000) + now.getMilliseconds()
        return time / 60000
      }
    }
  },
  defaultColours: {
    c0: '#fff',
    c1: '#eee',
    c2: '#d2d2d2',
    c3: '#c5c5c5',
    c4: '#a2a2a2',
    c5: '#b1b1b1',
    c6: '#838383',
    c7: '#737373',
    c8: '#393939',
    c9: '#1f1f1f',
    c10: '#000',
    c99: '#fff'
  },
  states
}
