import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  Target,
  Shield,
  Clock,
  DollarSign,
  FileText,
  Users,
  Eye,
  Download,
  RefreshCw
} from "lucide-react";

export default function GCRiskInsights() {
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");

  const riskMetrics = {
    overall: {
      score: 78,
      trend: "improving",
      flaggedInvoices: 12,
      totalInvoices: 156
    },
    categories: [
      { name: "Duplicate Detection", score: 92, alerts: 2, trend: "stable" },
      { name: "Fraud Detection", score: 88, alerts: 1, trend: "improving" },
      { name: "Compliance Risk", score: 75, alerts: 8, trend: "declining" },
      { name: "Financial Risk", score: 82, alerts: 3, trend: "improving" }
    ]
  };

  const anomalyDetection = [
    {
      id: "ANOM-001",
      type: "overbilling",
      severity: "high",
      subcontractor: "Steel Works LLC",
      project: "Downtown Retail",
      description: "Billing 15% over PO quantity for 3 consecutive invoices",
      amount: 18500,
      pattern: "recurring",
      confidence: 94
    },
    {
      id: "ANOM-002",
      type: "duplicate",
      severity: "medium",
      subcontractor: "HVAC Solutions Inc.",
      project: "Plaza Tower",
      description: "Invoice amounts match within 2% of previous submission",
      amount: 68900,
      pattern: "potential_duplicate",
      confidence: 87
    },
    {
      id: "ANOM-003",
      type: "timing",
      severity: "low",
      subcontractor: "ABC Electric Co.",
      project: "Office Renovation",
      description: "Unusual submission timing - 3 invoices in 24 hours",
      amount: 45200,
      pattern: "batch_submission",
      confidence: 76
    }
  ];

  const kpiMetrics = [
    {
      name: "Average Approval Time",
      value: "18.5",
      unit: "hours",
      target: "24",
      trend: "improving",
      change: -12
    },
    {
      name: "Flagged Invoice Rate",
      value: "7.7",
      unit: "%",
      target: "5.0",
      trend: "declining",
      change: 15
    },
    {
      name: "Sub Compliance Score",
      value: "85.2",
      unit: "%",
      target: "90.0",
      trend: "stable",
      change: 2
    },
    {
      name: "Payment Accuracy",
      value: "98.1",
      unit: "%",
      target: "99.0",
      trend: "improving",
      change: 5
    }
  ];

  const predictiveAlerts = [
    {
      type: "cashflow",
      severity: "medium",
      message: "Project cashflow shortage expected in 3 weeks",
      project: "Office Renovation",
      impact: "$285,000",
      probability: 78,
      recommendation: "Expedite owner pay app submission"
    },
    {
      type: "compliance",
      severity: "high", 
      message: "Insurance renewal deadline approaching for 5 subs",
      project: "All Projects",
      impact: "Invoice delays",
      probability: 92,
      recommendation: "Send renewal reminders immediately"
    },
    {
      type: "performance",
      severity: "low",
      message: "HVAC sub showing pattern of late submissions",
      project: "Plaza Tower",
      impact: "Schedule delays",
      probability: 65,
      recommendation: "Schedule performance review meeting"
    }
  ];

  const subRiskProfiles = [
    {
      name: "ABC Electric Co.",
      riskLevel: "low",
      score: 92,
      issues: ["None"],
      recentFlags: 0,
      paymentHistory: "excellent",
      complianceScore: 94
    },
    {
      name: "Steel Works LLC",
      riskLevel: "high",
      score: 65,
      issues: ["Overbilling", "Insurance Expiry", "Late Submissions"],
      recentFlags: 8,
      paymentHistory: "poor",
      complianceScore: 68
    },
    {
      name: "HVAC Solutions Inc.",
      riskLevel: "medium",
      score: 78,
      issues: ["Duplicate Risk", "Documentation Delays"],
      recentFlags: 3,
      paymentHistory: "good",
      complianceScore: 85
    },
    {
      name: "Concrete Masters",
      riskLevel: "medium",
      score: 74,
      issues: ["Waiver Management", "Payroll Delays"],
      recentFlags: 4,
      paymentHistory: "fair",
      complianceScore: 79
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

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "low":
        return <Badge className="bg-green-500">Low Risk</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      default:
        return <Badge variant="outline">{level}</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "declining":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "stable":
        return <BarChart3 className="w-4 h-4 text-blue-500" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Risk & Insights</h1>
          <p className="text-muted-foreground">AI-driven risk analysis and predictive insights</p>
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
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Analysis
          </Button>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-foreground">{riskMetrics.overall.score}</p>
                  {getTrendIcon(riskMetrics.overall.trend)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Flagged Invoices</p>
                <p className="text-2xl font-bold text-foreground">{riskMetrics.overall.flaggedInvoices}</p>
                <p className="text-xs text-muted-foreground">
                  of {riskMetrics.overall.totalInvoices} total
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-foreground">94%</p>
                <p className="text-xs text-muted-foreground">Detection accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">False Positives</p>
                <p className="text-2xl font-bold text-foreground">2.1%</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Risk Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {riskMetrics.categories.map((category, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{category.name}</h4>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(category.trend)}
                    <Badge variant="outline">{category.alerts} alerts</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Risk Score</span>
                    <span className="font-medium text-foreground">{category.score}%</span>
                  </div>
                  <Progress value={category.score} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis Tabs */}
      <Tabs defaultValue="anomalies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="kpis">Performance KPIs</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Alerts</TabsTrigger>
          <TabsTrigger value="subprofiles">Sub Risk Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Anomaly Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {anomalyDetection.map((anomaly) => (
                  <div key={anomaly.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityBadge(anomaly.severity)}
                          <Badge variant="outline" className="text-xs">{anomaly.type}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {anomaly.confidence}% confidence
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{anomaly.subcontractor}</h4>
                        <p className="text-sm text-muted-foreground">{anomaly.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${anomaly.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{anomaly.pattern}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3">{anomaly.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant={anomaly.severity === "high" ? "destructive" : "outline"}>
                        Investigate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Pattern
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark False Positive
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Performance KPIs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {kpiMetrics.map((kpi, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{kpi.name}</h4>
                      {getTrendIcon(kpi.trend)}
                    </div>
                    
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                      <span className="text-sm text-muted-foreground">{kpi.unit}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        <span className={`text-sm font-medium ${
                          kpi.change > 0 && kpi.trend === "improving" ? "text-green-600" :
                          kpi.change > 0 && kpi.trend === "declining" ? "text-red-600" :
                          kpi.change < 0 && kpi.trend === "improving" ? "text-green-600" :
                          "text-red-600"
                        }`}>
                          {kpi.change > 0 ? "+" : ""}{kpi.change}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Target</span>
                        <span className="text-foreground">{kpi.target} {kpi.unit}</span>
                      </div>
                      <Progress 
                        value={Math.min(100, (parseFloat(kpi.value) / parseFloat(kpi.target)) * 100)} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Predictive Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveAlerts.map((alert, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {getSeverityBadge(alert.severity)}
                          <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.probability}% probability
                          </Badge>
                        </div>
                        <h4 className="font-medium text-foreground">{alert.message}</h4>
                        <p className="text-sm text-muted-foreground">{alert.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">{alert.impact}</p>
                        <p className="text-xs text-muted-foreground">Potential impact</p>
                      </div>
                    </div>
                    
                    <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Recommendation:</strong> {alert.recommendation}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        Take Action
                      </Button>
                      <Button variant="outline" size="sm">
                        Set Reminder
                      </Button>
                      <Button variant="outline" size="sm">
                        View Analysis
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subprofiles">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Subcontractor Risk Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subRiskProfiles.map((sub, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{sub.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {getRiskBadge(sub.riskLevel)}
                          <span className="text-sm text-muted-foreground">Score: {sub.score}/100</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Recent Flags</p>
                        <p className="font-medium text-foreground">{sub.recentFlags}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Payment History</p>
                        <p className="font-medium text-foreground">{sub.paymentHistory}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Compliance Score</p>
                        <p className="font-medium text-foreground">{sub.complianceScore}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active Issues</p>
                        <p className="font-medium text-foreground">{sub.issues.length}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-muted-foreground mb-2">Current Issues:</p>
                      <div className="flex flex-wrap gap-1">
                        {sub.issues.map((issue, issueIndex) => (
                          <Badge key={issueIndex} variant="outline" className="text-xs">
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Risk Report
                      </Button>
                      {sub.riskLevel === "high" && (
                        <Button size="sm" variant="destructive">
                          Schedule Review
                        </Button>
                      )}
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