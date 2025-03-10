// console.log(letters)
const body = document.querySelector('body')

const defaultButton = document.querySelector('.default');
const clearButton = document.querySelector('.clear');

const visualiseButton = document.querySelector('.visualise');


const removeElement = (identifier) => {
  if (body.querySelector(identifier)) {
    body.removeChild(body.querySelector(identifier))
  }
}

const removeExistingElements = () => {
  removeElement('p');
  removeElement('.list')
}

const runLz78Algo = (letters, visual) => {
  let i = 0
  while (i < letters.length) {
    const matches = visual.filter(v => v.code[0] && v.code[0] === letters[i])

    if (matches.length === 0) {
      visual.push({
        index: visual.length,
        output: `(${0}, '${letters[i]}')`,
        code: `${letters[i]}`
      })
      i++
    } else {
      matches.reverse()
      for (const m of matches) {
        const completeMatch = [...m.code].every((char, index) => {
          return char === letters[i + index]
        })
        if (completeMatch) {

          const outputStr = letters[i + m.code.length] || 'END'
          visual.push({
            index: visual.length,
            output: `(${m.index}, ${outputStr})`,
            code: `${m.code + outputStr}`
          })
          i += m.code.length + 1;
          break
        }
      }
    }
  }
}

const calcReduction = (orginalAmount, newAmount) => {
  const reducedAmount = (orginalAmount - newAmount)/orginalAmount * 100
  return reducedAmount.toFixed(2)
}

const addInfoToBody = (root, visual) => {
  const p = document.createElement('p');
  if (root.value.length === 0) {
    p.textContent = 'Please type more characters to see the visualisation in action.'
  } else {
    p.textContent = `The original text required ${root.value.length} characters. After compression it requires only ${visual.length} characters. A reduction of approximately ${calcReduction(root.value.length, visual.length)}%.`
  }
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
  let grid = document.createElement('div');
  grid.classList.add('grid')
  grid.append(cardTitle)
  visual.forEach((v, i) => {
    const card = document.createElement('div')
    card.classList.add('card')
    const index = document.createElement('span')
    index.textContent = v.index
    index.classList.add('col')
  
    const output = document.createElement('span')
    output.textContent = v.output
    output.classList.add('col')
  
    const code = document.createElement('span')
    code.textContent = `'${v.code}'`
    code.classList.add('col')
  
    card.append(index, output, code)
    grid.append(card)
    if (grid.childNodes.length === 10) {
      list.append(grid);
      grid = document.createElement('div');
      grid.classList.add('grid')
    }
  })
  if (grid.childNodes.length !== 10) {
    list.append(grid)
  }
  body.append(list)
}


const produceVisualisation = () => {
  removeExistingElements();

  const root = document.getElementById('root')
  const letters = [...root.value]

  const visual = []
  runLz78Algo(letters, visual);

  addInfoToBody(root, visual)

}

visualiseButton.addEventListener('click', produceVisualisation)

const updatedTextValue = (type) => {
  const main = document.querySelector('main')
  const root = document.getElementById('root');
  const buttonSection = document.querySelector('section');
  const updatedRoot = root.cloneNode();
  switch (type) {
    case 'clear':
      updatedRoot.value = ''
      break;
    case 'default':
      updatedRoot.value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      break;
    default:
      console.error("Type not found", type)
      break;
  }
  main.removeChild(root);
  main.removeChild(buttonSection);
  body.removeChild(main)
  removeExistingElements()
  main.append(updatedRoot)
  main.append(buttonSection)
  body.append(main)
}

const clearText = () => {
  updatedTextValue('clear')
}

clearButton.addEventListener('click', clearText)

const setToDefaultText = () => {
  updatedTextValue('default')
}

defaultButton.addEventListener('click', setToDefaultText)