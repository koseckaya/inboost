import { memo } from "react"
import { Handle, useReactFlow, useStoreApi, Position, NodeTypes } from "reactflow"
import {
  getChildNode,
  getNewGeneratedNode,
  getUpdatedNode,
  hasChildNode,
} from "../../helpers/nodeHelper"
import { EdgesType, NodeObject, Option } from "./type"

function Node({ id: nodeId, data }) {
  console.log('nodeId', nodeId, data);
  const { setNodes, setEdges } = useReactFlow()
  const store = useStoreApi()

  const updateChildNode = (
    parentNode: NodeObject,
    allNodes: NodeObject[],
    allEdges: EdgesType[],
  ) => {
    if (hasChildNode(parentNode, allEdges)) {
      const childNode = getChildNode(parentNode, allNodes, allEdges)

      const updatedChildNode = getUpdatedNode(childNode, parentNode)

      const updatedNodes = allNodes.map((node) => {
        if (node.id === updatedChildNode.id) {
          return updatedChildNode
        }
        return node
      })

      return updateChildNode(updatedChildNode, updatedNodes, allEdges)
    }

    return allNodes
  }

  const onChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { nodeInternals, edges } = store.getState()

    let targetNode = null

    const allNodes = Array.from(nodeInternals.values())
    const updatedNodes = allNodes.map((node) => {
      if (node.id === nodeId) {
        node.data = {
          ...node.data,
          selected: evt.target.value,
        }

        console.log("node", node)
        targetNode = node
      }

      return node
    })

    if (hasChildNode(targetNode, edges)) {
      const listForUpdate = updateChildNode(targetNode, updatedNodes, edges)

      setNodes(listForUpdate)
    } else {
      const newNode = getNewGeneratedNode(targetNode)
      updatedNodes.push(newNode)

      setNodes(updatedNodes)
      setEdges((eds) =>
        eds.concat({
          id: `${targetNode.id}-${newNode.id}`,
          source: targetNode.id,
          target: newNode.id,
          type: "step",
        }),
      )
    }
  }

  return (
    <div className="custom-node__container">
      <div className="custom-node__label"></div>
      <div className="custom-node__select">
        <Handle type="target" position={Position.Left} />
        <select className="nodrag" onChange={onChange} value={data.selected}>
          {data.items.map((option: Option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Handle type="source" position={Position.Right} id={data.handleId} />
      </div>
    </div>
  )
}

export default memo(Node)
