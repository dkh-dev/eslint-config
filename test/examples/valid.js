'use strict'

const a = 0.9

;[].map(() => a + 0.1)

let i = 0

for (;;) {
  console.log(i)
  if (i > 1) {
    break
  }
  i++
}
