import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Activity,
  Shield,
  Zap,
  Brain,
  MessageSquare
} from "lucide-react";

interface DashboardProps {
  role: string;
}

const agentActivities = [
  {
    id: 1,
    agent: "ComplianceAgent",
    action: "Flagged INV-342 for missing insurance certificate",
    time: "2 minutes ago",
    type: "compliance",
    icon: Shield
  },
  {
    id: 2,
    agent: "ApprovalAgent",
    action: "Escalated INV-551 to Director approval",
    time: "5 minutes ago",
    type: "approval",
    icon: CheckCircle
  },
  {
    id: 3,
    agent: "PaymentAgent",
    action: "Triggered blockchain payment for INV-901",
    time: "12 minutes ago",
    type: "payment",
    icon: DollarSign
  }
];

const pipelineStages = [
  { name: "Intake", count: 23, color: "text-status-pending" },
  { name: "Compliance", count: 12, color: "text-agent-compliance" },
  { name: "Approval", count: 8, color: "text-agent-approval" },
  { name: "Payment", count: 5, color: "text-agent-payment" },
  { name: "Audit", count: 2, color: "text-accent" }
];

const actionItems = [
  {
    id: 1,
    vendor: "Summit Electrical",
    amount: "$12,450.00",
    project: "Building A - Phase 2",
    flag: "Missing lien waiver",
    urgency: "high",
    timeReceived: "2 hours ago"
  },
  {
    id: 2,
    vendor: "Apex Concrete",
    amount: "$8,750.00",
    project: "Foundation Works",
    flag: "Insurance expired",
    urgency: "medium",
    timeReceived: "4 hours ago"
  },
  {
    id: 3,
    vendor: "ProTech Solutions",
    amount: "$3,200.00",
    project: "IT Infrastructure",
    flag: "Approval threshold exceeded",
    urgency: "low",
    timeReceived: "1 day ago"
  }
];

export default function Dashboard({ role }: DashboardProps) {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invoices Processed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Approved</CardTitle>
            <Zap className="h-4 w-4 text-agent-payment" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">89.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-agent-payment">+5.1%</span> efficiency gain
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments Executed</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$1.2M</div>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Action Required</CardTitle>
            <AlertTriangle className="h-4 w-4 text-status-flagged" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-flagged">12</div>
            <p className="text-xs text-muted-foreground">
              Requires human decision
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Visualization */}
      <Card className="bg-gradient-card border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            Invoice Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            {pipelineStages.map((stage, index) => (
              <div 
                key={stage.name}
                className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  selectedStage === stage.name ? 'scale-110' : ''
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.name ? null : stage.name)}
              >
                <div className={`w-16 h-16 rounded-full border-2 border-current ${stage.color} 
                  flex items-center justify-center mb-2 transition-all duration-300
                  ${selectedStage === stage.name ? 'shadow-glow' : ''}
                `}>
                  <span className="text-lg font-bold">{stage.count}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{stage.name}</span>
                {index < pipelineStages.length - 1 && (
                  <div className="absolute w-20 h-0.5 bg-border mt-8 ml-20" />
                )}
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute top-8 left-8 right-8 h-0.5 bg-border" />
            <div className="absolute top-8 left-8 h-0.5 bg-accent animate-status-flow" style={{width: '60%'}} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Required */}
        <Card className="lg:col-span-2 bg-gradient-card border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-status-flagged" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-accent/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.vendor}</span>
                    <Badge 
                      variant={item.urgency === 'high' ? 'destructive' : item.urgency === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {item.urgency}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.project}</p>
                  <p className="text-xs text-status-flagged">{item.flag}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-foreground">{item.amount}</p>
                  <p className="text-xs text-muted-foreground">{item.timeReceived}</p>
                  <Button size="sm" variant="ai">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Agent Activity */}
        <Card className="bg-gradient-card border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent animate-agent-pulse" />
              Agent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agentActivities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-card/50 border border-border">
                  <div className={`w-8 h-8 rounded-full bg-gradient-agent flex items-center justify-center
                    ${activity.type === 'compliance' ? 'text-agent-compliance' : 
                      activity.type === 'approval' ? 'text-agent-approval' : 
                      'text-agent-payment'}`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{activity.agent}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-accent">{activity.time}</p>
                  </div>
                </div>
              );
            })}
            
            <Button variant="neural" size="sm" className="w-full">
              <MessageSquare className="w-4 h-4" />
              Ask Excess AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}