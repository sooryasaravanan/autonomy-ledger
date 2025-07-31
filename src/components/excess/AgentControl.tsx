import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Shield, 
  CheckCircle, 
  DollarSign, 
  Settings, 
  Activity,
  Network,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Eye,
  AlertCircle
} from "lucide-react";

const agents = [
  {
    id: "compliance",
    name: "ComplianceAgent",
    description: "Validates documents, insurance, and regulatory requirements",
    status: "active",
    icon: Shield,
    color: "text-agent-compliance",
    processed: 1247,
    flagged: 23,
    accuracy: 97.8
  },
  {
    id: "approval",
    name: "ApprovalAgent", 
    description: "Routes invoices through approval workflows and escalations",
    status: "active",
    icon: CheckCircle,
    color: "text-agent-approval",
    processed: 891,
    flagged: 12,
    accuracy: 94.2
  },
  {
    id: "payment",
    name: "PaymentAgent",
    description: "Executes payments via ACH and blockchain transactions",
    status: "active", 
    icon: DollarSign,
    color: "text-agent-payment",
    processed: 654,
    flagged: 3,
    accuracy: 99.1
  },
  {
    id: "supervisor",
    name: "SupervisorAgent",
    description: "Monitors other agents and manages MCP state coordination",
    status: "monitoring",
    icon: Brain,
    color: "text-agent-supervisor", 
    processed: 2792,
    flagged: 0,
    accuracy: 98.9
  }
];

const mcpNodes = [
  {
    id: "inv-1234",
    vendor: "Summit Electrical",
    amount: "$12,450",
    status: "compliance_review",
    connections: ["compliance", "approval"],
    lastUpdate: "2 min ago"
  },
  {
    id: "inv-1235", 
    vendor: "Apex Concrete",
    amount: "$8,750",
    status: "payment_ready",
    connections: ["payment"],
    lastUpdate: "5 min ago"
  },
  {
    id: "inv-1236",
    vendor: "ProTech Solutions", 
    amount: "$3,200",
    status: "escalation_pending",
    connections: ["approval", "supervisor"],
    lastUpdate: "12 min ago"
  }
];

const recentActivities = [
  {
    id: 1,
    agent: "ComplianceAgent",
    action: "Document validation completed",
    target: "INV-1234",
    status: "success",
    time: "30s ago"
  },
  {
    id: 2,
    agent: "ApprovalAgent", 
    action: "Escalated to director approval",
    target: "INV-1236",
    status: "pending",
    time: "2m ago"
  },
  {
    id: 3,
    agent: "PaymentAgent",
    action: "Blockchain payment initiated", 
    target: "INV-1235",
    status: "processing",
    time: "5m ago"
  },
  {
    id: 4,
    agent: "SupervisorAgent",
    action: "MCP state synchronized",
    target: "Global",
    status: "success", 
    time: "8m ago"
  }
];

export default function AgentControl() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          const isSelected = selectedAgent === agent.id;
          
          return (
            <Card 
              key={agent.id}
              className={`cursor-pointer transition-all duration-300 bg-gradient-card
                ${isSelected ? 'border-accent shadow-glow' : 'border-border hover:border-accent/50'}
              `}
              onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-agent flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${agent.color}`} />
                  </div>
                  <Badge 
                    variant={agent.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {agent.status === 'active' ? 'Active' : 'Monitoring'}
                  </Badge>
                </div>
                <CardTitle className="text-base">{agent.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground">{agent.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-muted-foreground">Processed</p>
                    <p className="font-semibold text-foreground">{agent.processed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Accuracy</p>
                    <p className="font-semibold text-accent">{agent.accuracy}%</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="ai" className="flex-1">
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="neural" className="flex-1">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MCP State Visualization */}
        <Card className="bg-gradient-card border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5 text-accent" />
              MCP State Inspector
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mcpNodes.map((node) => (
              <div key={node.id} className="p-4 rounded-lg border border-border bg-card/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{node.id}</p>
                    <p className="text-sm text-muted-foreground">{node.vendor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{node.amount}</p>
                    <p className="text-xs text-muted-foreground">{node.lastUpdate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {node.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Connected to:</span>
                  {node.connections.map((conn) => {
                    const agent = agents.find(a => a.id === conn);
                    const IconComponent = agent?.icon || Brain;
                    return (
                      <div key={conn} className={`w-6 h-6 rounded-full bg-gradient-agent flex items-center justify-center`}>
                        <IconComponent className={`w-3 h-3 ${agent?.color || 'text-accent'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <Button variant="neural" size="sm" className="w-full">
              <RotateCcw className="w-4 h-4" />
              Refresh MCP State
            </Button>
          </CardContent>
        </Card>

        {/* Agent Activity Log */}
        <Card className="bg-gradient-card border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent animate-agent-pulse" />
              Real-time Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/30">
                <div className="w-8 h-8 rounded-full bg-gradient-agent flex items-center justify-center">
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-accent" />
                  ) : activity.status === 'pending' ? (
                    <AlertCircle className="w-4 h-4 text-status-pending" />
                  ) : (
                    <Zap className="w-4 h-4 text-status-processing" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{activity.agent}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                  <Badge variant="outline" className="text-xs">
                    {activity.target}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="flex gap-2">
              <Button variant="ai" size="sm" className="flex-1">
                <Play className="w-4 h-4" />
                Resume All
              </Button>
              <Button variant="neural" size="sm" className="flex-1">
                <Pause className="w-4 h-4" />
                Pause All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Settings Panel */}
      {selectedAgent && (
        <Card className="bg-gradient-card border-accent shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent" />
              {agents.find(a => a.id === selectedAgent)?.name} Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Auto-processing</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Escalation alerts</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Real-time monitoring</label>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Approval threshold</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">$</span>
                    <input 
                      type="number" 
                      defaultValue="5000"
                      className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Escalation timeout</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      defaultValue="24"
                      className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
                    />
                    <span className="text-sm text-muted-foreground">hours</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="ai" className="flex-1">
                Save Configuration
              </Button>
              <Button variant="neural" className="flex-1">
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}