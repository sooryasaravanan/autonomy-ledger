import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Network, 
  Play,
  Pause,
  RotateCcw,
  Eye,
  Code,
  Activity,
  GitBranch,
  Clock,
  Database,
  Zap,
  Shield,
  CheckCircle,
  DollarSign,
  Brain,
  ArrowRight,
  ArrowDown,
  Circle,
  Download,
  Search,
  FileText,
  AlertTriangle
} from "lucide-react";

interface MCPNode {
  id: string;
  type: "invoice" | "agent" | "decision" | "state";
  label: string;
  status: "active" | "completed" | "pending" | "error";
  position: { x: number; y: number };
  connections: string[];
  metadata: Record<string, any>;
  timestamp: string;
}

interface MCPFlow {
  id: string;
  name: string;
  nodes: MCPNode[];
  currentState: string;
  lastUpdate: string;
}

const mockMCPFlows: MCPFlow[] = [
  {
    id: "flow-1",
    name: "INV-1234 Processing Flow",
    currentState: "compliance_review",
    lastUpdate: "2024-01-31 14:32:15",
    nodes: [
      {
        id: "invoice-1234",
        type: "invoice",
        label: "INV-1234\nSummit Electrical\n$12,450",
        status: "active",
        position: { x: 50, y: 100 },
        connections: ["compliance-agent"],
        metadata: { vendor: "Summit Electrical", amount: 12450, project: "Building A" },
        timestamp: "2024-01-31 14:30:00"
      },
      {
        id: "compliance-agent",
        type: "agent",
        label: "ComplianceAgent\nDocument Validation",
        status: "active",
        position: { x: 200, y: 100 },
        connections: ["decision-1", "approval-agent"],
        metadata: { accuracy: 97.8, processingTime: 42 },
        timestamp: "2024-01-31 14:30:15"
      },
      {
        id: "decision-1",
        type: "decision",
        label: "Missing Lien Waiver\nFlag for Review",
        status: "completed",
        position: { x: 350, y: 50 },
        connections: ["state-flagged"],
        metadata: { flagType: "missing_document", severity: "high" },
        timestamp: "2024-01-31 14:32:10"
      },
      {
        id: "approval-agent",
        type: "agent", 
        label: "ApprovalAgent\nEscalation Handler",
        status: "pending",
        position: { x: 350, y: 150 },
        connections: ["state-escalated"],
        metadata: { threshold: 5000, escalationLevel: "director" },
        timestamp: "2024-01-31 14:32:15"
      },
      {
        id: "state-flagged",
        type: "state",
        label: "FLAGGED\nAwaiting Human Review",
        status: "active",
        position: { x: 500, y: 50 },
        connections: [],
        metadata: { requiresAction: true, assignedTo: "sarah.johnson@company.com" },
        timestamp: "2024-01-31 14:32:15"
      },
      {
        id: "state-escalated",
        type: "state",
        label: "ESCALATED\nDirector Approval Required",
        status: "pending",
        position: { x: 500, y: 150 },
        connections: [],
        metadata: { approvalLevel: "director", timeout: "24h" },
        timestamp: "2024-01-31 14:32:15"
      }
    ]
  }
];

const mcpGlobalState = {
  totalInvoices: 1247,
  activeFlows: 23,
  completedToday: 156,
  errorStates: 3,
  averageProcessingTime: "2.4 hours",
  agentUtilization: {
    compliance: 87,
    approval: 64,
    payment: 45,
    supervisor: 92
  },
  systemHealth: 98.7
};

