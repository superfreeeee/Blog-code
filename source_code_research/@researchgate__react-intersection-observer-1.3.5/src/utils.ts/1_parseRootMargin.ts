const marginRE = /^-?\d*\.?\d+(px|%)$/;

/**
 * margin string => [top, right, bottom, left]
 * @param rootMargin
 * @returns
 */
export function parseRootMargin(rootMargin?: string) {
  const marginString = rootMargin ? rootMargin.trim() : '0px';

  const result = marginString.split(/\s+/).map((margin) => {
    if (!marginRE.test(margin)) {
      throw new Error('rootMargin must be a string literal containing pixels and/or percent values');
    }
    return margin;
  });

  const m0 = result.shift();
  const [m1 = m0, m2 = m0, m3 = m1] = result;

  return `${m0} ${m1} ${m2} ${m3}`;
}
