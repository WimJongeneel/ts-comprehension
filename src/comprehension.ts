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


export const array: Comprehension = function(...args) {
  const out_index = args.findIndex(a => typeof a == 'function')
  const inputs = [...args].splice(0, out_index)

  const f = args[out_index]
  const predicates = args.splice(out_index + 1)

  if (inputs.length == 1) return inputs[0].filter(v => predicates.every(p => p(...v))).map(f)

  if (inputs.length == 2) {
    const values = c(inputs[0], inputs[1])
    return values.filter(v => predicates.every(p => p(...v))).map(v => f(...v))
  }

  if (inputs.length == 3) {
    const values = cc(inputs[0], inputs[1], inputs[2])
    return values.filter(v => predicates.every(p => p(...v))).map(v => f(...v))
  }

  return []
}

export const set: SetComprehension = (...args: any[]) => new Set(array.apply(undefined, args))

const c = (a: any[], b: any[]): any[] => a.map(a => b.map(b => [a, b])).reduce((a, b) => a.concat(b))
const cc = (a: any[], b: any[], _c: any[]): any[] => c(c(a, b), _c).map(v => v[0].concat([v[1]]))

export const map: MapComprehension = function (...args) {
  const out_index = args.findIndex(a => typeof a == 'function')
  const inputs = [...args].splice(0, out_index)

  const f = args[out_index]
  const predicates = args.splice(out_index + 1)

  if(inputs.length == 1) return new Map(inputs[0].map(f))

  if(inputs.length == 2) {
    const values = c(inputs[0], inputs[1])
    return new Map(values.map(v => f(...v)))
  }

  if (inputs.length == 3) {
    const values = cc(inputs[0], inputs[1], inputs[2])
    return new Map(values.map(v => f(...v)))
  }

  return new Map()
}

