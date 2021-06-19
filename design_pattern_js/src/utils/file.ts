import fs from 'fs'
import { log } from './console'

export function writeFile(path: string, data: string) {
  try {
    fs.writeFileSync(path, data, { encoding: 'utf-8' })
  } catch (err) {
    log('writeFile failed:', err)
  }
}
