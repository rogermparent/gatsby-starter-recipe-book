const numericQuantity = require("numeric-quantity")
const formatQuantity = require("format-quantity")
const getNumberRegex = /([0-9]+\/[0-9]+)|([0-9]+(?:(?: [1-9]+\/[1-9]+)|(?:\.[1-9]+))?)/g

/*
   There's three things the regex matches:
   - A single fraction (1/2)
   - A single decimal number (1.5)
   - A mixed fraction (1 1/2)

   Anything in the string that matches is converted to a float,
   multiplied, then re-inserted in place.
*/

const multiplyNumbersInString = (str, multiplier, vulgar) => {
  return str.replace(getNumberRegex, num =>
    formatQuantity(numericQuantity(num) * multiplier, vulgar)
  )
}

module.exports = multiplyNumbersInString
