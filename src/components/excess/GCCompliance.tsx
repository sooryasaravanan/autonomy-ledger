import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users,
  Building,
  Calendar,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Search,
  Filter
} from "lucide-react";

export default function GCCompliance() {
  const [selectedProject, setSelectedProject] = useState("all");

  const projects = [
    { id: "plaza-tower", name: "Plaza Tower", activeSubcontractors: 15 },
    { id: "downtown-retail", name: "Downtown Retail", activeSubcontractors: 12 },
    { id: "office-renovation", name: "Office Renovation", activeSubcontractors: 8 }
  ];

  const subcontractorCompliance = [
    {
      id: "abc-electric",
      name: "ABC Electric Co.",
      project: "Plaza Tower",
      overallScore: 85,
      insurance: { status: "good", expiry: "Dec 31, 2024", daysLeft: 145 },
      licenses: { status: "warning", expiry: "Oct 15, 2024", daysLeft: 32 },
      waivers: { status: "good", count: 8, missing: 0 },
      payroll: { status: "good", lastSubmitted: "Aug 20, 2024" },
      safety: { status: "good", lastUpdate: "Aug 15, 2024" }
    },
    {
      id: "steel-works", 
      name: "Steel Works LLC",
      project: "Downtown Retail",
      overallScore: 65,
      insurance: { status: "critical", expiry: "Sep 5, 2024", daysLeft: 8 },
      licenses: { status: "good", expiry: "Mar 30, 2025", daysLeft: 215 },
      waivers: { status: "warning", count: 5, missing: 2 },
      payroll: { status: "good", lastSubmitted: "Aug 22, 2024" },
      safety: { status: "warning", lastUpdate: "Jul 28, 2024" }
    },
    {
      id: "hvac-solutions",
      name: "HVAC Solutions Inc.",
      project: "Office Renovation", 
      overallScore: 92,
      insurance: { status: "good", expiry: "Nov 15, 2024", daysLeft: 89 },
      licenses: { status: "good", expiry: "Jan 20, 2025", daysLeft: 155 },
      waivers: { status: "good", count: 6, missing: 0 },
      payroll: { status: "good", lastSubmitted: "Aug 25, 2024" },
      safety: { status: "good", lastUpdate: "Aug 20, 2024" }
    },
    {
      id: "concrete-masters",
      name: "Concrete Masters",
      project: "Plaza Tower",
      overallScore: 78,
      insurance: { status: "good", expiry: "Feb 28, 2025", daysLeft: 189 },
      licenses: { status: "good", expiry: "Dec 10, 2024", daysLeft: 123 },
      waivers: { status: "critical", count: 3, missing: 4 },
      payroll: { status: "warning", lastSubmitted: "Aug 10, 2024" },
      safety: { status: "good", lastUpdate: "Aug 18, 2024" }
    }
  ];

  const waiverTracker = [
    {
      invoice: "SUB-INV-445",
      subcontractor: "ABC Electric Co.",
      project: "Plaza Tower",
      amount: 85400,
      conditionalWaiver: { status: "received", date: "Aug 24, 2024" },
      unconditionalWaiver: { status: "pending_payment", date: null },
      paymentStatus: "scheduled"
    },
    {
      invoice: "SUB-INV-446",
      subcontractor: "Steel Works LLC", 
      project: "Downtown Retail",
      amount: 125800,
      conditionalWaiver: { status: "missing", date: null },
      unconditionalWaiver: { status: "na", date: null },
      paymentStatus: "flagged"
    },
    {
      invoice: "SUB-INV-447",
      subcontractor: "HVAC Solutions Inc.",
      project: "Office Renovation",
      amount: 68900,
      conditionalWaiver: { status: "received", date: "Aug 22, 2024" },
      unconditionalWaiver: { status: "generated", date: "Aug 25, 2024" },
      paymentStatus: "paid"
    }
  ];

  const complianceAlerts = [
    {
      type: "insurance_expiry",
      severity: "critical",
      subcontractor: "Steel Works LLC",
      message: "General Liability insurance expires in 8 days",
      dueDate: "Sep 5, 2024",
      project: "Downtown Retail"
    },
    {
      type: "missing_waiver",
      severity: "high",
      subcontractor: "Concrete Masters",
      message: "4 missing conditional waivers for August invoices",
      dueDate: "Aug 30, 2024",
      project: "Plaza Tower"
    },
    {
      type: "payroll_overdue",
      severity: "medium",
      subcontractor: "Concrete Masters",
      message: "Certified payroll overdue by 15 days",
      dueDate: "Aug 25, 2024",
      project: "Plaza Tower"
    },
    {
      type: "safety_update",
      severity: "low",
      subcontractor: "Steel Works LLC",
      message: "Safety documentation last updated 30 days ago",
      dueDate: "Sep 1, 2024",
      project: "Downtown Retail"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-500">Good</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "received":
        return <Badge className="bg-green-500">Received</Badge>;
      case "missing":
        return <Badge variant="destructive">Missing</Badge>;
      case "pending_payment":
        return <Badge className="bg-amber-500">Pending Payment</Badge>;
      case "generated":
        return <Badge className="bg-blue-500">Generated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge className="bg-red-500">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Center</h1>
          <p className="text-muted-foreground">Monitor subcontractor compliance across all projects</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-48">
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
            <RefreshCw className="w-4 h-4" />
            Sync Compliance Data
          </Button>
        </div>
      </div>

      {/* Compliance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active Subs</p>
                <p className="text-2xl font-bold text-foreground">
                  {selectedProject === "all" 
                    ? projects.reduce((sum, p) => sum + p.activeSubcontractors, 0)
                    : projects.find(p => p.id === selectedProject)?.activeSubcontractors || 0}
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
                <p className="text-sm text-muted-foreground">Compliant</p>
                <p className="text-2xl font-bold text-foreground">
                  {subcontractorCompliance.filter(sub => sub.overallScore >= 85).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">At Risk</p>
                <p className="text-2xl font-bold text-foreground">
                  {subcontractorCompliance.filter(sub => sub.overallScore >= 70 && sub.overallScore < 85).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Non-Compliant</p>
                <p className="text-2xl font-bold text-foreground">
                  {subcontractorCompliance.filter(sub => sub.overallScore < 70).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Subcontractor Overview</TabsTrigger>
          <TabsTrigger value="waivers">Waiver Tracker</TabsTrigger>
          <TabsTrigger value="alerts">Compliance Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Subcontractor Compliance Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Subcontractor Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subcontractorCompliance.map((sub) => (
                  <div key={sub.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-foreground">{sub.name}</h4>
                        <p className="text-sm text-muted-foreground">{sub.project}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">Overall Score:</span>
                          <span className={`font-bold ${
                            sub.overallScore >= 85 ? "text-green-600" :
                            sub.overallScore >= 70 ? "text-amber-600" :
                            "text-red-600"
                          }`}>
                            {sub.overallScore}%
                          </span>
                        </div>
                        <Progress value={sub.overallScore} className="w-24 h-2" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sub.insurance.status)}
                          <span className="text-xs text-muted-foreground">Insurance</span>
                        </div>
                        <div>
                          {getStatusBadge(sub.insurance.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            Expires: {sub.insurance.expiry}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sub.licenses.status)}
                          <span className="text-xs text-muted-foreground">Licenses</span>
                        </div>
                        <div>
                          {getStatusBadge(sub.licenses.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            Expires: {sub.licenses.expiry}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sub.waivers.status)}
                          <span className="text-xs text-muted-foreground">Waivers</span>
                        </div>
                        <div>
                          {getStatusBadge(sub.waivers.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            {sub.waivers.count} received, {sub.waivers.missing} missing
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sub.payroll.status)}
                          <span className="text-xs text-muted-foreground">Payroll</span>
                        </div>
                        <div>
                          {getStatusBadge(sub.payroll.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            Last: {sub.payroll.lastSubmitted}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(sub.safety.status)}
                          <span className="text-xs text-muted-foreground">Safety</span>
                        </div>
                        <div>
                          {getStatusBadge(sub.safety.status)}
                          <p className="text-xs text-muted-foreground mt-1">
                            Updated: {sub.safety.lastUpdate}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Compliance Packet
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Request Updates
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waivers">
          {/* Waiver Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Lien Waiver Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {waiverTracker.map((waiver) => (
                  <div key={waiver.invoice} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{waiver.invoice}</h4>
                        <p className="text-sm text-muted-foreground">{waiver.subcontractor} • {waiver.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${waiver.amount.toLocaleString()}</p>
                        {getStatusBadge(waiver.paymentStatus)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-foreground">Conditional Waiver</h5>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(waiver.conditionalWaiver.status)}
                          <span className="text-xs text-muted-foreground">
                            {waiver.conditionalWaiver.date || "—"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-foreground">Unconditional Waiver</h5>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(waiver.unconditionalWaiver.status)}
                          <span className="text-xs text-muted-foreground">
                            {waiver.unconditionalWaiver.date || "—"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          {/* Compliance Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Compliance Alerts
                <Badge variant="destructive">{complianceAlerts.filter(a => a.severity === "critical").length} critical</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceAlerts.map((alert, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getSeverityBadge(alert.severity)}
                          <Badge variant="outline" className="text-xs">{alert.type.replace('_', ' ')}</Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{alert.subcontractor}</h4>
                        <p className="text-sm text-muted-foreground">{alert.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Due: {alert.dueDate}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3">{alert.message}</p>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant={alert.severity === "critical" ? "destructive" : "outline"}>
                        Contact Sub
                      </Button>
                      <Button variant="outline" size="sm">
                        Set Reminder
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}