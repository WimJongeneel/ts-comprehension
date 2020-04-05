# List Comprehension for TypeScript

This library implements comprehension for arrys, sets and maps for TypeScript. It also offer a powerful library to construct populated arrays that can be used with the comprehension functions.

## Examples

```ts
const titles = array(
  chars('a', 'z'), ['foo', 'bar', 'baz'],
  (c, t) => [c, t],
  (c, t) => t.startsWith(c)
)
// [ [ 'b', 'bar' ], [ 'b', 'baz' ], [ 'f', 'foo' ] ]
```

```ts
const matrix = array(
  zip(range(0, 3), repeat(range(0, 3))(4)),
  ([x, y]) => y.map(y => `${x}, ${y}`)
)
/*
[ [ '0, 0', '0, 1', '0, 2', '0, 3' ],
  [ '1, 0', '1, 1', '1, 2', '1, 3' ],
  [ '2, 0', '2, 1', '2, 2', '2, 3' ],
  [ '3, 0', '3, 1', '3, 2', '3, 3' ] ]
*/
```

## Array constructors

```ts
let range: (a: number, b: number, step = 1) => number[]
let repeat: <a>(...sequence: a[]) => (times: number) => a[]
let zip: <a, b>(a: a[], b: b[]) => [a, b][]
let zip: <a, b, c>(a: a[], b: b[], c: c[]): [a, b, c][]
let zip: <a, b, c, d>(a: a[], b: b[], c: c[], d: d[]) => [a, b, c, d][]
let zip: <a, b, c, d, e>(a: a[], b: b[], c: c[], d: d[], e: e[]) => [a, b, c, d, e][]
let zip: <a, b, c, d, e, f>(a: a[], b: b[], c: c[], d: d[], e: e[], f: f[]) => [a, b, c, d, e, f][]
let chars: chars = (a: char, b: char) => char[]
```