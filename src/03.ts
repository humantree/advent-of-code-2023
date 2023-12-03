import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(3)

type Location = [number, number]

type Number = {
  endLocation: Location
  partNumber: boolean
  startLocation: Location
  value: number
}

type Symbol = {
  location: Location
  symbol: string
}

const numbers: Number[] = []
const symbols: Symbol[] = []

function getBorderingLocations(number: Number) {
  const locations: Location[] = []
  const { startLocation, endLocation } = number

  const startX = startLocation[0] - 1
  const endX = endLocation[0] + 1
  const y = startLocation[1]

  for (let x = startX; x <= endX; x++) {
    locations.push([x, y - 1])
    locations.push([x, y + 1])
  }

  locations.push([startX, y])
  locations.push([endX, y])
  return locations
}

for (let y = 0; y < input.length; y++) {
  const row = input[y]

  let currentNumber = ""

  for (let x = 0; x < row.length; x++) {
    const value = row[x]

    if (value.match(/\d/)) {
      currentNumber += value
    } else {
      if (currentNumber.length) {
        numbers.push({
          startLocation: [x - currentNumber.length, y],
          endLocation: [x - 1, y],
          partNumber: false,
          value: parseInt(currentNumber),
        })
        currentNumber = ""
      }

      if (value !== ".") {
        symbols.push({
          location: [x, y],
          symbol: value,
        })
      }
    }
  }

  if (currentNumber.length) {
    const x = row.length
    numbers.push({
      startLocation: [x - currentNumber.length, y],
      endLocation: [x - 1, y],
      partNumber: false,
      value: parseInt(currentNumber),
    })
  }
}

for (const number of numbers) {
  const borderingLocations = getBorderingLocations(number)

  for (const symbol of symbols) {
    const foundSymbol = borderingLocations.find(
      (location) =>
        location[0] === symbol.location[0] && location[1] === symbol.location[1]
    )

    if (foundSymbol) {
      number.partNumber = true
      break
    }
  }
}

const partNumbersTotal = numbers
  .filter((number) => number.partNumber)
  .reduce((acc, number) => (acc += number.value), 0)

console.log(
  "What is the sum of all of the part numbers in the engine schematic?"
)
console.log(partNumbersTotal)
