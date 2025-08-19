import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Calendar, 
  CreditCard, 
  Download, 
  Eye, 
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Building,
  FileText,
  Banknote,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Search,
  Filter,
  Plus
} from "lucide-react";

export default function SubcontractorPayments() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const paymentSummary = {
    totalOutstanding: 127800,
    thisMonth: 89400,
    avgPayTime: 24,
    nextPayment: {
      amount: 38400,
      date: "Aug 29, 2024",
      invoice: "INV-0141"
    }
  };

  const upcomingPayments = [
    {
      id: "pay-001",
      invoice: "INV-0141",
      project: "Turner Project X",
      amount: 38400,
      retainage: 3840,
      netAmount: 34560,
      scheduledDate: "Aug 29, 2024",
      status: "scheduled",
      method: "ACH",
      daysUntil: 2
    },
    {
      id: "pay-002", 
      invoice: "INV-0143",
      project: "Turner Project X",
      amount: 24800,
      retainage: 2480,
      netAmount: 22320,
      scheduledDate: "Sep 5, 2024",
      status: "approved",
      method: "ACH",
      daysUntil: 9
    },
    {
      id: "pay-003",
      invoice: "INV-0144",
      project: "Skanska Downtown", 
      amount: 15600,
      retainage: 1560,
      netAmount: 14040,
      scheduledDate: "Sep 12, 2024",
      status: "pending_approval",
      method: "Check",
      daysUntil: 16
    }
  ];

  const paymentHistory = [
    {
      id: "hist-001",
      invoice: "INV-0139",
      project: "Turner Project X",
      amount: 32400,
      retainage: 3240,
      netAmount: 29160,
      paidDate: "Aug 22, 2024",
      method: "ACH",
      reference: "ACH-240822-001",
      status: "completed"
    },
    {
      id: "hist-002",
      invoice: "INV-0138", 
      project: "Skanska Downtown",
      amount: 18900,
      retainage: 1890,
      netAmount: 17010,
      paidDate: "Aug 15, 2024",
      method: "ACH",
      reference: "ACH-240815-002",
      status: "completed"
    },
    {
      id: "hist-003",
      invoice: "INV-0137",
      project: "Turner Project X",
      amount: 45600,
      retainage: 4560,
      netAmount: 41040,
      paidDate: "Aug 8, 2024",
      method: "Check",
      reference: "CHK-4567",
      status: "completed"
    }
  ];

  const retainageInfo = [
    {
      project: "Turner Project X",
      totalBilled: 285600,
      retainageRate: 5,
      retainageHeld: 14280,
      releaseSchedule: "Upon substantial completion",
      estimatedRelease: "Nov 2024"
    },
    {
      project: "Skanska Downtown",
      totalBilled: 156800,
      retainageRate: 5,
      retainageHeld: 7840,
      releaseSchedule: "Final completion + 30 days",
      estimatedRelease: "Oct 2024"
    }
  ];

  const bankingInfo = {
    primaryAccount: {
      bankName: "First National Bank",
      accountType: "Business Checking",
      routingNumber: "****5678",
      accountNumber: "****1234",
      status: "verified",
      isDefault: true
    },
    backupAccount: {
      bankName: "City Bank",
      accountType: "Business Savings", 
      routingNumber: "****9012",
      accountNumber: "****5678",
      status: "verified",
      isDefault: false
    }
  };

  const paymentPreferences = {
    defaultMethod: "ACH",
    earlyPayDiscountConsent: true,
    notificationPreferences: {
      email: true,
      sms: false,
      inApp: true
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending_approval":
        return <Badge className="bg-amber-500">Pending</Badge>;
      case "completed":
        return <Badge className="bg-emerald-500">Paid</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Track payment schedules, history, and manage banking information</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync Payments
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Request Early Pay
          </Button>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-foreground">${paymentSummary.totalOutstanding.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">${paymentSummary.thisMonth.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Pay Time</p>
                <p className="text-2xl font-bold text-foreground">{paymentSummary.avgPayTime} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="text-lg font-bold text-foreground">${paymentSummary.nextPayment.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{paymentSummary.nextPayment.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Tracking Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="retainage">Retainage</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search payments..." className="pl-10" />
                </div>
                
                <Select>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="turner-x">Turner Project X</SelectItem>
                    <SelectItem value="skanska">Skanska Downtown</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMethodIcon(payment.method)}
                        <div>
                          <h4 className="font-medium text-foreground">{payment.invoice}</h4>
                          <p className="text-sm text-muted-foreground">{payment.project}</p>
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
                    
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retainage</p>
                        <p className="font-medium text-foreground">-${payment.retainage.toLocaleString()}</p>
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
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Remittance Preview
                      </Button>
                      {payment.status === "scheduled" && (
                        <Button variant="outline" size="sm">
                          Update Banking
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getMethodIcon(payment.method)}
                        <div>
                          <h4 className="font-medium text-foreground">{payment.invoice}</h4>
                          <p className="text-sm text-muted-foreground">{payment.project}</p>
                        </div>
                      </div>
                      
                      {getStatusBadge(payment.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retainage</p>
                        <p className="font-medium text-foreground">-${payment.retainage.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Paid</p>
                        <p className="font-medium text-green-600">${payment.netAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Method</p>
                        <p className="font-medium text-foreground">{payment.method}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid Date</p>
                        <p className="font-medium text-foreground">{payment.paidDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reference</p>
                        <p className="font-medium text-foreground">{payment.reference}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Remittance
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Waiver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retainage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Retainage Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {retainageInfo.map((project, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground mb-4">{project.project}</h4>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Billed</p>
                        <p className="text-lg font-bold text-foreground">${project.totalBilled.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Retainage Rate</p>
                        <p className="text-lg font-bold text-foreground">{project.retainageRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Held</p>
                        <p className="text-lg font-bold text-amber-600">${project.retainageHeld.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Release Schedule</p>
                        <p className="font-medium text-foreground">{project.releaseSchedule}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Release</p>
                        <p className="font-medium text-foreground">{project.estimatedRelease}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-medium text-blue-900">Total Retainage Held</h4>
                      <p className="text-2xl font-bold text-blue-900 mb-2">
                        ${retainageInfo.reduce((sum, p) => sum + p.retainageHeld, 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-blue-700">
                        Estimated release value across all active projects
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Banking Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{bankingInfo.primaryAccount.bankName}</h4>
                      <p className="text-sm text-muted-foreground">{bankingInfo.primaryAccount.accountType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">Primary</Badge>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Routing Number</p>
                      <p className="font-medium text-foreground">{bankingInfo.primaryAccount.routingNumber}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account Number</p>
                      <p className="font-medium text-foreground">{bankingInfo.primaryAccount.accountNumber}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Edit Account
                  </Button>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{bankingInfo.backupAccount.bankName}</h4>
                      <p className="text-sm text-muted-foreground">{bankingInfo.backupAccount.accountType}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Backup</Badge>
                      <Badge variant="outline">Verified</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Routing Number</p>
                      <p className="font-medium text-foreground">{bankingInfo.backupAccount.routingNumber}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account Number</p>
                      <p className="font-medium text-foreground">{bankingInfo.backupAccount.accountNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Set as Primary
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Account
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Bank Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Default Payment Method</label>
                  <Select value={paymentPreferences.defaultMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACH">ACH Transfer</SelectItem>
                      <SelectItem value="Check">Paper Check</SelectItem>
                      <SelectItem value="Wire">Wire Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={paymentPreferences.earlyPayDiscountConsent}
                    className="rounded"
                  />
                  <label className="text-sm text-foreground">
                    I consent to early payment discounts when offered by GCs
                  </label>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Notification Preferences</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={paymentPreferences.notificationPreferences.email}
                        className="rounded"
                      />
                      <label className="text-sm text-foreground">Email notifications</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={paymentPreferences.notificationPreferences.sms}
                        className="rounded"
                      />
                      <label className="text-sm text-foreground">SMS notifications</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={paymentPreferences.notificationPreferences.inApp}
                        className="rounded"
                      />
                      <label className="text-sm text-foreground">In-app notifications</label>
                    </div>
                  </div>
                </div>
                
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}