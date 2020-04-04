// interface fun<a, b> { (a: a): b }

// type InputSet = number[]



// const id = (x: number) => x
// const pair = (x: number) => (y: number): [number, number] => [x, y]
// const triple: (x: number) => (y: number) => (z: number) => [number, number, number] = x => y => z => [x, y, z]

// const sum2 = (x: number) => (y: number): number => x + y
// const sum3 = (x: number) => (y: number) => (z: number): number => x + y + z

// const multiple2 = (x: number) => (y: number): number => x * y
// const multiple3 = (x: number) => (y: number) => (z: number): number => x * y * z

// interface FromBuilder<sets extends InputSet[] = [], res = number> {
//   from(...i: sets): ResultBuilder<sets, res>
// }

// interface ResultBuilder<sets extends InputSet[] = [], res = number> {
//   when(p: (...s: TupleToNumbers<sets>) => boolean, ...pp: ((...s: TupleToNumbers<sets>) => boolean)[]): ResultBuilder<sets, res>
//   asArray(): res[]
//   asSet(): Set<res>
//   asGenerator(): Generator<res, res, res>
// }

// type TupleToNumbers<t extends any[]> =
//   t extends [any, any, any, any, any, any, any, any] ? [number, number, number, number, number, number, number, number] :
//   t extends [any, any, any, any, any, any, any] ? [number, number, number, number, number, number, number] :
//   t extends [any, any, any, any, any, any] ? [number, number, number, number, number, number] :
//   t extends [any, any, any, any, any] ? [number, number, number, number, number] :
//   t extends [any, any, any, any] ? [number, number, number, number] :
//   t extends [any, any, any] ? [number, number, number] :
//   t extends [any, any] ? [number, number] :
//   t extends [any] ? [number] :
//   []

// interface Select {
//   <res>(out: (a: number) => (b: number) => (c: number) => res): FromBuilder<[InputSet, InputSet, InputSet], res>
//   <res>(out: (a: number) => (b: number) => res): FromBuilder<[InputSet, InputSet], res>
//   <res>(out: (a: number) => res): FromBuilder<[InputSet], res>
// }

// type OutFunction<res> =
//   | ((n: number) => res)
//   | ((n: number) => OutFunction<res>)

// const resultBuilder = <sets extends InputSet[], res>(f: OutFunction<res>, sets: InputSet[], ifs: ((...n: number[]) => boolean)[] = []): ResultBuilder<sets, res> => ({
//   when: (...ifs1: any[]) => resultBuilder<sets, res>(f, sets, [...ifs, ...ifs1]),
//   asArray: () => {
//     const size = Math.min(...sets.map(s => s.length))
//     const res: res[] = []

//     Array.from({ length: size }).forEach((_, i) => {
//       if (ifs.length != 0 && ifs.some(_if => !_if(...sets.map(s => s[i])))) return

//       let current_f: OutFunction<res> | res = f
//       sets.forEach(curren_s => {
//         if (typeof current_f == 'function')
//           current_f = (current_f as OutFunction<res>)(curren_s[i])
//       })

//       res.push(current_f as any)
//     })

//     return res
//   },
//   asGenerator: () => null!,
//   asSet: () => new Set()
// })

// const fromBuilder = <sets extends InputSet[], res>(f: OutFunction<res>): FromBuilder<sets, res> => ({
//   from: (...sets) => resultBuilder<sets, res>(f, sets)
// })

// const select: Select = (out: any) => fromBuilder(out) as any

// const s = select(x => y => [x, y])
//   .from(range(0, 10), repeat(1, 2, 3)(6))
//   .when((_, y) => y % 2 == 0, x => x == 2, (x, y) => y == 1)
//   .asArray()
// // const s2 = select(pair)
// //   .from(select(id).from(range(0, 10)).asArray(), range(0, 10))
// //   .asArray()  

// console.log(s)

const range = (a: number, b: number, step = 1): number[] => {
  const res = [a]
  let curr = a

  while (curr < b) {
    curr += step
    res.push(curr)
  }

  return res
}
const repeat = <a>(...sequence: a[]) => (times: number): a[] =>
  Array.from({ length: times }).map(() => sequence).reduce((a, b) => a.concat(b), [])

interface Zip {
  <a, b>(a: a[], b: b[]): [a, b][]
  <a, b, c>(a: a[], b: b[], c: c[]): [a, b, c][]
  <a, b, c, d>(a: a[], b: b[], c: c[], d: d[]): [a, b, c, d][]
  <a, b, c, d, e>(a: a[], b: b[], c: c[], d: d[], e: e[]): [a, b, c, d, e][]
  <a, b, c, d, e, f>(a: a[], b: b[], c: c[], d: d[], e: e[], f: f[]): [a, b, c, d, e, f][]
}

