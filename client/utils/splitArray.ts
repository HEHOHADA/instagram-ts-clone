export const splitArray = <T>(arr: Array<T>, chunks: number): Array<Array<T>> =>
  [...Array(Math.ceil(arr.length / chunks))].map((_, c) =>
    arr.filter((_, i) =>
      Math.floor(i / chunks) === c))
