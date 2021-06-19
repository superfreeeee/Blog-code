import ElementStyle from '../general/ElementStyle'

export const concatStyles = (style: ElementStyle) => {
  return (Reflect.ownKeys(style) as string[])
    .map((prop) => `${String(prop)}:${String(style[prop])}`)
    .join(';')
}