const zip: Zip = (...a: any[]) => {
  const size = Math.min(...a.map(a => a.length))
  return Array.from({ length: size }).map((_, i) => a.map(a => a[i])) as any
}

const charMap = {
  a: 'a',
  b: 'b',
  c: 'c',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
  h: 'h',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  p: 'p',
  q: 'q',
  r: 'r',
  s: 's',
  t: 't',
  u: 'u',
  v: 'v',
  w: 'w',
  x: 'x',
  y: 'y',
  z: 'z'
}

const digits = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '7',
  '8': '8',
  '9': '9'
}

type char = keyof typeof charMap | keyof typeof digits

const chars = (a: char, b: char): char[] => {
  const chars_array = Object.keys(charMap).map(i => charMap[i])
  const c_index_a = chars_array.indexOf(a)
  if(c_index_a != -1) {
    const index_b = chars_array.indexOf(b)
    if(index_b == -1) return [] 
    if(index_b <= c_index_a) return []
    return chars_array.splice(c_index_a, index_b - c_index_a + 1)
  }
  const digits_array = Object.keys(digits).map(i => digits[i])
  const d_index_a = digits_array.indexOf(a)
  if(d_index_a != -1) {
    const index_b = digits_array.indexOf(b)
    if(index_b == -1) return []
    if(index_b <= d_index_a) return []
    return digits_array.splice(d_index_a, index_b - d_index_a + 1)
  }
  return []
}

interface Comprehension {
  <i, o>(i_o: i[], out: (i_0: i) => o, ...predicates: Array<(i_o: i) => boolean>): o[]
  <i1, i2, o>(i_0: i1[], i_1: i2[], out: (i_0: i1, i_1: i2) => o, ...predicates: Array<(i_0: i1, i_1: i2) => boolean>): o[]
  <i1, i2, i3, o>(i_0: i1[], i_1: i2[], i_2: i3[], out: (i_0: i1, i_1: i2, i_2: i3) => o, ...predicates: Array<(i_0: i1, i_1: i2, i_2: i3) => boolean>): o[]
  <i1, i2, i3, i4, o>(i_0: i1[], i_1: i2[], i_2: i3[], i_3: i4[], out: (i_0: i1, i_1: i2, i_2: i3, i_3: i4[]) => o, ...predicates: Array<(i_0: i1, i_1: i2, i_2: i3, i_3: i4) => boolean>): o[]
}

interface SetComprehension {
  <i, o>(i_o: i[], out: (i_0: i) => o, ...predicates: Array<(i_o: i) => boolean>): Set<o>
  <i1, i2, o>(i_0: i1[], i_1: i2[], out: (i_0: i1, i_1: i2) => o, ...predicates: Array<(i_0: i1, i_1: i2) => boolean>): Set<o>
  <i1, i2, i3, o>(i_0: i1[], i_1: i2[], i_2: i3[], out: (i_0: i1, i_1: i2, i_2: i3) => o, ...predicates: Array<(i_0: i1, i_1: i2, i_2: i3) => boolean>): Set<o>
  <i1, i2, i3, i4, o>(i_0: i1[], i_1: i2[], i_2: i3[], i_3: i4[], out: (i_0: i1, i_1: i2, i_2: i3, i_3: i4[]) => o, ...predicates: Array<(i_0: i1, i_1: i2, i_2: i3, i_3: i4) => boolean>): Set<o>
}

interface MapComprehension {
  <i, k, v>(i_o: i[], out: (i_0: i) => [k, v], ...predicates: Array<(i_o: i) => boolean>): Map<k, v>
  <i1, i2, k, v>(i_0: i1[], i_1: i2[], out: (i_0: i1, i_1: i2) => [k, v], ...predicates: Array<(i_0: i1, i_1: i2) => boolean>): Map<k, v>
  <i1, i2, i3, k, v>(i_0: i1[], i_1: i2[], i_2: i3[], out: (i_0: i1, i_1: i2, i_2: i3) => [k, v], ...predicates: Array<(i_0: i1, i_1: i2, i_2: i3) => boolean>): Map<k, v>
  <i1, i2, i3, i4, k, v>(i_0: i1[], i_1: i2[], i_2: i3[], i_3: i4[], out: (i_0: i1, i_1: i2, i_2: i3, i_3: i4[]) => [k, v], ...predicates: Array<(i_0: i1, i_1: i2, i_2: i3, i_3: i4) => boolean>): Map<k, v>
}

