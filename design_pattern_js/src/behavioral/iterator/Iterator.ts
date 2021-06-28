export default interface Iterator<Data> {
  first(): Data | null
  current(): Data | null
  next(): Data | null
  isDone(): boolean
}
