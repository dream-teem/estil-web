export const flatMap = <T extends {}>(
  array: T[],
  getChildren: (a: T) => T[]
) => {
  let res: T[] = []

  for (const node of array) {
    res = res.concat(flatMap(getChildren(node), getChildren))
    res.push(node)
  }

  return res
}
