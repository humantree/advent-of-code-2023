import loadInputFile from "./common/loadInputFile"

const input = await loadInputFile(5)

type SeedMapRange = {
  destinationRangeStart: number
  sourceRangeStart: number
  rangeLength: number
}

type SeedMap = {
  name: string
  ranges: SeedMapRange[]
}

function getSeedNumberForMap(seed: number, seedMap: SeedMap): number {
  const range = seedMap.ranges.find(
    (range) =>
      range.sourceRangeStart <= seed &&
      range.sourceRangeStart + range.rangeLength >= seed
  )

  if (range) return range.destinationRangeStart - range.sourceRangeStart + seed
  return seed
}

const seeds = input
  .shift()
  ?.split("seeds: ")[1]
  .split(" ")
  .map((id) => parseInt(id))!

const seedMaps: SeedMap[] = []
let nextName = ""
let nextRanges: SeedMapRange[] = []

input.forEach((value, index) => {
  if (value.endsWith("map:")) {
    if (nextName.length) {
      seedMaps.push({ name: nextName, ranges: nextRanges })
      nextRanges = []
    }

    nextName = value.split(" map:")[0]
  } else if (value.length) {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = value
      .split(" ")
      .map((number) => parseInt(number))

    nextRanges.push({
      destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    })
  }
})

seedMaps.push({ name: nextName, ranges: nextRanges })

const locations: number[] = []
let currentResult: number

for (const seed of seeds) {
  currentResult = seed
  for (const seedMap of seedMaps) {
    currentResult = getSeedNumberForMap(currentResult, seedMap)
  }
  locations.push(currentResult)
}

console.log(
  "What is the lowest location number that corresponds to any of the initial seed numbers?"
)
console.log(Math.min(...locations))
