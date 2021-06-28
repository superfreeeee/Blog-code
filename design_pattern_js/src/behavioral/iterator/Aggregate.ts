import Iterator from './Iterator'

export default interface Aggregate<Data> {
  add(data: Data): void
  iterator(): Iterator<Data>
}
