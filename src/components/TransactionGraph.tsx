import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  Node,
  Edge
} from '@xyflow/react';
import { 
  Play, 
  RotateCcw, 
  Maximize2, 
  Eye, 
  Layers, 
  Filter, 
  ShieldAlert, 
  Split, 
  Building2, 
  Sparkles 
} from 'lucide-react';
import { INITIAL_GRAPH_NODES, INITIAL_GRAPH_EDGES, GraphNodeData } from '../lib/graphEngine';
import { formatAddress, formatUSD } from '../lib/utils';
import { RiskBadge } from './RiskBadge';
import { useInvestigation } from '../context/InvestigationContext';
import { NodeDetailsDrawer } from './NodeDetailsDrawer';

// Custom Node Renderer with LEA cyber styling
const CustomGraphNode: React.FC<NodeProps<Node<GraphNodeData>>> = ({ data, selected }) => {
  const getRoleColors = () => {
    switch (data.role) {
      case 'victim':
        return 'border-slate-600 bg-slate-900/90 text-slate-300 shadow-slate-900/40';
      case 'suspect':
        return 'border-orange-500/70 bg-orange-950/40 text-orange-300 shadow-orange-500/20 ring-1 ring-orange-500/30';
      case 'intermediary':
        return 'border-amber-500/70 bg-amber-950/40 text-amber-300 shadow-amber-500/20';
      case 'consolidator':
        return 'border-red-500/80 bg-red-950/50 text-red-300 shadow-red-500/30 ring-2 ring-red-500/40';
      case 'bridge':
        return 'border-purple-500/70 bg-purple-950/40 text-purple-300 shadow-purple-500/20 ring-1 ring-purple-500/30';
      case 'destination':
        return 'border-cyan-500/70 bg-cyan-950/40 text-cyan-300 shadow-cyan-500/20';
      case 'vasp':
        return 'border-emerald-500/70 bg-emerald-950/40 text-emerald-300 shadow-emerald-500/20 ring-1 ring-emerald-500/30';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  return (
    <div
      className={`min-w-[210px] rounded-xl border p-3 shadow-xl backdrop-blur-md transition-all font-mono select-none ${getRoleColors()} ${
        selected ? 'ring-2 ring-cyan-400 scale-105' : ''
      }`}
    >
      <Handle type="target" position={Position.Left} className="w-2.5 h-2.5 !bg-cyan-400" />

      <div className="flex items-center justify-between gap-1 mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider truncate">
          {data.label}
        </span>
        <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 border border-current/20">
          {data.chain}
        </span>
      </div>

      <div className="text-xs font-bold text-slate-100 bg-black/30 px-2 py-1 rounded border border-white/5 truncate">
        {formatAddress(data.address)}
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] pt-1.5 border-t border-white/10">
        <span className="text-slate-400">
          Vol: <strong className="text-slate-200">{formatUSD(data.inboundUSD)}</strong>
        </span>
        <RiskBadge level={data.riskLevel} score={data.riskScore} size="sm" />
      </div>

      <Handle type="source" position={Position.Right} className="w-2.5 h-2.5 !bg-cyan-400" />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomGraphNode
};

export const TransactionGraph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_GRAPH_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_GRAPH_EDGES);
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [showAmounts, setShowAmounts] = useState<boolean>(true);
  const [showTimestamps, setShowTimestamps] = useState<boolean>(true);
  const [showRiskLabels, setShowRiskLabels] = useState<boolean>(true);

  const { 
    selectedNode, 
    setSelectedNode, 
    startReplayFundFlow, 
    isReplayingFlow,
    replayStep
  } = useInvestigation();

  // Filter nodes based on selected role
  const filteredNodes = useMemo(() => {
    if (roleFilter === 'All') return nodes;
    return nodes.map(node => {
      const data = node.data as GraphNodeData;
      const isVisible = 
        roleFilter === 'All' ||
        (roleFilter === 'Suspect' && (data.role === 'suspect' || data.role === 'consolidator')) ||
        (roleFilter === 'Intermediary' && data.role === 'intermediary') ||
        (roleFilter === 'Bridge' && data.role === 'bridge') ||
        (roleFilter === 'VASP' && data.role === 'vasp');
      
      return {
        ...node,
        hidden: !isVisible
      };
    });
  }, [nodes, roleFilter]);

  // Dynamic edge formatting based on toggles and replay state
  const formattedEdges = useMemo(() => {
    return edges.map((edge, index) => {
      let label = '';
      const edgeData = edge.data as any;
      if (edgeData) {
        if (showAmounts && showTimestamps) {
          label = `${edgeData.amount} (${edgeData.time})`;
        } else if (showAmounts) {
          label = edgeData.amount;
        } else if (showTimestamps) {
          label = edgeData.time;
        }
      }

      // Check if this edge is active in replay
      const isActiveReplay = isReplayingFlow && replayStep === index;

      return {
        ...edge,
        label,
        animated: isReplayingFlow ? isActiveReplay : edge.animated,
        style: {
          ...edge.style,
          stroke: isActiveReplay ? '#38bdf8' : edge.style?.stroke,
          strokeWidth: isActiveReplay ? 4 : edge.style?.strokeWidth
        }
      };
    });
  }, [edges, showAmounts, showTimestamps, isReplayingFlow, replayStep]);

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as GraphNodeData);
  }, [setSelectedNode]);

  const handleReset = () => {
    setNodes(INITIAL_GRAPH_NODES);
    setRoleFilter('All');
  };

  return (
    <div className="relative w-full h-[680px] rounded-2xl border border-cyan-500/25 bg-[#060a14] overflow-hidden glass-panel">
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#090e1c]/90 border border-slate-800/80 backdrop-blur-md">
        {/* Role Filters */}
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-cyan-400 mr-1" />
          {['All', 'Suspect', 'Intermediary', 'Bridge', 'VASP'].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors ${
                roleFilter === role
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* View Toggles & Replay Flow Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAmounts(!showAmounts)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
              showAmounts
                ? 'bg-slate-800 text-slate-200 border-slate-700'
                : 'bg-slate-900/60 text-slate-500 border-slate-800'
            }`}
          >
            Amounts
          </button>
          <button
            onClick={() => setShowTimestamps(!showTimestamps)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
              showTimestamps
                ? 'bg-slate-800 text-slate-200 border-slate-700'
                : 'bg-slate-900/60 text-slate-500 border-slate-800'
            }`}
          >
            Timestamps
          </button>

          <button
            onClick={startReplayFundFlow}
            disabled={isReplayingFlow}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg flex items-center gap-1.5 shadow-md transition-all ${
              isReplayingFlow
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 animate-pulse'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/20'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isReplayingFlow ? `Replaying (Hop ${replayStep}/8)...` : 'Replay Fund Flow'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
            title="Reset Graph Positions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Legend Indicator */}
      <div className="absolute bottom-4 left-4 z-10 p-2.5 rounded-xl bg-[#090e1c]/90 border border-slate-800 text-[10px] font-mono flex flex-wrap items-center gap-3 backdrop-blur-md">
        <span className="text-slate-400 uppercase font-semibold">Legend:</span>
        <span className="flex items-center gap-1 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-slate-500" /> Victim
        </span>
        <span className="flex items-center gap-1 text-orange-300">
          <span className="w-2 h-2 rounded-full bg-orange-500" /> Suspect
        </span>
        <span className="flex items-center gap-1 text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Intermediary
        </span>
        <span className="flex items-center gap-1 text-red-300">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Consolidator
        </span>
        <span className="flex items-center gap-1 text-purple-300">
          <span className="w-2 h-2 rounded-full bg-purple-500" /> Bridge
        </span>
        <span className="flex items-center gap-1 text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> VASP Exit
        </span>
      </div>

      {/* React Flow Renderer */}
      <ReactFlow
        nodes={filteredNodes}
        edges={formattedEdges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls position="bottom-right" className="!m-4" />
      </ReactFlow>

      {/* Slide-out node details drawer */}
      <NodeDetailsDrawer
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};
