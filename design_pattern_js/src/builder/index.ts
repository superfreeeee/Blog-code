import { group, log } from '../utils/console'
import SVGBuilder from './svg/Builder'

import { writeFile } from '../utils/file'
import path from 'path'

group('test 1', () => {
  const svg: string = new SVGBuilder()
    .addRect({
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
      width: 100,
      height: 100,
      style: {
        fill: 'red',
      },
    })
    .group()
    .addRect({
      x: 100,
      y: 0,
      rx: 0,
      ry: 0,
      width: 100,
      height: 100,
      style: {
        fill: 'yellow',
      },
    })
    .groupEnd()
    .addRect({
      x: 200,
      y: 0,
      rx: 0,
      ry: 0,
      width: 100,
      height: 100,
      style: {
        fill: 'blue',
      },
    })
    .addCircle({
      cx: 50,
      cy: 50,
      r: 20,
      style: {
        fill: 'green',
      },
    })
    .addLine({
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
      style: {
        stroke: 'white',
        'stroke-width': '2',
      },
    })
    .build()

  log(`svg:`, svg)
  const filePath = path.resolve(
    __dirname,
    '../../results/builder/svg_test_1.svg'
  )
  writeFile(filePath, svg)
})
