import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building, 
  DollarSign, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Users,
  Shield,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  BarChart3,
  Activity
} from "lucide-react";

export default function GCDashboard() {
  const [selectedProject, setSelectedProject] = useState("all");

  const projects = [
    {
      id: "plaza-tower",
      name: "Plaza Tower",
      client: "Metropolitan Development",
      totalContract: 12500000,
      invoicedThisCycle: 895000,
      approvedPercent: 85,
      flaggedPercent: 12,
      fundsReceived: 8900000,
      fundsDisbursed: 7650000,
      status: "active"
    },
    {
      id: "downtown-retail",
      name: "Downtown Retail Complex", 
      client: "Urban Properties LLC",
      totalContract: 8200000,
      invoicedThisCycle: 620000,
      approvedPercent: 92,
      flaggedPercent: 5,
      fundsReceived: 5100000,
      fundsDisbursed: 4800000,
      status: "active"
    },
    {
      id: "office-renovation",
      name: "Corporate Office Renovation",
      client: "TechCorp Industries",
      totalContract: 3400000,
      invoicedThisCycle: 280000,
      approvedPercent: 78,
      flaggedPercent: 18,
      fundsReceived: 2100000,
      fundsDisbursed: 1950000,
      status: "active"
    }
  ];

  const pipelineStages = [
    { name: "Submitted", count: 12, color: "bg-blue-500", amount: 245000 },
    { name: "Under Review", count: 8, color: "bg-amber-500", amount: 180000 },
    { name: "Flagged", count: 3, color: "bg-red-500", amount: 65000 },
    { name: "Approved", count: 15, color: "bg-green-500", amount: 420000 },
    { name: "Scheduled", count: 6, color: "bg-purple-500", amount: 150000 },
    { name: "Paid", count: 45, color: "bg-emerald-500", amount: 1200000 }
  ];

  const cashFlowEvents = [
    {
      type: "owner_payment",
      project: "Plaza Tower",
      amount: 850000,
      date: "Aug 30",
      status: "pending",
      description: "Pay App #8 - August Progress"
    },
    {
      type: "sub_payment",
      project: "Downtown Retail",
      amount: 180000,
      date: "Sep 2",
      status: "scheduled",
      description: "HVAC Progress Payment"
    },
    {
      type: "owner_payment",
      project: "Office Renovation",
      amount: 280000,
      date: "Sep 5",
      status: "approved",
      description: "Pay App #5 - Phase 2 Complete"
    },
    {
      type: "sub_payment",
      project: "Plaza Tower",
      amount: 125000,
      date: "Sep 8",
      status: "scheduled",
      description: "Electrical Rough-in"
    }
  ];

  const riskAlerts = [
    {
      type: "duplicate",
      severity: "high",
      message: "Potential duplicate: HVAC Sub INV-442 matches INV-438",
      project: "Plaza Tower",
      agent: "Risk Agent"
    },
    {
      type: "insurance",
      severity: "medium",
      message: "ABC Electric insurance expires in 8 days",
      project: "Downtown Retail",
      agent: "Compliance Agent"
    },
    {
      type: "overbilling",
      severity: "high",
      message: "Steel contractor billing 15% over PO quantity",
      project: "Office Renovation",
      agent: "Matching Agent"
    },
    {
      type: "waiver",
      severity: "medium",
      message: "Missing lien waivers for 3 August invoices",
      project: "Plaza Tower",
      agent: "Compliance Agent"
    }
  ];

  const recentActivity = [
    {
      action: "Sub INV-045 approved for $85,400",
      time: "2 hours ago",
      project: "Plaza Tower",
      type: "approval"
    },
    {
      action: "Backcharge issued to HVAC sub for $12,000",
      time: "4 hours ago", 
      project: "Downtown Retail",
      type: "backcharge"
    },
    {
      action: "Owner pay app #8 submitted for $850,000",
      time: "1 day ago",
      project: "Plaza Tower",
      type: "payapp"
    },
    {
      action: "Compliance alert: Insurance renewal required",
      time: "1 day ago",
      project: "Office Renovation",
      type: "compliance"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "backcharge":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "payapp":
        return <ArrowUpRight className="w-4 h-4 text-blue-500" />;
      case "compliance":
        return <Shield className="w-4 h-4 text-amber-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const totalInvoiced = projects.reduce((sum, p) => sum + p.invoicedThisCycle, 0);
  const totalReceived = projects.reduce((sum, p) => sum + p.fundsReceived, 0);
  const totalDisbursed = projects.reduce((sum, p) => sum + p.fundsDisbursed, 0);

  return (
    <div className="space-y-6">
      {/* Header with Project Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">GC Dashboard</h1>
          <p className="text-muted-foreground">Multi-project overview and cash flow management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Pay App
          </Button>
        </div>
      </div>

      {/* Global Alerts */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="destructive" className="flex items-center gap-1 px-3 py-2">
          <AlertTriangle className="w-3 h-3" />
          3 overdue sub invoices
        </Badge>
        <Badge className="bg-amber-500 flex items-center gap-1 px-3 py-2">
          <Shield className="w-3 h-3" />
          2 compliance issues
        </Badge>
        <Badge className="bg-blue-500 flex items-center gap-1 px-3 py-2">
          <ArrowUpRight className="w-3 h-3" />
          1 pending owner pay app
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Invoiced This Cycle</p>
                <p className="text-2xl font-bold text-foreground">${totalInvoiced.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <ArrowDownRight className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Funds Received</p>
                <p className="text-2xl font-bold text-foreground">${totalReceived.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Funds Disbursed</p>
                <p className="text-2xl font-bold text-foreground">${totalDisbursed.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Cash Position</p>
                <p className="text-2xl font-bold text-foreground">${(totalReceived - totalDisbursed).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Projects Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground">This Cycle</p>
                    <p className="font-bold text-foreground">${project.invoicedThisCycle.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Cash Flow</p>
                    <p className="font-bold text-foreground">${(project.fundsReceived - project.fundsDisbursed).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Approved</span>
                      <span className="text-xs font-medium text-foreground">{project.approvedPercent}%</span>
                    </div>
                    <Progress value={project.approvedPercent} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Flagged</span>
                      <span className="text-xs font-medium text-red-600">{project.flaggedPercent}%</span>
                    </div>
                    <Progress value={project.flaggedPercent} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoice Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Invoice Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pipelineStages.map((stage) => (
                <div key={stage.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <div>
                      <span className="text-sm font-medium text-foreground">{stage.name}</span>
                      <p className="text-xs text-muted-foreground">${stage.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{stage.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cash Flow Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Cash Flow Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cashFlowEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    {event.type === "owner_payment" ? (
                      <ArrowDownRight className="w-5 h-5 text-green-500" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-blue-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground">{event.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">${event.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Risk Panel
            <Badge variant="destructive">2 high</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {riskAlerts.map((alert, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getSeverityBadge(alert.severity)}
                      <Badge variant="outline" className="text-xs">{alert.agent}</Badge>
                    </div>
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.project}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{activity.project}</p>
                    <span className="text-xs text-muted-foreground">•</span>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}