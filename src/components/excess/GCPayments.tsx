import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  CreditCard,
  Building,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  Eye,
  Plus,
  Banknote
} from "lucide-react";

export default function GCPayments() {
  const [selectedTab, setSelectedTab] = useState("downstream");

  const downstreamPayments = [
    {
      id: "PAY-DS-001",
      invoice: "SUB-INV-445", 
      subcontractor: "ABC Electric Co.",
      project: "Plaza Tower",
      amount: 85400,
      retainage: 4270,
      netAmount: 81130,
      scheduledDate: "Sep 5, 2024",
      method: "ACH",
      status: "scheduled",
      earlyPayDiscount: 2,
      daysUntil: 8
    },
    {
      id: "PAY-DS-002",
      invoice: "SUB-INV-447",
      subcontractor: "HVAC Solutions Inc.",
      project: "Office Renovation",
      amount: 68900,
      retainage: 3445,
      netAmount: 65455,
      scheduledDate: "Sep 3, 2024",
      method: "ACH",
      status: "processing",
      earlyPayDiscount: 0,
      daysUntil: 6
    },
    {
      id: "PAY-DS-003",
      invoice: "SUB-INV-449",
      subcontractor: "Plumbing Pro LLC",
      project: "Plaza Tower", 
      amount: 18500,
      retainage: 925,
      netAmount: 17575,
      scheduledDate: "Sep 8, 2024",
      method: "Check",
      status: "approved",
      earlyPayDiscount: 1.5,
      daysUntil: 11
    }
  ];

  const upstreamPayments = [
    {
      id: "PAY-US-001",
      payApp: "PAY-APP-008",
      owner: "Metropolitan Development",
      project: "Plaza Tower",
      period: "August 2024",
      amount: 850000,
      retainage: 42500,
      netAmount: 807500,
      submittedDate: "Aug 26, 2024",
      expectedDate: "Sep 10, 2024",
      status: "submitted",
      includedInvoices: 8,
      gcMarkup: 65000
    },
    {
      id: "PAY-US-002", 
      payApp: "PAY-APP-009",
      owner: "Urban Properties LLC",
      project: "Downtown Retail",
      period: "August 2024",
      amount: 620000,
      retainage: 31000,
      netAmount: 589000,
      submittedDate: "Aug 20, 2024",
      expectedDate: "Sep 5, 2024",
      status: "approved",
      includedInvoices: 5,
      gcMarkup: 48000
    },
    {
      id: "PAY-US-003",
      payApp: "PAY-APP-010",
      owner: "TechCorp Industries", 
      project: "Office Renovation",
      period: "August 2024",
      amount: 285000,
      retainage: 14250,
      netAmount: 270750,
      submittedDate: null,
      expectedDate: "Sep 15, 2024",
      status: "draft",
      includedInvoices: 4,
      gcMarkup: 22000
    }
  ];

  const cashFlowAnalysis = {
    currentWeek: {
      incoming: 589000,
      outgoing: 163060,
      netPosition: 425940
    },
    nextWeek: {
      incoming: 0,
      outgoing: 81130,
      netPosition: -81130
    },
    month: {
      totalIncoming: 1667250,
      totalOutgoing: 1456780,
      netCashFlow: 210470
    }
  };

  const earlyPayOpportunities = [
    {
      invoice: "SUB-INV-445",
      subcontractor: "ABC Electric Co.",
      amount: 81130,
      discount: 2,
      savings: 1623,
      daysEarly: 5,
      recommendation: "high"
    },
    {
      invoice: "SUB-INV-449", 
      subcontractor: "Plumbing Pro LLC",
      amount: 17575,
      discount: 1.5,
      savings: 264,
      daysEarly: 3,
      recommendation: "medium"
    }
  ];

  const paymentHistory = [
    {
      id: "HIST-001",
      date: "Aug 25, 2024",
      type: "downstream",
      subcontractor: "Steel Works LLC",
      amount: 125800,
      method: "ACH",
      reference: "ACH-240825-001"
    },
    {
      id: "HIST-002",
      date: "Aug 22, 2024", 
      type: "upstream",
      owner: "Urban Properties LLC",
      amount: 589000,
      method: "Wire",
      reference: "WIRE-240822-002"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "processing":
        return <Badge className="bg-amber-500">Processing</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "completed":
        return <Badge className="bg-emerald-500">Completed</Badge>;
      case "submitted":
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "ACH":
        return <Banknote className="w-4 h-4" />;
      case "Check":
        return <FileText className="w-4 h-4" />;
      case "Wire":
        return <ArrowUpRight className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Manage payments to subs and track owner funding</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Pay App
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Schedule Payment
          </Button>
        </div>
      </div>

      {/* Cash Flow Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <ArrowDownRight className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Incoming This Week</p>
                <p className="text-2xl font-bold text-foreground">${cashFlowAnalysis.currentWeek.incoming.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <ArrowUpRight className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Outgoing This Week</p>
                <p className="text-2xl font-bold text-foreground">${cashFlowAnalysis.currentWeek.outgoing.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Net Position</p>
                <p className="text-2xl font-bold text-foreground">${cashFlowAnalysis.currentWeek.netPosition.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Net</p>
                <p className="text-2xl font-bold text-foreground">${cashFlowAnalysis.month.netCashFlow.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="downstream">Downstream (to Subs)</TabsTrigger>
          <TabsTrigger value="upstream">Upstream (from Owners)</TabsTrigger>
          <TabsTrigger value="earlypay">Early Pay Opportunities</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="downstream" className="space-y-6">
          {/* Downstream Payments Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-amber-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled</p>
                    <p className="text-2xl font-bold text-foreground">
                      {downstreamPayments.filter(p => p.status === "scheduled").length}
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
                    <p className="text-sm text-muted-foreground">Processing</p>
                    <p className="text-2xl font-bold text-foreground">
                      {downstreamPayments.filter(p => p.status === "processing").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${downstreamPayments.reduce((sum, p) => sum + p.netAmount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Downstream Payments List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5" />
                Payments to Subcontractors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {downstreamPayments.map((payment) => (
                  <div key={payment.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMethodIcon(payment.method)}
                        <div>
                          <h4 className="font-medium text-foreground">{payment.invoice}</h4>
                          <p className="text-sm text-muted-foreground">{payment.subcontractor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(payment.status)}
                        <Badge variant="outline">
                          {payment.daysUntil === 0 ? "Today" :
                           payment.daysUntil === 1 ? "Tomorrow" :
                           `${payment.daysUntil} days`}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Project</p>
                        <p className="font-medium text-foreground">{payment.project}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retainage</p>
                        <p className="font-medium text-foreground">${payment.retainage.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Payment</p>
                        <p className="font-medium text-green-600">${payment.netAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Method</p>
                        <p className="font-medium text-foreground">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Scheduled</p>
                        <p className="font-medium text-foreground">{payment.scheduledDate}</p>
                      </div>
                    </div>
                    
                    {payment.earlyPayDiscount > 0 && (
                      <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded">
                        <p className="text-sm text-green-800">
                          Early pay discount available: {payment.earlyPayDiscount}% 
                          (Save ${Math.round(payment.netAmount * payment.earlyPayDiscount / 100)})
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      {payment.status === "scheduled" && (
                        <Button size="sm">
                          Process Payment
                        </Button>
                      )}
                      {payment.earlyPayDiscount > 0 && (
                        <Button variant="outline" size="sm" className="bg-green-50">
                          Pay Early
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upstream" className="space-y-6">
          {/* Upstream Payments List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5" />
                Payments from Owners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upstreamPayments.map((payment) => (
                  <div key={payment.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{payment.payApp}</h4>
                        <p className="text-sm text-muted-foreground">{payment.owner} • {payment.project}</p>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Period</p>
                        <p className="font-medium text-foreground">{payment.period}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GC Markup</p>
                        <p className="font-medium text-foreground">${payment.gcMarkup.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Expected</p>
                        <p className="font-medium text-green-600">${payment.netAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Invoices</p>
                        <p className="font-medium text-foreground">{payment.includedInvoices}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expected</p>
                        <p className="font-medium text-foreground">{payment.expectedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Pay App
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download AIA Forms
                      </Button>
                      {payment.status === "draft" && (
                        <Button size="sm">
                          Submit to Owner
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earlypay" className="space-y-6">
          {/* Early Pay Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Early Payment Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earlyPayOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg bg-green-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{opportunity.invoice}</h4>
                        <p className="text-sm text-muted-foreground">{opportunity.subcontractor}</p>
                      </div>
                      <Badge className={getRecommendationColor(opportunity.recommendation)}>
                        {opportunity.recommendation} priority
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Payment Amount</p>
                        <p className="font-medium text-foreground">${opportunity.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Discount Rate</p>
                        <p className="font-medium text-foreground">{opportunity.discount}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Savings</p>
                        <p className="font-medium text-green-600">${opportunity.savings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Days Early</p>
                        <p className="font-medium text-foreground">{opportunity.daysEarly}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Pay Early (Save ${opportunity.savings})
                      </Button>
                      <Button variant="outline" size="sm">
                        Calculate Impact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recent Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {payment.type === "downstream" ? (
                          <ArrowUpRight className="w-5 h-5 text-red-500" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-green-500" />
                        )}
                        <div>
                          <h4 className="font-medium text-foreground">
                            {payment.type === "downstream" ? payment.subcontractor : payment.owner}
                          </h4>
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Reference: {payment.reference}</p>
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