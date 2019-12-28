const { multiplyNumbersInString } = require("./string-number-multiplier")

describe("multiplyNumbersInString", () => {
  test("Passes the string through when given no multiplier", () => {
    expect(multiplyNumbersInString("1 and 2")).toBe("1 and 2")
  })

  test("Multiplies whole numbers in a string", () => {
    expect(multiplyNumbersInString("1 and 2", 2)).toBe("2 and 4")
  })

  test("Multiplies numbers surrounded by text", () => {
    expect(multiplyNumbersInString("1and2and3", 2)).toBe("2and4and6")
  })

  test('"Divides" by multiplying by a decimal', () => {
    expect(multiplyNumbersInString("1 and 5", 0.5)).toBe("1/2 and 2 1/2")
  })

  test("Multiplies fractions in a string", () => {
    expect(multiplyNumbersInString("1/2 and 2 1/2", 2)).toBe("1 and 5")
  })

  test("Uses vulgar fractions when specified", () => {
    expect(multiplyNumbersInString("1/2 and 2 1/2", 3, true)).toBe("1½ and 7½")
  })

  test("Multiplies multiple consecutive whole numbers", () => {
    expect(multiplyNumbersInString("1 2 3", 2)).toBe("2 4 6")
  })

  test("Multiplies a decimal at the end of a sentence", () => {
    expect(multiplyNumbersInString("The number is 1.2.", 2)).toBe(
      "The number is 2 2/5."
    )
  })
})
