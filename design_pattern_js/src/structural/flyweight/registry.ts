import { Flyweight } from './flyweights'

export const registry: Map<string, Flyweight> = new Map()

export const getFlyweight = (key: string) => registry.get(key)
