export type Option = {
  value: string
  label: string
}
type Data = {
  prefix: string
  selected: string
  items: Option[]
}

type Position = {
  x: number
  y: number
}
type AbsolutePosition = Position

export type NodeObject = {
  width: number
  height: number
  id: string
  type: string
  position: Position
  data: Data
  sourcePosition: string
  targetPosition: string
  positionAbsolute: AbsolutePosition
}
export type EdgesType = {
  id: string
  source: string
  target: string
  type: string
}
export type NodeProps = {
  id: number
  data: Data
}
