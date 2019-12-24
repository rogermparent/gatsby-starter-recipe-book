const numericQuantity = require("numeric-quantity")
const formatQuantity = require("format-quantity")
const getNumberRegex = /((?:[0-9]+\/[0-9]+)|(?:[0-9]+(?:(?: [1-9]+\/[1-9]+)|(?:\.[1-9]+))?))/g

/*
  There's three things the regex matches:
  - A single fraction (1/2)
  - A single decimal number (1.5)
  - A mixed fraction (1 1/2)
*/

const splitByNumbers = (str) => {
  const split = str.split(getNumberRegex)
  const strings = []
  const numbers = []
  for(const i in split) {
    const token = split[i]
    if(i%2 === 0) {
      strings.push(token)
    } else {
      numbers.push(numericQuantity(token))
    }
  }
  return { strings, numbers }
}

const reconstitute = ({strings, numbers}, vulgar) => {
  const parsedBits = []
  for(const i in strings) {
    parsedBits.push(strings[i])
    if(i < numbers.length) {
      parsedBits.push(formatQuantity(numbers[i], vulgar))
    }
  }
  return parsedBits.join('')
}

const multiplyNumbersInString = (str, multiplier, vulgar) => {
  const {strings, numbers} = splitByNumbers(str)
  return reconstitute(
    {
      strings,
      numbers: multiplier ? numbers.map(x => x*multiplier) : numbers
    },
    vulgar
  )
}

module.exports = {
  splitByNumbers,
  reconstitute,
  multiplyNumbersInString
}
