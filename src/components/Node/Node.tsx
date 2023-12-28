import { ReactNode } from "react"
import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  Node as ReactFlowNode,
} from "reactflow"
import Select, { SingleValue } from "react-select"
import {
  getNewGeneratedNode,
  hasChildNode,
  updateChildNode,
} from "../../helpers/nodeHelper"
import { NodeProps, OptionItem } from "./type"

const Node = ({ id: nodeId, data }: NodeProps): ReactNode => {
  const { setNodes, setEdges } = useReactFlow()
  const store = useStoreApi()
  const selectedValue = data.items.find((item) => item.value === data.selected)

  const onChange = (option: SingleValue<OptionItem>) => {
    const { nodeInternals, edges } = store.getState()

    if (!option) {
      return
    }

    let targetNode: ReactFlowNode | null = null
    const allNodes = Array.from(nodeInternals.values())
    const updatedNodes: ReactFlowNode[] = allNodes.map(
      (node: ReactFlowNode) => {
        if (String(node.id) === String(nodeId)) {
          node.data = {
            ...node.data,
            selected: option.value,
          }

          targetNode = node
        }

        return node
      },
    )

    if (targetNode) {
      if (hasChildNode(targetNode, edges)) {
        const listForUpdate = updateChildNode(targetNode, updatedNodes, edges)
        setNodes(listForUpdate)
      } else {
        const { id } = targetNode
        const newNode = getNewGeneratedNode(targetNode)
        updatedNodes.push(newNode)

        setNodes(updatedNodes)
        setEdges((eds) =>
          eds.concat({
            id: `${id}-${newNode.id}`,
            source: id,
            target: newNode.id,
            type: "step",
          }),
        )
      }
    }
  }

  return (
    <div className="custom-node__container">
      <div className="custom-node__label"></div>
      <div className="custom-node__select">
        <Handle type="target" position={Position.Left} />
        <Select
          className="nodrag"
          options={data.items}
          value={selectedValue}
          onChange={onChange}
        />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  )
}

export default Node
