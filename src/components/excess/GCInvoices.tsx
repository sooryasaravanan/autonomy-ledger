import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  MessageSquare,
  DollarSign,
  Clock,
  Building,
  Brain,
  Shield,
  Users,
  Flag,
  ArrowRight,
  Download
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function GCInvoices() {
  const [selectedTab, setSelectedTab] = useState("incoming");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const incomingInvoices = [
    {
      id: "SUB-INV-445",
      subcontractor: "ABC Electric Co.",
      project: "Plaza Tower",
      amount: 85400,
      retainage: 4270,
      netAmount: 81130,
      status: "under_review",
      submitted: "Aug 24, 2024",
      etaPayment: "Sep 5, 2024",
      flags: ["Missing Conditional Waiver"],
      aiScore: 92,
      validations: {
        compliance: "pass",
        matching: "warning", 
        risk: "pass"
      }
    },
    {
      id: "SUB-INV-446",
      subcontractor: "Steel Works LLC",
      project: "Downtown Retail",
      amount: 125800,
      retainage: 6290,
      netAmount: 119510,
      status: "flagged",
      submitted: "Aug 23, 2024",
      etaPayment: "Sep 8, 2024",
      flags: ["Over PO Quantity", "Duplicate Risk"],
      aiScore: 65,
      validations: {
        compliance: "pass",
        matching: "fail",
        risk: "fail"
      }
    },
    {
      id: "SUB-INV-447",
      subcontractor: "HVAC Solutions Inc.",
      project: "Office Renovation", 
      amount: 68900,
      retainage: 3445,
      netAmount: 65455,
      status: "approved",
      submitted: "Aug 22, 2024",
      etaPayment: "Sep 3, 2024",
      flags: [],
      aiScore: 98,
      validations: {
        compliance: "pass",
        matching: "pass",
        risk: "pass"
      }
    },
    {
      id: "SUB-INV-448",
      subcontractor: "Concrete Masters",
      project: "Plaza Tower",
      amount: 156700,
      retainage: 7835,
      netAmount: 148865,
      status: "submitted",
      submitted: "Aug 25, 2024",
      etaPayment: "Sep 10, 2024",
      flags: [],
      aiScore: 89,
      validations: {
        compliance: "pending",
        matching: "pending",
        risk: "pending"
      }
    }
  ];

  const payApplications = [
    {
      id: "PAY-APP-008",
      project: "Plaza Tower",
      owner: "Metropolitan Development",
      period: "August 2024",
      amount: 850000,
      retainage: 42500,
      netAmount: 807500,
      status: "submitted",
      submittedDate: "Aug 26, 2024",
      dueDate: "Sep 10, 2024",
      includedInvoices: 8,
      gcMarkup: 65000
    },
    {
      id: "PAY-APP-009",
      project: "Downtown Retail",
      owner: "Urban Properties LLC",
      period: "August 2024", 
      amount: 620000,
      retainage: 31000,
      netAmount: 589000,
      status: "approved",
      submittedDate: "Aug 20, 2024",
      dueDate: "Sep 5, 2024",
      includedInvoices: 5,
      gcMarkup: 48000
    },
    {
      id: "PAY-APP-010",
      project: "Office Renovation",
      owner: "TechCorp Industries",
      period: "August 2024",
      amount: 285000,
      retainage: 14250,
      netAmount: 270750,
      status: "draft",
      submittedDate: null,
      dueDate: "Sep 15, 2024",
      includedInvoices: 4,
      gcMarkup: 22000
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case "under_review":
        return <Badge className="bg-amber-500">Under Review</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "paid":
        return <Badge className="bg-emerald-500">Paid</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getValidationIcon = (validation: string) => {
    switch (validation) {
      case "pass":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "fail":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Manage incoming sub invoices and outgoing pay applications</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Run AI Validation
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Pay App
          </Button>
        </div>
      </div>

      {/* Invoice Management Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incoming">
            Incoming from Subs
            <Badge variant="outline" className="ml-2">
              {incomingInvoices.filter(inv => inv.status !== "paid").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="payapps">
            Pay Applications
            <Badge variant="outline" className="ml-2">
              {payApplications.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                    <p className="text-2xl font-bold text-foreground">
                      {incomingInvoices.filter(inv => ["submitted", "under_review"].includes(inv.status)).length}
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
                    <p className="text-sm text-muted-foreground">Flagged</p>
                    <p className="text-2xl font-bold text-foreground">
                      {incomingInvoices.filter(inv => inv.status === "flagged").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${incomingInvoices.reduce((sum, inv) => sum + inv.amount, 0).toLocaleString()}
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
                    <p className="text-sm text-muted-foreground">Avg AI Score</p>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(incomingInvoices.reduce((sum, inv) => sum + inv.aiScore, 0) / incomingInvoices.length)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search invoices..." className="pl-10" />
                </div>
                
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="plaza-tower">Plaza Tower</SelectItem>
                    <SelectItem value="downtown-retail">Downtown Retail</SelectItem>
                    <SelectItem value="office-renovation">Office Renovation</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger className="w-full lg:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedInvoices.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedInvoices.length} invoice(s) selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Bulk Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="w-4 h-4 mr-2" />
                      Bulk Flag
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Subs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invoices List */}
          <Card>
            <CardHeader>
              <CardTitle>Incoming Sub Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incomingInvoices.map((invoice) => (
                  <div key={invoice.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedInvoices([...selectedInvoices, invoice.id]);
                            } else {
                              setSelectedInvoices(selectedInvoices.filter(id => id !== invoice.id));
                            }
                          }}
                          className="rounded"
                        />
                        <div>
                          <h4 className="font-medium text-foreground">{invoice.id}</h4>
                          <p className="text-sm text-muted-foreground">{invoice.subcontractor}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(invoice.status)}
                        <Badge variant="outline" className={getAIScoreColor(invoice.aiScore)}>
                          AI: {invoice.aiScore}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Project</p>
                        <p className="font-medium text-foreground">{invoice.project}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${invoice.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Retainage</p>
                        <p className="font-medium text-foreground">${invoice.retainage.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Amount</p>
                        <p className="font-medium text-green-600">${invoice.netAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium text-foreground">{invoice.submitted}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ETA Payment</p>
                        <p className="font-medium text-foreground">{invoice.etaPayment}</p>
                      </div>
                    </div>

                    {/* AI Validation Status */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs text-muted-foreground">Compliance:</span>
                        {getValidationIcon(invoice.validations.compliance)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="text-xs text-muted-foreground">Matching:</span>
                        {getValidationIcon(invoice.validations.matching)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        <span className="text-xs text-muted-foreground">Risk:</span>
                        {getValidationIcon(invoice.validations.risk)}
                      </div>
                    </div>
                    
                    {invoice.flags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {invoice.flags.map((flag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Review Details
                      </Button>
                      {invoice.status === "under_review" && (
                        <>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <Flag className="w-4 h-4 mr-2" />
                            Flag
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message Sub
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payapps" className="space-y-6">
          {/* Pay Applications List */}
          <Card>
            <CardHeader>
              <CardTitle>Pay Applications to Owners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payApplications.map((payApp) => (
                  <div key={payApp.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{payApp.id}</h4>
                        <p className="text-sm text-muted-foreground">{payApp.project} • {payApp.owner}</p>
                      </div>
                      {getStatusBadge(payApp.status)}
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Period</p>
                        <p className="font-medium text-foreground">{payApp.period}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-medium text-foreground">${payApp.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GC Markup</p>
                        <p className="font-medium text-foreground">${payApp.gcMarkup.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Net Amount</p>
                        <p className="font-medium text-green-600">${payApp.netAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Invoices</p>
                        <p className="font-medium text-foreground">{payApp.includedInvoices}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Due Date</p>
                        <p className="font-medium text-foreground">{payApp.dueDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download AIA Forms
                      </Button>
                      {payApp.status === "draft" && (
                        <Button size="sm">
                          <ArrowRight className="w-4 h-4 mr-2" />
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
      </Tabs>
    </div>
  );
}