import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  Brain,
  User,
  Zap,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Calendar
} from "lucide-react";

const performanceMetrics = {
  agentEfficiency: {
    compliance: { accuracy: 97.8, processed: 1247, avgTime: 42 },
    approval: { accuracy: 94.2, processed: 891, avgTime: 18 },
    payment: { accuracy: 99.1, processed: 654, avgTime: 8 },
    supervisor: { accuracy: 98.9, processed: 2792, avgTime: 3 }
  },
  humanOverrides: {
    total: 204,
    byReason: [
      { reason: "Emergency payment", count: 67, percentage: 33 },
      { reason: "Complex approval", count: 45, percentage: 22 },
      { reason: "Missing documentation", count: 38, percentage: 19 },
      { reason: "Vendor dispute", count: 32, percentage: 16 },
      { reason: "System error", count: 22, percentage: 11 }
    ]
  },
  processingTimes: {
    avgTotal: 2.4,
    byStage: [
      { stage: "Intake", avg: 0.2, target: 0.1 },
      { stage: "Compliance", avg: 0.8, target: 0.5 },
      { stage: "Approval", avg: 1.1, target: 1.0 },
      { stage: "Payment", avg: 0.3, target: 0.2 }
    ]
  }
};

const trendData = [
  { month: "Sep", efficiency: 84, overrides: 28, avgTime: 3.2 },
  { month: "Oct", efficiency: 87, overrides: 24, avgTime: 2.9 },
  { month: "Nov", efficiency: 89, overrides: 21, avgTime: 2.6 },
  { month: "Dec", efficiency: 91, overrides: 18, avgTime: 2.4 },
  { month: "Jan", efficiency: 94, overrides: 16, avgTime: 2.1 }
];

export default function PerformanceAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("efficiency");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Performance Analytics</h2>
          <p className="text-muted-foreground">Agent efficiency, override rates, and processing metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4" />
            Custom Range
          </Button>
          <Button variant="ai" size="sm">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex gap-2">
            {["7d", "30d", "90d", "1y"].map((range) => (
              <Button
                key={range}
                variant={selectedTimeframe === range ? "ai" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(range)}
              >
                {range === "7d" ? "7 Days" : 
                 range === "30d" ? "30 Days" :
                 range === "90d" ? "90 Days" : "1 Year"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Efficiency</p>
                <p className="text-2xl font-bold text-status-approved">94.2%</p>
                <p className="text-xs text-accent">+3.1% vs last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Human Overrides</p>
                <p className="text-2xl font-bold text-foreground">5.8%</p>
                <p className="text-xs text-status-approved">-1.2% vs last month</p>
              </div>
              <User className="w-8 h-8 text-status-pending" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
                <p className="text-2xl font-bold text-foreground">2.1 hrs</p>
                <p className="text-xs text-status-approved">-0.3 hrs vs last month</p>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Agent Uptime</p>
                <p className="text-2xl font-bold text-status-approved">99.7%</p>
                <p className="text-xs text-muted-foreground">24/7 availability</p>
              </div>
              <Activity className="w-8 h-8 text-status-approved" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Performance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              Agent Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(performanceMetrics.agentEfficiency).map(([agent, metrics]) => (
              <div key={agent} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {agent}Agent
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {metrics.processed} processed
                    </Badge>
                    <span className="text-sm font-semibold text-foreground">
                      {metrics.accuracy}%
                    </span>
                  </div>
                </div>
                <Progress value={metrics.accuracy} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Avg time: {metrics.avgTime}s</span>
                  <span>Accuracy: {metrics.accuracy}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Processing Time Analysis */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Processing Time vs Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.processingTimes.byStage.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Target: {stage.target}h
                    </span>
                    <span className={`text-sm font-semibold ${
                      stage.avg <= stage.target ? 'text-status-approved' : 'text-status-flagged'
                    }`}>
                      {stage.avg}h
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(stage.avg / (stage.target * 2)) * 100} 
                  className="h-2"
                />
                <div className="flex items-center gap-1">
                  {stage.avg <= stage.target ? (
                    <CheckCircle className="w-3 h-3 text-status-approved" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-status-flagged" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {stage.avg <= stage.target ? "On target" : "Above target"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Human Override Analysis */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            Human Override Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">Override Reasons</h4>
              <div className="space-y-3">
                {performanceMetrics.humanOverrides.byReason.map((item) => (
                  <div key={item.reason} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item.reason}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground w-8">
                        {item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-4">Trend Analysis</h4>
              <div className="space-y-3">
                {trendData.slice(-3).map((data) => (
                  <div key={data.month} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <span className="text-sm font-medium text-foreground">{data.month}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                        <p className="font-semibold text-foreground">{data.efficiency}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Overrides</p>
                        <p className="font-semibold text-foreground">{data.overrides}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Avg Time</p>
                        <p className="font-semibold text-foreground">{data.avgTime}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-accent/5">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-status-approved mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Performance Improvement</h4>
                  <p className="text-xs text-muted-foreground">
                    ComplianceAgent accuracy increased by 2.3% after last optimization
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-border bg-status-pending/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-status-pending mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Optimization Opportunity</h4>
                  <p className="text-xs text-muted-foreground">
                    Approval stage consistently above target - consider threshold adjustment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}