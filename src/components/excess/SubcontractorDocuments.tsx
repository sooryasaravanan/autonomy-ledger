import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit,
  Trash2,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Camera,
  Mail,
  Link2,
  Plus,
  Folder,
  Shield
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SubcontractorDocuments() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const documentCategories = [
    { id: "delivery", name: "Delivery Tickets", count: 24, icon: FileText },
    { id: "waivers", name: "Lien Waivers", count: 8, icon: Shield },
    { id: "insurance", name: "Insurance", count: 3, icon: Shield },
    { id: "licenses", name: "Licenses", count: 2, icon: CheckCircle },
    { id: "w9", name: "W-9 Forms", count: 1, icon: FileText },
    { id: "payroll", name: "Certified Payroll", count: 12, icon: Calendar },
    { id: "safety", name: "Safety Docs", count: 6, icon: AlertTriangle }
  ];

  const documents = [
    {
      id: "doc-001",
      name: "Delivery Ticket #DT-2024-089",
      category: "delivery",
      project: "Turner Project X",
      date: "Aug 22, 2024",
      size: "2.4 MB",
      type: "PDF",
      status: "linked",
      linkedTo: "INV-0142",
      expiry: null
    },
    {
      id: "doc-002", 
      name: "General Liability COI",
      category: "insurance",
      project: "All Projects",
      date: "Jan 15, 2024",
      size: "1.8 MB", 
      type: "PDF",
      status: "active",
      linkedTo: null,
      expiry: "Dec 31, 2024"
    },
    {
      id: "doc-003",
      name: "Conditional Lien Waiver",
      category: "waivers",
      project: "Turner Project X", 
      date: "Aug 20, 2024",
      size: "892 KB",
      type: "PDF",
      status: "signed",
      linkedTo: "INV-0141",
      expiry: null
    },
    {
      id: "doc-004",
      name: "C-10 Electrical License",
      category: "licenses",
      project: "All Projects",
      date: "Oct 12, 2023",
      size: "1.2 MB",
      type: "PDF", 
      status: "expiring",
      linkedTo: null,
      expiry: "Oct 12, 2024"
    },
    {
      id: "doc-005",
      name: "Workers Comp COI",
      category: "insurance", 
      project: "All Projects",
      date: "Mar 1, 2024",
      size: "1.6 MB",
      type: "PDF",
      status: "warning",
      linkedTo: null,
      expiry: "Sep 15, 2024"
    }
  ];

  const getStatusBadge = (status: string, expiry?: string | null) => {
    if (expiry) {
      const expiryDate = new Date(expiry);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24));
      
      if (daysUntilExpiry < 0) {
        return <Badge variant="destructive">Expired</Badge>;
      } else if (daysUntilExpiry <= 30) {
        return <Badge className="bg-amber-500">Expiring Soon</Badge>;
      }
    }

    switch (status) {
      case "linked":
        return <Badge className="bg-blue-500">Linked</Badge>;
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "signed":
        return <Badge className="bg-green-500">Signed</Badge>;
      case "expiring":
        return <Badge className="bg-amber-500">Expiring</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredDocuments = selectedTab === "all" 
    ? documents 
    : documents.filter(doc => doc.category === selectedTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Manage your project documents and compliance files</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Scan Document
          </Button>
          <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Folder className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-xl font-bold text-foreground">{documents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-xl font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Link2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Linked to Invoices</p>
                <p className="text-xl font-bold text-foreground">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Email Captured</p>
                <p className="text-xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search documents..." className="pl-10" />
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expiring">Expiring</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Categories Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="all">All</TabsTrigger>
          {documentCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name.split(' ')[0]}
              <Badge variant="outline" className="ml-1 h-4 text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {/* Bulk Actions */}
          {selectedDocs.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedDocs.length} document(s) selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download ZIP
                    </Button>
                    <Button variant="outline" size="sm">
                      <Link2 className="w-4 h-4 mr-2" />
                      Link to Invoice
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {selectedTab === "all" ? "All Documents" : documentCategories.find(c => c.id === selectedTab)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedDocs.includes(doc.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDocs([...selectedDocs, doc.id]);
                            } else {
                              setSelectedDocs(selectedDocs.filter(id => id !== doc.id));
                            }
                          }}
                          className="rounded"
                        />
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-foreground">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.project}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(doc.status, doc.expiry)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              •••
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Replace
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link2 className="w-4 h-4 mr-2" />
                              Link to Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-medium text-foreground">{doc.date}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Size</p>
                        <p className="font-medium text-foreground">{doc.size}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-medium text-foreground">{doc.type}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Linked To</p>
                        <p className="font-medium text-foreground">{doc.linkedTo || "—"}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p className="font-medium text-foreground">{doc.expiry || "—"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Capture Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Capture Queue
            <Badge variant="outline">3 new</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg bg-accent/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">Delivery Ticket - Material Drop</h4>
                  <p className="text-sm text-muted-foreground">From: supplier@acmesupply.com • Aug 24, 2024</p>
                </div>
                <Badge className="bg-blue-500">Auto-Detected</Badge>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Vendor</p>
                  <p className="font-medium text-foreground">ACME Supply Co.</p>
                </div>
                <div>
                  <p className="text-muted-foreground">PO Number</p>
                  <p className="font-medium text-foreground">PO-2024-003</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Quantity</p>
                  <p className="font-medium text-foreground">240 units</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="font-medium text-green-600">95%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm">Create Invoice Line</Button>
                <Button variant="outline" size="sm">Attach to Existing</Button>
                <Button variant="ghost" size="sm">Discard</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}