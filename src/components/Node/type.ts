export type OptionItem = {
  value: string
  label: string
}
export type NodeData = {
  prefix: string
  selected: string
  items: OptionItem[]
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
  data: NodeData
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
  id: string
  data: NodeData
}
