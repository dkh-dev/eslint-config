/* eslint-disable */

// start @typescript-eslint/no-unused-vars
function test(a?: string) {
}
// end

// start @typescript-eslint/consistent-type-exports, @typescript-eslint/member-delimiter-style
type A = {
  a: string;
  b: string;
}
const B = 1
export { A, B }
// end

// start @typescript-eslint/no-confusing-void-expression
const a = console.log(1)
export { a }
// end
