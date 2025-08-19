import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  ArrowRight, 
  AlertTriangle,
  FileText,
  User,
  Building,
  DollarSign,
  MessageSquare,
  Eye,
  Settings
} from "lucide-react";

export default function GCApprovals() {
  const [selectedProject, setSelectedProject] = useState("all");

  const approvalRules = {
    thresholds: [
      { role: "PM", limit: 25000, description: "Project Manager approval up to $25K" },
      { role: "Controller", limit: 100000, description: "Controller approval up to $100K" },
      { role: "CFO", limit: null, description: "CFO approval for amounts above $100K" }
    ],
    autoRules: [
      { condition: "AI Score > 95% AND Amount < $10K", action: "Auto-approve", enabled: true },
      { condition: "Same sub + similar amount within 30 days", action: "Flag for review", enabled: true },
      { condition: "Missing compliance docs", action: "Auto-reject", enabled: true }
    ]
  };

  const approvalQueues = [
    {
      role: "PM",
      user: "John Martinez",
      pending: 8,
      items: [
        {
          id: "SUB-INV-449",
          subcontractor: "Plumbing Pro LLC",
          project: "Plaza Tower",
          amount: 18500,
          priority: "normal",
          submitted: "2 hours ago",
          aiScore: 94
        },
        {
          id: "SUB-INV-450", 
          subcontractor: "ABC Electric Co.",
          project: "Downtown Retail",
          amount: 22300,
          priority: "normal",
          submitted: "4 hours ago",
          aiScore: 89
        }
      ]
    },
    {
      role: "Controller",
      user: "Sarah Chen",
      pending: 3,
      items: [
        {
          id: "SUB-INV-451",
          subcontractor: "Steel Works LLC",
          project: "Office Renovation",
          amount: 85600,
          priority: "high",
          submitted: "1 day ago",
          aiScore: 76
        }
      ]
    },
    {
      role: "CFO",
      user: "Michael Roberts",
      pending: 2,
      items: [
        {
          id: "SUB-INV-452",
          subcontractor: "Concrete Masters",
          project: "Plaza Tower",
          amount: 145000,
          priority: "urgent",
          submitted: "3 days ago",
          aiScore: 98
        }
      ]
    }
  ];

  const recentApprovals = [
    {
      id: "SUB-INV-444",
      subcontractor: "HVAC Solutions Inc.",
      project: "Downtown Retail",
      amount: 68900,
      approver: "John Martinez (PM)",
      action: "approved",
      timestamp: "2 hours ago",
      notes: "All documentation verified"
    },
    {
      id: "SUB-INV-443",
      subcontractor: "Roofing Experts",
      project: "Office Renovation",
      amount: 32400,
      approver: "Sarah Chen (Controller)",
      action: "approved",
      timestamp: "4 hours ago", 
      notes: "Approved with expedited payment"
    },
    {
      id: "SUB-INV-442",
      subcontractor: "Electrical Systems",
      project: "Plaza Tower",
      amount: 95800,
      approver: "John Martinez (PM)",
      action: "flagged",
      timestamp: "6 hours ago",
      notes: "Quantity discrepancy requires clarification"
    }
  ];

  const delegations = [
    {
      from: "Michael Roberts (CFO)",
      to: "Sarah Chen (Controller)",
      condition: "Amounts under $75K",
      active: true,
      expires: "Sep 15, 2024"
    },
    {
      from: "Sarah Chen (Controller)",
      to: "John Martinez (PM)",
      condition: "Repeat subs with AI score > 90%",
      active: true,
      expires: "Sep 30, 2024"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "normal":
        return <Badge variant="outline">Normal</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "flagged":
        return <Badge className="bg-amber-500">Flagged</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "PM":
        return <Building className="w-5 h-5 text-blue-500" />;
      case "Controller":
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case "CFO":
        return <Users className="w-5 h-5 text-purple-500" />;
      default:
        return <User className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Approval Workflow</h1>
          <p className="text-muted-foreground">Manage invoice approvals and workflow routing</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="plaza-tower">Plaza Tower</SelectItem>
              <SelectItem value="downtown-retail">Downtown Retail</SelectItem>
              <SelectItem value="office-renovation">Office Renovation</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configure Rules
          </Button>
        </div>
      </div>

      {/* Approval Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Approval</p>
                <p className="text-2xl font-bold text-foreground">
                  {approvalQueues.reduce((sum, queue) => sum + queue.pending, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Process Time</p>
                <p className="text-2xl font-bold text-foreground">18h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {approvalQueues.map((queue) => (
          <Card key={queue.role}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getRoleIcon(queue.role)}
                {queue.role} Queue
                <Badge variant="outline">{queue.pending}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{queue.user}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queue.items.map((item) => (
                  <div key={item.id} className="p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{item.id}</h4>
                        <p className="text-xs text-muted-foreground">{item.subcontractor}</p>
                      </div>
                      {getPriorityBadge(item.priority)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${item.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">AI Score</p>
                        <p className="font-medium text-foreground">{item.aiScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Project</p>
                        <p className="font-medium text-foreground">{item.project}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium text-foreground">{item.submitted}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {queue.pending > queue.items.length && (
                  <Button variant="ghost" size="sm" className="w-full">
                    View {queue.pending - queue.items.length} more
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Approval Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Rules & Thresholds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Approval Thresholds</h4>
              <div className="space-y-3">
                {approvalRules.thresholds.map((rule, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{rule.role}</span>
                      <span className="text-sm text-muted-foreground">
                        {rule.limit ? `Up to $${rule.limit.toLocaleString()}` : "No limit"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-3">Automation Rules</h4>
              <div className="space-y-3">
                {approvalRules.autoRules.map((rule, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{rule.action}</span>
                      <Badge variant={rule.enabled ? "default" : "outline"}>
                        {rule.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{rule.condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Delegations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Delegations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {delegations.map((delegation, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {delegation.from} → {delegation.to}
                    </p>
                    <p className="text-xs text-muted-foreground">{delegation.condition}</p>
                  </div>
                  <Badge variant={delegation.active ? "default" : "outline"}>
                    {delegation.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">Expires: {delegation.expires}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Approval Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Recent Approval Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApprovals.map((approval) => (
              <div key={approval.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{approval.id}</h4>
                    <p className="text-sm text-muted-foreground">{approval.subcontractor} • {approval.project}</p>
                  </div>
                  <div className="text-right">
                    {getActionBadge(approval.action)}
                    <p className="text-xs text-muted-foreground mt-1">{approval.timestamp}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-2">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium text-foreground">${approval.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Approver</p>
                    <p className="font-medium text-foreground">{approval.approver}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Notes</p>
                    <p className="font-medium text-foreground">{approval.notes}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Audit Trail
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}