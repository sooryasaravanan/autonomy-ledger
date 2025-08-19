import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Eye, 
  Copy, 
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  MoreHorizontal
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SubcontractorInvoices() {
  const [view, setView] = useState<"list" | "create">("list");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);

  const invoices = [
    {
      id: "INV-0142",
      project: "Turner Project X",
      poSov: "PO-2024-001",
      submitted: "Aug 20, 2024",
      status: "flagged",
      amount: 58240,
      retainage: 5824,
      etaPay: "Aug 30",
      flags: ["Quantity > Delivery", "Missing Conditional Waiver"]
    },
    {
      id: "INV-0141", 
      project: "Turner Project X",
      poSov: "SOV-003",
      submitted: "Aug 15, 2024",
      status: "approved",
      amount: 38400,
      retainage: 3840,
      etaPay: "Aug 29",
      flags: []
    },
    {
      id: "INV-0140",
      project: "Skanska Downtown",
      poSov: "PO-2024-002",
      submitted: "Aug 10, 2024", 
      status: "paid",
      amount: 24800,
      retainage: 2480,
      etaPay: "Paid Aug 22",
      flags: []
    },
    {
      id: "INV-0139",
      project: "Turner Project X",
      poSov: "SOV-002",
      submitted: "Aug 5, 2024",
      status: "under_review",
      amount: 15600,
      retainage: 1560,
      etaPay: "Sep 5",
      flags: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "submitted":
        return <Badge variant="secondary">Submitted</Badge>;
      case "under_review":
        return <Badge className="bg-amber-500">Under Review</Badge>;
      case "flagged":
        return <Badge variant="destructive">Flagged</Badge>;
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "scheduled":
        return <Badge className="bg-purple-500">Scheduled</Badge>;
      case "paid":
        return <Badge className="bg-emerald-500">Paid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (view === "create") {
    return <InvoiceWizard onBack={() => setView("list")} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">Manage your project invoices and track payments</p>
        </div>
        
        <Button onClick={() => setView("create")} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold text-foreground">22</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold text-foreground">$127,800</p>
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
                <p className="text-2xl font-bold text-foreground">1</p>
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
                <p className="text-2xl font-bold text-foreground">24 days</p>
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
            
            <Select>
              <SelectTrigger className="w-full lg:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
            
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
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message GC
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
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
                      <p className="text-sm text-muted-foreground">{invoice.project}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(invoice.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Clone
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message GC
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">PO/SOV</p>
                    <p className="font-medium text-foreground">{invoice.poSov}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Submitted</p>
                    <p className="font-medium text-foreground">{invoice.submitted}</p>
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
                    <p className="text-muted-foreground">ETA Pay</p>
                    <p className="font-medium text-foreground">{invoice.etaPay}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Net</p>
                    <p className="font-medium text-foreground">${(invoice.amount - invoice.retainage).toLocaleString()}</p>
                  </div>
                </div>
                
                {invoice.flags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {invoice.flags.map((flag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {flag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Invoice Creation Wizard Component
function InvoiceWizard({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    { id: 1, title: "Template", description: "Choose invoice type" },
    { id: 2, title: "Header", description: "Basic information" },
    { id: 3, title: "Line Items", description: "Add work details" },
    { id: 4, title: "Documents", description: "Required attachments" },
    { id: 5, title: "Review", description: "Validate & submit" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Invoices
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create New Invoice</h1>
          <p className="text-muted-foreground">Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-border text-muted-foreground"
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-8 w-12 h-0.5 ${
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && <TemplateStep />}
          {currentStep === 2 && <HeaderStep />}
          {currentStep === 3 && <LineItemsStep />}
          {currentStep === 4 && <DocumentsStep />}
          {currentStep === 5 && <ReviewStep />}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
        >
          {currentStep === steps.length ? "Submit Invoice" : "Next"}
        </Button>
      </div>
    </div>
  );
}

// Step Components (simplified for demo)
function TemplateStep() {
  const templates = [
    { id: "progress", name: "Progress Billing (AIA)", description: "Monthly progress based on % completion" },
    { id: "tm", name: "Time & Materials", description: "Labor hours and material costs" },
    { id: "milestone", name: "Milestone", description: "Fixed payments at project milestones" },
    { id: "materials", name: "Materials Stored", description: "Materials delivered but not installed" },
    { id: "final", name: "Final Invoice", description: "Project completion and final payment" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Select Invoice Template</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
            <h4 className="font-medium text-foreground">{template.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeaderStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Invoice Header Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Project</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="turner-x">Turner Project X Plaza</SelectItem>
                <SelectItem value="skanska">Skanska Downtown</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Invoice Number</label>
            <Input placeholder="INV-0143" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Invoice Period From</label>
            <Input type="date" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">General Contractor</label>
            <Input value="Turner Construction" disabled />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">PO/Reference Number</label>
            <Input placeholder="PO-2024-003" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Invoice Period To</label>
            <Input type="date" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LineItemsStep() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Line Items</h3>
      <div className="border border-border rounded-lg p-4">
        <p className="text-muted-foreground">Line item management interface would be implemented here with dynamic rows for SOV items, quantities, and pricing.</p>
      </div>
    </div>
  );
}

function DocumentsStep() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Required Documents</h3>
      <div className="border border-border rounded-lg p-4">
        <p className="text-muted-foreground">Document upload and management interface for lien waivers, COI, delivery tickets, etc.</p>
      </div>
    </div>
  );
}

function ReviewStep() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Review & Submit</h3>
      <div className="border border-border rounded-lg p-4">
        <p className="text-muted-foreground">Final review with AI validation, compliance checks, and submission confirmation.</p>
      </div>
    </div>
  );
}