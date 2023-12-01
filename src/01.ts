import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(1)

const lineNumbers = input.map((line) => {
  const matches = line.match(/\d/g)
  if (!matches) throw new Error("No numbers found.")
  const number = `${matches[0]}${matches[matches.length - 1]}`
  return parseInt(number)
})

const total = lineNumbers.reduce((acc, number) => (acc += number), 0)

console.log("What is the sum of all of the calibration values?")
console.log(total)
