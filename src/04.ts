import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(4)

const cards = input.map((line) => {
  const [winningNumbers, scratchedNumbers] = line
    .split(":")[1]
    .split("|")
    .map((numbers) =>
      numbers
        .trim()
        .split(/\s+/)
        .map((number) => parseInt(number))
    )

  const matches = scratchedNumbers.filter((number) =>
    winningNumbers.includes(number)
  )

  return { matches, scratchedNumbers, winningNumbers }
})

const pointsTotal = cards.reduce((acc, card) => {
  const points = card.matches.length ? Math.pow(2, card.matches.length - 1) : 0
  return (acc += points)
}, 0)

console.log("How many points are the cards worth in total?")
console.log(pointsTotal)
