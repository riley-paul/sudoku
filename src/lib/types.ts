export type Cell = {
  id: string // "r0c0"
  row: number
  col: number
  box: number

  value: number | null
  given: boolean // pre-filled puzzle cell

  notes: Set<number> // pencil marks

  isSelected?: boolean
  isError?: boolean
}
