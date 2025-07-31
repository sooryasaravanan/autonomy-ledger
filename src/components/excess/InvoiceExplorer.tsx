import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  Calendar,
  Building,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Upload,
  SortAsc,
  SortDesc
} from "lucide-react";

const invoices = [
  {
    id: "INV-1234",
    vendor: "Summit Electrical",
    project: "Building A - Phase 2", 
    amount: 12450.00,
    status: "flagged",
    flagReason: "Missing lien waiver",
    submittedDate: "2024-01-31",
    dueDate: "2024-02-14",
    approver: "Sarah Johnson",
    description: "Electrical wiring for floors 3-5",
    documents: ["invoice.pdf", "lien_waiver.pdf"],
    priority: "high"
  },
  {
    id: "INV-1235",
    vendor: "Apex Concrete",
    project: "Foundation Works",
    amount: 8750.00,
    status: "approved",
    flagReason: null,
    submittedDate: "2024-01-30", 
    dueDate: "2024-02-13",
    approver: "Mike Chen",
    description: "Concrete pouring for foundation phase 2",
    documents: ["invoice.pdf", "delivery_receipt.pdf"],
    priority: "medium"
  },
  {
    id: "INV-1236",
    vendor: "ProTech Solutions",
    project: "IT Infrastructure Upgrade",
    amount: 3200.00,
    status: "pending",
    flagReason: null,
    submittedDate: "2024-01-29",
    dueDate: "2024-02-12", 
    approver: "Alex Rodriguez",
    description: "Network equipment and installation",
    documents: ["invoice.pdf"],
    priority: "low"
  },
  {
    id: "INV-1237",
    vendor: "Steel Fabricators Inc",
    project: "Building A - Phase 2",
    amount: 24500.00,
    status: "approved",
    flagReason: null,
    submittedDate: "2024-01-28",
    dueDate: "2024-02-11",
    approver: "Sarah Johnson",
    description: "Structural steel for building frame",
    documents: ["invoice.pdf", "materials_cert.pdf", "delivery_receipt.pdf"],
    priority: "high"
  },
  {
    id: "INV-1238",
    vendor: "Green Landscaping",
    project: "Parking Garage Expansion", 
    amount: 5600.00,
    status: "processing",
    flagReason: null,
    submittedDate: "2024-01-27",
    dueDate: "2024-02-10",
    approver: "Lisa Wang",
    description: "Landscape design and installation",
    documents: ["invoice.pdf", "design_plans.pdf"],
    priority: "low"
  }
];

export default function InvoiceExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [projectFilter, setProjectFilter] = useState("all");
  const [sortBy, setSortBy] = useState("submittedDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-status-approved";
      case "flagged": return "text-status-flagged"; 
      case "pending": return "text-status-pending";
      case "processing": return "text-accent";
      default: return "text-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "flagged": return "destructive";
      case "pending": return "secondary";
      case "processing": return "outline";
      default: return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-status-flagged";
      case "medium": return "text-status-pending";
      case "low": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  const filteredInvoices = invoices
    .filter(invoice => {
      const matchesSearch = invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           invoice.project.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      const matchesProject = projectFilter === "all" || invoice.project === projectFilter;
      return matchesSearch && matchesStatus && matchesProject;
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      const modifier = sortOrder === "asc" ? 1 : -1;
      if (aValue < bValue) return -1 * modifier;
      if (aValue > bValue) return 1 * modifier;
      return 0;
    });

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
    }
  };

  const projects = [...new Set(invoices.map(invoice => invoice.project))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Invoice Explorer</h2>
          <p className="text-muted-foreground">Manage and track invoice processing status</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Button variant="ai" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices, vendors, or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-border"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-white border-border">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-border shadow-lg z-50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-48 bg-white border-border">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent className="bg-white border-border shadow-lg z-50">
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project} value={project}>{project}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-white border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white border-border shadow-lg z-50">
                  <SelectItem value="submittedDate">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedInvoices.length > 0 && (
        <Card className="border-accent bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  {selectedInvoices.length} invoice{selectedInvoices.length > 1 ? 's' : ''} selected
                </span>
                <Button variant="outline" size="sm" onClick={() => setSelectedInvoices([])}>
                  Clear Selection
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ai" size="sm">
                  <CheckCircle className="w-4 h-4" />
                  Bulk Approve
                </Button>
                <Button variant="neural" size="sm">
                  <Download className="w-4 h-4" />
                  Export Selected
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                  Bulk Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredInvoices.length} of {invoices.length} invoices
        </p>
        <div className="flex gap-1">
          <Button
            variant={viewMode === "grid" ? "ai" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "ai" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
          >
            Table
          </Button>
        </div>
      </div>

      {/* Invoice Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="border-border hover:shadow-card transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => handleSelectInvoice(invoice.id)}
                    />
                    <div>
                      <CardTitle className="text-base font-mono">{invoice.id}</CardTitle>
                      <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusBadge(invoice.status)} className="text-xs">
                    {invoice.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    ${invoice.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{invoice.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <Building className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{invoice.project}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Approver: {invoice.approver}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Due: {invoice.dueDate}</span>
                  </div>
                </div>

                {invoice.flagReason && (
                  <div className="p-2 rounded bg-status-flagged/10 border border-status-flagged/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-status-flagged" />
                      <span className="text-xs text-status-flagged">{invoice.flagReason}</span>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {invoice.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                  <div className={`text-xs font-medium ${getPriorityColor(invoice.priority)}`}>
                    {invoice.priority} priority
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ai" size="sm" className="flex-1">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="neural" size="sm" className="flex-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Invoice Table */}
      {viewMode === "table" && (
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="text-left p-4">
                      <Checkbox
                        checked={selectedInvoices.length === filteredInvoices.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vendor</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Project</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Due Date</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedInvoices.includes(invoice.id)}
                          onCheckedChange={() => handleSelectInvoice(invoice.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div>
                          <Badge variant="outline" className="text-xs font-mono">
                            {invoice.id}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{invoice.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-foreground">{invoice.vendor}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-foreground">{invoice.project}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm font-medium text-foreground">
                          ${invoice.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <Badge variant={getStatusBadge(invoice.status)} className="text-xs">
                            {invoice.status}
                          </Badge>
                          {invoice.flagReason && (
                            <p className="text-xs text-status-flagged">{invoice.flagReason}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">{invoice.dueDate}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <Button variant="neural" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}