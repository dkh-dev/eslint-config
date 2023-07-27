/* eslint-disable */

// start strict, func-style, no-empty-function, no-unused-vars
function test(a) {
}
// end

// start strict, sonarjs/no-extra-arguments
const say = (a, b) => console.log(a, b)
say('hello', 'world', '!')
// end

// start strict, sonarjs/no-one-iteration-loop
for (let i = 0; i < 1; i++) {
  break
}
// end
