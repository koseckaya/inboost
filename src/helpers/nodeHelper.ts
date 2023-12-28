import { Position } from "reactflow"
import { EdgesType, NodeObject } from "../components/Node/type"

export const generateSelectData = (prefix = "", count = 6) => {
  return Array.from({ length: count }, (x, i) => ({
    value: `${i + 1}`,
    label: `Вариант ${prefix}${i + 1}`,
  }))
}

export const getNewGeneratedNode = (parentNode: NodeObject) => {
  const newPosition = {
    x: parentNode.position.x + 250,
    y: parentNode.position.y + 50,
  }

  const newId = +parentNode.id + 1

  const prefix = parentNode.data.prefix
    ? `${parentNode.data.prefix}${parentNode.data.selected}-`
    : `${parentNode.data.selected}-`

  return {
    id: `${newId}`,
    type: "custom",
    position: newPosition,
    data: {
      prefix,
      selected: "1",
      items: generateSelectData(prefix),
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }
}

export const getUpdatedNode = (node: NodeObject, parentNode: NodeObject) => {
  const prefix = parentNode.data.prefix
    ? `${parentNode.data.prefix}${parentNode.data.selected}-`
    : `${parentNode.data.selected}-`

  return {
    ...node,
    data: {
      ...node.data,
      prefix,
      items: generateSelectData(prefix),
    },
  }
}

export const hasChildNode = (node: NodeObject, edges: EdgesType[]) => {
  return edges.some((edge) => edge.source === node.id)
}

export const getChildNode = (
  node: NodeObject,
  allNodes: NodeObject[],
  edges: EdgesType[],
) => {
  const childEdge = edges.find((edge) => edge.source === node.id)

  if (childEdge) {
    return allNodes.find((nodeItem) => nodeItem.id === childEdge.target)
  }
  return false
}
