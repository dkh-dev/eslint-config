const a = () => {
  Promise.resolve()
    .then((v) => console.log(v))
    .catch(console.log)
}

a()

let i = 0

for (;;) {
  console.log(i)

  if (i > 1) {
    break
  }

  i++
}
