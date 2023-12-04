import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(4)

type Card = {
  id: number
  matches: number[]
  scratchedNumbers: number[]
  winningNumbers: number[]
}

const cards: Card[] = input.map((line) => {
  const [text, numbers] = line.split(":")
  const id = parseInt(text.split(/\s+/)[1])
  const [winningNumbers, scratchedNumbers] = numbers.split("|").map((numbers) =>
    numbers
      .trim()
      .split(/\s+/)
      .map((number) => parseInt(number))
  )

  const matches = scratchedNumbers.filter((number) =>
    winningNumbers.includes(number)
  )

  return { id, matches, scratchedNumbers, winningNumbers }
})

const pointsTotal = cards.reduce((acc, card) => {
  const points = card.matches.length ? Math.pow(2, card.matches.length - 1) : 0
  return (acc += points)
}, 0)

console.log("How many points are the cards worth in total?")
console.log(pointsTotal)

const cardQueue = [...cards]
let cardsCounted = 0
let card

while ((card = cardQueue.shift())) {
  cardsCounted++

  for (let i = 1; i <= card.matches.length; i++) {
    const prizeCardId = card.id + i
    const prizeCard = cards.find((card) => card.id === prizeCardId)
    if (!prizeCard) throw new Error(`No card found with the ID ${prizeCardId}`)
    cardQueue.push(prizeCard)
  }
}

console.log()
console.log(
  "Process all of the original and copied scratchcards until no more scratchcards are won. Including the original set of scratchcards, how many total scratchcards do you end up with?"
)
console.log(cardsCounted)
