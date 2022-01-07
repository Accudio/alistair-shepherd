import { readFile, writeFile } from 'fs/promises'
import convert from 'color-convert'

const config = JSON.parse(
  await readFile(
    new URL('./states-src.json', import.meta.url)
  )
)

config.states = config.states.map(state => {
  for (const key in state.colours) {
    state.colours[key] = convert.hex.lab(state.colours[key]);
  }
  return state
})

await writeFile(
  new URL('./states.json', import.meta.url),
  JSON.stringify(config),
  'utf8'
)
