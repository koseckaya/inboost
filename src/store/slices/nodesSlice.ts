import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow"
import { RootState } from "../store"
import { generateSelectData } from "../../helpers/nodeHelper"

export interface NodesState {
  nodes: Node[]
  edges: Edge[]
}

const initialState: NodesState = {
  nodes: [
    {
      id: "1",
      type: "custom",
      position: { x: 100, y: 200 },
      data: {
        prefix: "",
        selected: "1",
        items: generateSelectData(""),
      },
    },
  ],
  edges: [],
}

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes)
    },
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges)
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges)
    },
  },
})

export const { onNodesChange, onEdgesChange, onConnect } = nodesSlice.actions

export const selectEdges = (state: RootState) => state.nodes.edges

export const selectNodes = (state: RootState) => state.nodes.nodes

export default nodesSlice.reducer
