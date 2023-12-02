import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(2)

const maxValues = {
  red: 12,
  green: 13,
  blue: 14,
} as const

function parseInput(input: string[]) {
  return input.map((line) => {
    const idMatch = line.match(/\d+/)
    if (!idMatch) throw new Error("Unexpected input format")
    const id = idMatch[0]

    const sets = line
      .split(": ")[1]
      .split("; ")
      .map((set) =>
        set.split(", ").map((result) => {
          const [count, color] = result.split(" ")
          return { count: parseInt(count), color }
        })
      )

    return { id, sets }
  })
}

const games = parseInput(input)
const possibleIds = []
const gamesPowers = []

for (const game of games) {
  let possible = true
  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  for (const sets of game.sets) {
    for (const set of sets) {
      let maxValue: number
      if ((maxValue = maxValues[set.color as keyof typeof maxValues])) {
        if (set.count > maxValue) possible = false
      } else {
        throw new Error(`Unexpected color found: ${set.color}`)
      }

      switch (set.color) {
        case "red":
          if (set.count > maxRed) maxRed = set.count
          break
        case "green":
          if (set.count > maxGreen) maxGreen = set.count
          break
        case "blue":
          if (set.count > maxBlue) maxBlue = set.count
          break
      }
    }
  }

  if (possible) possibleIds.push(parseInt(game.id))
  gamesPowers.push(maxRed * maxGreen * maxBlue)
}

const possibleIdsTotal = possibleIds.reduce((id, acc) => (acc += id), 0)

console.log(
  "Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes."
)
console.log("What is the sum of the IDs of the possible games?")
console.log(possibleIdsTotal)

const gamesPowersTotal = gamesPowers.reduce((power, acc) => (acc += power), 0)

console.log()
console.log(
  "For each game, find the minimum set of cubes that must have been present."
)
console.log("What is the sum of the power of these sets?")
console.log(gamesPowersTotal)
