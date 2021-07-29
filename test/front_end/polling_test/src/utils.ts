import { Item, Status } from './List'

let count = 0

export function api(ids: number[]): Item[] {
  count++
  return ids
    .map((id) => {
      switch (id) {
        case 1:
          if (count > 5)
            return {
              id: 1,
              status: Status.C,
              info: '{ id=1, status=complete }',
            }
          if (count > 3)
            return {
              id: 1,
              status: Status.B,
              info: '{ id=1, status=pending }',
            }
          return {
            id: 1,
            status: Status.B,
            info: '{ id=1, status=pending }',
          }
        case 2:
          if (count > 6)
            return {
              id: 2,
              status: Status.C,
              info: '{ id=2, status=complete }',
            }
          if (count > 2)
            return {
              id: 2,
              status: Status.B,
              info: '{ id=2, status=pending }',
            }
          return {
            id: 2,
            status: Status.B,
            info: '{ id=2, status=pending }',
          }
        case 3:
          if (count > 8)
            return {
              id: 2,
              status: Status.C,
              info: '{ id=2, status=complete }',
            }
          if (count > 6)
            return {
              id: 2,
              status: Status.B,
              info: '{ id=2, status=pending }',
            }
          return {
            id: 2,
            status: Status.B,
            info: '{ id=2, status=pending }',
          }
        default:
          return { id: 4, status: Status.A, info: '' }
      }
    })
    .filter((item) => item.id <= 3)
}
