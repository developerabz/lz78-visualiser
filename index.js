const root = document.getElementById('root')

const letters = [...root.textContent]
// console.log(letters)
const body = document.querySelector('body')
const visual = [{
  index: 0,
  output: `(${0}, '')`,
  code: ''
}]

let i = 0
while (i < letters.length) {
  let matched = false
  for (const v of visual) {
    // console.log("V code: " + v.code)
    // console.log(letters[i])
    if (v.code.includes(letters[i])) {
      matched = true
      let string = letters[i]
      i++
      while (i < letters.length && v.code.includes(letters[i])) {
        string += letters[i]
        i++
      }
      if (i < letters.length) {
        string += letters[i]
        // console.log("added here")
        visual.push({
          index: visual.length,
          output: `(${v.index}, '${letters[i]}')`,
          code: `'${string}'`
        })
        break
      }
    }
    // console.log(matched)

  }
  if (!matched && i < letters.length) {
    // console.log("nope here")
    visual.push({
      index: visual.length,
      output: `(${0}, '${letters[i]}')`,
      code: `'${letters[i]}'`
    })
    i++
  }

}
const p = document.createElement('p');
p.textContent = `The original text required ${root.textContent.length} characters. After compression it requires only ${visual.length} characters.`
body.append(p)
// console.log(visual)
const list = document.createElement('div');
list.classList.add('list')
const cardTitle = document.createElement('div')
cardTitle.classList.add('card')
const indexTitle = document.createElement('span')
indexTitle.textContent = 'Index'
indexTitle.classList.add('col')
const outputTitle = document.createElement('span')
outputTitle.textContent = 'Output'
outputTitle.classList.add('col')

const codeTitle = document.createElement('span')
codeTitle.textContent = 'Code'
codeTitle.classList.add('col')

cardTitle.append(indexTitle, outputTitle, codeTitle)
list.append(cardTitle)
visual.forEach(v => {
  const card = document.createElement('div')
  card.classList.add('card')
  const index = document.createElement('span')
  index.textContent = v.index
  index.classList.add('col')

  const output = document.createElement('span')
  output.textContent = v.output
  output.classList.add('col')

  const code = document.createElement('span')
  code.textContent = v.code
  code.classList.add('col')

  card.append(index, output, code)
  list.append(card)
})
body.append(list)

