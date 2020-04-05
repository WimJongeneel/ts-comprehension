export const range = (a: number, b: number, step = 1): number[] => {
  const res = [a]
  let curr = a

  while (curr < b) {
    curr += step
    res.push(curr)
  }

  return res
}

export const repeat = <a>(...sequence: a[]) => (times: number): a[] =>
  Array.from({ length: times }).map(() => sequence).reduce((a, b) => a.concat(b), [])

interface Zip {
  <a, b>(a: a[], b: b[]): [a, b][]
  <a, b, c>(a: a[], b: b[], c: c[]): [a, b, c][]
  <a, b, c, d>(a: a[], b: b[], c: c[], d: d[]): [a, b, c, d][]
  <a, b, c, d, e>(a: a[], b: b[], c: c[], d: d[], e: e[]): [a, b, c, d, e][]
  <a, b, c, d, e, f>(a: a[], b: b[], c: c[], d: d[], e: e[], f: f[]): [a, b, c, d, e, f][]
}

export const zip: Zip = (...a: any[]) => {
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

export type char = keyof typeof charMap | keyof typeof digits

export const chars = (a: char, b: char): char[] => {
  const chars_array = Object.keys(charMap).map(i => charMap[i])
  const c_index_a = chars_array.indexOf(a)
  if (c_index_a != -1) {
    const index_b = chars_array.indexOf(b)
    if (index_b == -1) return []
    if (index_b <= c_index_a) return []
    return chars_array.splice(c_index_a, index_b - c_index_a + 1)
  }
  const digits_array = Object.keys(digits).map(i => digits[i])
  const d_index_a = digits_array.indexOf(a)
  if (d_index_a != -1) {
    const index_b = digits_array.indexOf(b)
    if (index_b == -1) return []
    if (index_b <= d_index_a) return []
    return digits_array.splice(d_index_a, index_b - d_index_a + 1)
  }
  return []
}