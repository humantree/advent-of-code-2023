import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(1)

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const

function parseNumber(number: string) {
  const int = parseInt(number)
  if (!Number.isNaN(int)) return int

  if (numberWords[number as keyof typeof numberWords]) {
    return numberWords[number as keyof typeof numberWords]
  }

  throw new Error(`Unable to parse string ${number}`)
}

const numberRegex = new RegExp(`\\d|${Object.keys(numberWords).join("|")}`, "g")

const lineNumbers = input.map((line) => {
  const matches = []
  let results

  while ((results = numberRegex.exec(line))) {
    matches.push(results[0])
    numberRegex.lastIndex = results.index + 1
  }

  if (!matches) throw new Error("No numbers found.")
  const numberMatches = matches.map(parseNumber)
  const number = `${numberMatches[0]}${numberMatches[matches.length - 1]}`
  return parseInt(number)
})

const total = lineNumbers.reduce((acc, number) => (acc += number), 0)

console.log("What is the sum of all of the calibration values?")
console.log(total)
