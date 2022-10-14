function printAll2(strs: string | string[] | null) {
  if (typeof strs === 'object') {
    strs; // strs: string[] | null
  }

  if (strs && typeof strs === 'object') {
    strs; // strs: string[]
    // strs.
  }
}
