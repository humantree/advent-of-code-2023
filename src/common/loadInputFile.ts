export default async function loadInputFile(day: number) {
  const dayString = day.toString().padStart(2, "0")
  const file = Bun.file(`${import.meta.dir}/../../input/${dayString}.txt`)
  const text = await file.text()
  const input = text.split("\n")
  return input
}
