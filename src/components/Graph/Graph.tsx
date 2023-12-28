import ReactFlow, {
  Background,
  Connection,
  EdgeChange,
  NodeChange,
} from "reactflow"
import { Node } from "../Node"
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  selectEdges,
  selectNodes,
} from "../../store/slices/nodesSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

import "reactflow/dist/style.css"
import "./Graph.css"

const nodeTypes = {
  custom: Node,
}

const Graph = () => {
  const nodes = useAppSelector(selectNodes)
  const edges = useAppSelector(selectEdges)
  const dispatch = useAppDispatch()
  const onNodesChangeDispatch = (changes: NodeChange[]) =>
    dispatch(onNodesChange(changes))

  const onEdgesChangeDispatch = (changes: EdgeChange[]) =>
    dispatch(onEdgesChange(changes))

  const onConnectDispatch = (changes: Connection) =>
    dispatch(onConnect(changes))

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChangeDispatch}
      onEdgesChange={onEdgesChangeDispatch}
      onConnect={onConnectDispatch}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <Background color="#333" gap={24} />
    </ReactFlow>
  )
}

export default Graph
