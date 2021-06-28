export interface Strategy {
  operation(s: string): void
}

export class Default implements Strategy {
  operation(s: string) {
    return s
  }
}

export class UpperCase implements Strategy {
  operation(s: string) {
    return s.toUpperCase()
  }
}

export class LowerCase implements Strategy {
  operation(s: string) {
    return s.toLowerCase()
  }
}

export class Capitalize implements Strategy {
  operation(s: string) {
    const lower = s.toLowerCase()
    return `${lower[0].toUpperCase()}${lower.substring(1)}`
  }
}
