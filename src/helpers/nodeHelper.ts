import { Edge, Node, Position } from "reactflow"
import { NodeData } from "../components/Node/type"

export const generateSelectData = (prefix = "", count = 6) => {
  return Array.from({ length: count }, (x, i) => ({
    value: `${i + 1}`,
    label: `Варіант ${prefix}${i + 1}`,
  }))
}

export const getNewGeneratedNode = (parentNode: Node) => {
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

export const getUpdatedNode = (
  node: Node<NodeData>,
  parentNode: Node<NodeData>,
) => {
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

export const hasChildNode = (node: Node, edges: Edge[]) => {
  return edges.some((edge) => edge.source === node.id)
}

export const getChildNode = (
  node: Node,
  allNodes: Node[],
  edges: Edge[],
): Node | null => {
  const childEdge = edges.find((edge) => edge.source === node.id)

  if (childEdge) {
    const childNode = allNodes.find(
      (nodeItem) => nodeItem.id === childEdge.target,
    )
    if (childNode) {
      return childNode
    }
  }

  return null
}

export const updateChildNode = (
  parentNode: Node,
  allNodes: Node[],
  allEdges: Edge[],
): Node[] => {
  if (hasChildNode(parentNode, allEdges)) {
    const childNode = getChildNode(parentNode, allNodes, allEdges)
    if (childNode) {
      const updatedChildNode = getUpdatedNode(childNode, parentNode)
      const updatedNodes: Node[] = allNodes.map((node) => {
        if (node.id === updatedChildNode.id) {
          return updatedChildNode
        }
        return node
      })
      return updateChildNode(updatedChildNode, updatedNodes, allEdges)
    }
  }
  return allNodes
}
