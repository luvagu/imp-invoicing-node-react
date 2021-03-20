import styles from './styles'

export default function compose(classes) {
  const css = {}

  const classesArray = classes.replace(/\s+/g, ' ').split(' ')

  classesArray.forEach((className) => {
    if (typeof styles[className] !== undefined) {
      Object.assign(css, styles[className])
    }
  })

  return css
}