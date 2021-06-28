import { group } from '../../utils/console'
import { ProcessA, ProcessB, ProcessTemplate } from './templates'

const templateA: ProcessTemplate = new ProcessA()
const templateB: ProcessTemplate = new ProcessB()

group('templateA process', () => {
  templateA.process()
})

group('templateB process', () => {
  templateB.process()
})
