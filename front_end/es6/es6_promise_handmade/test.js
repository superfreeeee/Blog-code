try {
  const a = 1
  throw new Error()
} catch (err) {
  console.log(a)
}