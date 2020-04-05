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

export const array: Comprehension = function(...args) {
  const out_index = args.findIndex(a => typeof a == 'function')
  const inputs = [...args].splice(0, out_index)

  const f = args[out_index]
  const predicates = args.splice(out_index + 1)

  if (inputs.length == 1) return inputs[0].filter(v => predicates.every(p => p(...v))).map(f)

  return cross_join(inputs).filter(v => predicates.every(p => p(...v))).map(v => f(...v))
}

export const set: SetComprehension = (...args: any[]) => new Set(array.apply(undefined, args))

const cross_join_with = (current: any[][], next: any[]) => next.map(n => current.map(c => c.concat(n))).reduce((a, b) => a.concat(b), [])

const cross_join = (sets: any[][]) => {
  let seed = sets.shift().map(x => [x])
  return sets.reduce(cross_join_with, seed)
}

export const map: MapComprehension = function (...args) {
  const out_index = args.findIndex(a => typeof a == 'function')
  const inputs = [...args].splice(0, out_index)

  const f = args[out_index]
  const predicates = args.splice(out_index + 1)

  if(inputs.length == 1) return new Map(inputs[0].map(f))

  return new Map(cross_join(inputs).filter(v => predicates.every(p => p(...v))).map(f))
}