const cross_join = (...a: any[][]): any[] =>  {
  let f = (a: any[], b: any[]) => [].concat(...a.map(a => b.map(b => [].concat(a, b))));
  // @ts-ignore
  let cartesian = (a: any[], b:any[], ...c: any[]) => b ? cartesian(f(a, b), ...c) : a;


  return cartesian(a[0], a[1], ...a.splice(2))
}


const array: Comprehension = function(...args) {
  const out_index = args.findIndex(a => typeof a == 'function')
  const inputs = [...args].splice(0, out_index)

  const f = args[out_index]
  const predicates = args.splice(out_index + 1)

  if (inputs.length == 1) return inputs[0].map(f)

  if (inputs.length == 2) {
    const values = c(inputs[0], inputs[1])
    // values.forEach(v => res.push(f(...v)))
    return values.map(v => f(...v))
  }

  if (inputs.length == 3) {
    const values = cc(inputs[0], inputs[1], inputs[2])
    // values.forEach(v => res.push(f(...v)))
    return values.map(v => f(...v))
  }

  return []
}

const set: SetComprehension = (...args: any[]) => new Set(array.apply(undefined, args))



const c = (a: any[], b: any[]): any[] => a.map(a => b.map(b => [a, b])).reduce((a, b) => a.concat(b))
const cc = (a: any[], b: any[], _c: any[]): any[] => c(c(a, b), _c).map(v => v[0].concat([v[1]]))

const map: MapComprehension = function (...args) {
  const out_index = args.findIndex(a => typeof a == 'function')
  const inputs = [...args].splice(0, out_index)

  const f = args[out_index]
  const predicates = args.splice(out_index + 1)

  if(inputs.length == 1) return new Map(inputs[0].map(f))

  if(inputs.length == 2) {
    const values = c(inputs[0], inputs[1])
    // values.forEach(v => res.push(f(...v)))
    return new Map(values.map(v => f(...v)))
  }

  if (inputs.length == 3) {
    const values = cc(inputs[0], inputs[1], inputs[2])
    // values.forEach(v => res.push(f(...v)))
    return new Map(values.map(v => f(...v)))
  }

  return new Map()
}

const m = map(range(0, 2), range(3, 5), range(6, 7), (x, y, z) => [z, x])
console.log(m)

// const s4 = comp(range(0, 2), range(4,6), (x, y) => x)

// console.log(s4)


// console.log(cc(range(0, 2), range(4, 6), range(7, 9)))

// const s5 = comp(repeat(range(0, 10))(10), x => x)

// console.log(chars('r', 'z'))
// console.log(chars('0', '3'))
// type InputSet = number[]

// interface SetBuilder<res> {
//   from(input1: InputSet, input2: InputSet):ResultBuilder<res>
// }

// interface ResultBuilder<res> {
//   when(p: (n1: number, n2: number) => boolean, ...pp: ((n: number) => boolean)[]): ResultBuilder<res>
//   asArray(): res[]
// }

// interface Select {
//   <res>(out: (a: number) => (b: number) => (c: number) => res): ResultBuilder3<res>
//   <res>(out: (a: number) => (b: number) => res): ResultBuilder2<res>
//   <res>(out: (a: number) => res): ResultBuilder<res>
// }

// const select: Select = () => null!

// const s = select(x => y => x + y) //ResultBuilder2<number]>


// type F = (a: number, b: number) => number
// const f1: F = (a: number, b: number) => a
// const f2: F = (a: number) =>  a


/***
 * Set comprehension is a method from mathimatics to describe a complex (often multi-dimensional) set of values in an elegant way.
 * Many programming languages implement this as list comprehension. Even JavaScript had it at some points, but support for is has been dropped by all browsers.
 *
 * [explain the rules]
 *
 * [explain the why and link to modern data science things]
 *
 * [importance of type safety in bigger pieces of logic]
 *
 * [explain the challange of a variable amount of input sets]
 *
 * [explain overloading in TypeScript]
 *
 * [point out the difference in TypeScript type inference with curried and non-curried functions]
 *
 * [explain the rest parameters with a tupple in TypeScript]
 *
 * [explain how this is used with the generic argument to sync the argument count of the out func with the amount of required inputs]
 *
 * [explain how this is used with the amount of arguments to the when predicates]
 *
 * [expain the benefits of lazy evalutation]
 *
 * [show some more examples]
 *
 * [conclusion with ts is expic, types are amezing, see how good we are]
 */