# List Comprehension for TypeScript

This library implements comprehension for arrys, sets and maps for TypeScript. It also offer a powerful library to constrcut populated arrays that can be used with the comprehension functions.

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