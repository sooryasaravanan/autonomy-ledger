import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Shield, 
  Calendar,
  Upload,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Plus
} from "lucide-react";

export default function SubcontractorDashboard() {
  const tasks = [
    {
      id: 1,
      title: "Upload missing lien waiver",
      description: "INV-0142 - Turner Project X",
      priority: "high",
      dueDate: "Aug 29",
      progress: 60,
      type: "document"
    },
    {
      id: 2,
      title: "Respond to GC comment",
      description: "Line 003 quantity clarification needed",
      priority: "medium",
      dueDate: "Aug 27",
      progress: 0,
      type: "message"
    },
    {
      id: 3,
      title: "Fix PO mismatch on INV-0142",
      description: "Delivered qty exceeds PO allowance",
      priority: "high",
      dueDate: "Aug 26",
      progress: 30,
      type: "invoice"
    }
  ];

  const pipelineStages = [
    { name: "Draft", count: 2, color: "bg-slate-500" },
    { name: "Submitted", count: 1, color: "bg-blue-500" },
    { name: "Under Review", count: 3, color: "bg-amber-500" },
    { name: "Flagged", count: 1, color: "bg-red-500" },
    { name: "Approved", count: 2, color: "bg-green-500" },
    { name: "Scheduled", count: 1, color: "bg-purple-500" },
    { name: "Paid", count: 12, color: "bg-emerald-500" }
  ];

  const upcomingPayments = [
    { amount: 38400, date: "Aug 29", invoice: "INV-0141", status: "scheduled" },
    { amount: 24800, date: "Sep 5", invoice: "INV-0143", status: "approved" },
    { amount: 15600, date: "Sep 12", invoice: "INV-0144", status: "pending" }
  ];

  const complianceItems = [
    { name: "General Liability", status: "good", expiry: "Dec 2024" },
    { name: "Workers Comp", status: "warning", expiry: "Sep 15, 2024" },
    { name: "W-9 Form", status: "good", expiry: "Current" },
    { name: "C-10 License", status: "critical", expiry: "Aug 30, 2024" }
  ];

  const recentActivity = [
    {
      action: "GC approved line 003 on INV-0141",
      time: "2 hours ago",
      type: "approval"
    },
    {
      action: "Backcharge opened on INV-0137",
      time: "1 day ago", 
      type: "backcharge"
    },
    {
      action: "Payment processed for INV-0139",
      time: "2 days ago",
      type: "payment"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Project Selector and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Turner Construction - Project X Plaza</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Insurance expires in 12 days
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            2 invoices flagged
          </Badge>
          
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-foreground">$127,800</p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">$89,400</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Pay Time</p>
                <p className="text-2xl font-bold text-foreground">24 days</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasks</p>
                <p className="text-2xl font-bold text-foreground">{tasks.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              My Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{task.title}</h4>
                  <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">Due {task.dueDate}</div>
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} className="w-16 h-2" />
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="ghost" className="w-full mt-4">
              View All Tasks
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

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
                    <span className="text-sm font-medium text-foreground">{stage.name}</span>
                  </div>
                  <Badge variant="outline">{stage.count}</Badge>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full mt-4">
              View All Invoices
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Payment Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPayments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{payment.invoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{payment.date}</p>
                  <Badge variant={
                    payment.status === "scheduled" ? "default" : 
                    payment.status === "approved" ? "secondary" : 
                    "outline"
                  }>
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button variant="ghost" className="w-full">
              View Payment History
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Compliance Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compliance Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.expiry}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === "good" ? "bg-green-500" :
                    item.status === "warning" ? "bg-amber-500" :
                    "bg-red-500"
                  }`} />
                  <Badge variant={
                    item.status === "good" ? "default" :
                    item.status === "warning" ? "secondary" :
                    "destructive"
                  }>
                    {item.status === "good" ? "Current" :
                     item.status === "warning" ? "Expiring Soon" :
                     "Expired"}
                  </Badge>
                </div>
              </div>
            ))}
            
            <Button variant="ghost" className="w-full">
              Manage Compliance
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === "approval" ? "bg-green-500" :
                  activity.type === "backcharge" ? "bg-red-500" :
                  "bg-blue-500"
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-4">
            View Full Activity Log
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}