export default function MCPInspector() {
  const [selectedFlow, setSelectedFlow] = useState<string>(mockMCPFlows[0].id);
  const [selectedNode, setSelectedNode] = useState<MCPNode | null>(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [viewMode, setViewMode] = useState<"visual" | "json" | "timeline">("visual");

  const currentFlow = mockMCPFlows.find(flow => flow.id === selectedFlow);

  const getNodeColor = (node: MCPNode) => {
    switch (node.type) {
      case "invoice": return "bg-blue-100 border-blue-300 text-blue-800";
      case "agent": return "bg-green-100 border-green-300 text-green-800";
      case "decision": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "state": return "bg-purple-100 border-purple-300 text-purple-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-status-processing";
      case "completed": return "text-status-approved";
      case "pending": return "text-status-pending";
      case "error": return "text-status-flagged";
      default: return "text-muted-foreground";
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "invoice": return FileText;
      case "agent": return Brain;
      case "decision": return GitBranch;
      case "state": return Database;
      default: return Circle;
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRealTime) {
      interval = setInterval(() => {
        // Simulate real-time updates
        console.log("MCP state update");
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRealTime]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">MCP Inspector</h2>
          <p className="text-muted-foreground">Real-time multi-agent state visualization and debugging</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isRealTime ? "ai" : "outline"} 
            size="sm"
            onClick={() => setIsRealTime(!isRealTime)}
          >
            {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRealTime ? "Pause" : "Resume"} Real-time
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
            Refresh
          </Button>
          <Button variant="neural" size="sm">
            <Download className="w-4 h-4" />
            Export State
          </Button>
        </div>
      </div>

      {/* Global MCP Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Flows</p>
                <p className="text-2xl font-bold text-foreground">{mcpGlobalState.activeFlows}</p>
              </div>
              <Activity className="w-6 h-6 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-foreground">{mcpGlobalState.completedToday}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-status-approved" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Processing</p>
                <p className="text-2xl font-bold text-foreground">{mcpGlobalState.averageProcessingTime}</p>
              </div>
              <Clock className="w-6 h-6 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error States</p>
                <p className="text-2xl font-bold text-status-flagged">{mcpGlobalState.errorStates}</p>
              </div>
              <AlertTriangle className="w-6 h-6 text-status-flagged" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold text-status-approved">{mcpGlobalState.systemHealth}%</p>
              </div>
              <Shield className="w-6 h-6 text-status-approved" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Flow Selector */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-accent" />
              Active Flows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockMCPFlows.map((flow) => (
              <div
                key={flow.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all duration-200
                  ${selectedFlow === flow.id 
                    ? 'border-accent bg-accent/5' 
                    : 'border-border hover:border-accent/50'
                  }`}
                onClick={() => setSelectedFlow(flow.id)}
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{flow.name}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {flow.currentState.replace('_', ' ')}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{flow.lastUpdate}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Visualization */}
        <Card className="lg:col-span-3 border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-accent" />
                {currentFlow?.name || "MCP Flow Visualization"}
              </CardTitle>
              <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="visual" className="text-xs">Visual</TabsTrigger>
                  <TabsTrigger value="json" className="text-xs">JSON</TabsTrigger>
                  <TabsTrigger value="timeline" className="text-xs">Timeline</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={viewMode}>
              {/* Visual Flow View */}
              <TabsContent value="visual" className="space-y-4">
                <div className="relative h-96 bg-muted/20 rounded-lg overflow-auto border border-border">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Draw connections */}
                    {currentFlow?.nodes.map((node) =>
                      node.connections.map((connectionId) => {
                        const targetNode = currentFlow.nodes.find(n => n.id === connectionId);
                        if (!targetNode) return null;
                        
                        return (
                          <line
                            key={`${node.id}-${connectionId}`}
                            x1={node.position.x + 50}
                            y1={node.position.y + 25}
                            x2={targetNode.position.x + 50}
                            y2={targetNode.position.y + 25}
                            stroke="hsl(var(--border))"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                          />
                        );
                      })
                    )}
                    
                    {/* Arrow marker definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="hsl(var(--border))"
                        />
                      </marker>
                    </defs>
                  </svg>
                  
                  {/* Render nodes */}
                  {currentFlow?.nodes.map((node) => {
                    const IconComponent = getNodeIcon(node.type);
                    return (
                      <div
                        key={node.id}
                        className={`absolute w-24 h-16 rounded-lg border-2 p-2 cursor-pointer transition-all duration-200 hover:shadow-lg
                          ${getNodeColor(node)}
                          ${selectedNode?.id === node.id ? 'ring-2 ring-accent' : ''}
                        `}
                        style={{
                          left: node.position.x,
                          top: node.position.y,
                        }}
                        onClick={() => setSelectedNode(node)}
                      >
                        <div className="flex flex-col items-center text-center h-full">
                          <IconComponent className="w-4 h-4 mb-1" />
                          <p className="text-xs font-medium leading-tight">
                            {node.label.split('\n')[0]}
                          </p>
                          <div className={`w-2 h-2 rounded-full mt-1 ${
                            node.status === 'active' ? 'bg-green-500' :
                            node.status === 'completed' ? 'bg-blue-500' :
                            node.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* JSON View */}
              <TabsContent value="json" className="space-y-4">
                <div className="h-96 bg-muted/20 rounded-lg p-4 overflow-auto border border-border">
                  <pre className="text-xs text-foreground font-mono">
                    {JSON.stringify(currentFlow, null, 2)}
                  </pre>
                </div>
              </TabsContent>

              {/* Timeline View */}
              <TabsContent value="timeline" className="space-y-4">
                <div className="h-96 overflow-auto border border-border rounded-lg">
                  <div className="p-4 space-y-4">
                    {currentFlow?.nodes.sort((a, b) => 
                      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                    ).map((node) => {
                      const IconComponent = getNodeIcon(node.type);
                      return (
                        <div key={node.id} className="flex items-start gap-4 p-3 rounded-lg border border-border bg-card/50">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNodeColor(node)}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">{node.label.split('\n')[0]}</p>
                              <p className="text-xs text-muted-foreground">{node.timestamp}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {node.type.charAt(0).toUpperCase() + node.type.slice(1)} • {node.status}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <Card className="border-accent shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent" />
              Node Details: {selectedNode.id}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="outline">{selectedNode.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={selectedNode.status === 'active' ? 'default' : 'secondary'}>
                      {selectedNode.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="text-foreground font-mono">{selectedNode.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Connections:</span>
                    <span className="text-foreground">{selectedNode.connections.length}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Metadata</h4>
                <div className="bg-muted/20 rounded p-3 text-xs font-mono">
                  <pre>{JSON.stringify(selectedNode.metadata, null, 2)}</pre>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-2">
              <Button variant="ai" size="sm">
                <Code className="w-4 h-4" />
                View Raw Data
              </Button>
              <Button variant="neural" size="sm">
                <GitBranch className="w-4 h-4" />
                Trace Connections
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
                Export Node
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}