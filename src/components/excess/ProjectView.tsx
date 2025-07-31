import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  DollarSign, 
  FileText, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Filter,
  Calendar,
  Search
} from "lucide-react";

const projects = [
  {
    id: "PROJ-001",
    name: "Building A - Phase 2",
    manager: "Sarah Johnson",
    budget: 2450000,
    invoicesTotal: 1847500,
    invoicesCount: 47,
    pendingCount: 8,
    flaggedCount: 2,
    completionRate: 75,
    status: "active",
    dueDate: "2024-03-15"
  },
  {
    id: "PROJ-002", 
    name: "Foundation Works",
    manager: "Mike Chen",
    budget: 890000,
    invoicesTotal: 234500,
    invoicesCount: 12,
    pendingCount: 3,
    flaggedCount: 0,
    completionRate: 26,
    status: "active",
    dueDate: "2024-04-30"
  },
  {
    id: "PROJ-003",
    name: "IT Infrastructure Upgrade",
    manager: "Alex Rodriguez",
    budget: 125000,
    invoicesTotal: 98750,
    invoicesCount: 24,
    pendingCount: 1,
    flaggedCount: 1,
    completionRate: 79,
    status: "active",
    dueDate: "2024-02-28"
  },
  {
    id: "PROJ-004",
    name: "Parking Garage Expansion",
    manager: "Lisa Wang",
    budget: 1200000,
    invoicesTotal: 1156000,
    invoicesCount: 67,
    pendingCount: 0,
    flaggedCount: 0,
    completionRate: 96,
    status: "near_completion",
    dueDate: "2024-02-15"
  }
];

const recentInvoices = [
  {
    id: "INV-1234",
    vendor: "Summit Electrical",
    project: "Building A - Phase 2",
    amount: 12450,
    status: "flagged",
    flagReason: "Missing lien waiver",
    submittedDate: "2024-01-31",
    dueDate: "2024-02-14"
  },
  {
    id: "INV-1235",
    vendor: "Apex Concrete", 
    project: "Foundation Works",
    amount: 8750,
    status: "approved",
    flagReason: null,
    submittedDate: "2024-01-30",
    dueDate: "2024-02-13"
  },
  {
    id: "INV-1236",
    vendor: "ProTech Solutions",
    project: "IT Infrastructure Upgrade", 
    amount: 3200,
    status: "pending",
    flagReason: null,
    submittedDate: "2024-01-29",
    dueDate: "2024-02-12"
  }
];

export default function ProjectView() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-status-approved";
      case "flagged": return "text-status-flagged";
      case "pending": return "text-status-pending";
      default: return "text-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "flagged": return "destructive";
      case "pending": return "secondary";
      default: return "outline";
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === "all") return true;
    if (filter === "active") return project.status === "active";
    if (filter === "flagged") return project.flaggedCount > 0;
    if (filter === "pending") return project.pendingCount > 0;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Project View</h2>
          <p className="text-muted-foreground">Invoice status breakdown by project</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button 
              variant={filter === "all" ? "ai" : "outline"} 
              size="sm"
              onClick={() => setFilter("all")}
            >
              All Projects
            </Button>
            <Button 
              variant={filter === "active" ? "ai" : "outline"} 
              size="sm"
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button 
              variant={filter === "flagged" ? "ai" : "outline"} 
              size="sm"
              onClick={() => setFilter("flagged")}
            >
              <AlertTriangle className="w-4 h-4" />
              Has Flags
            </Button>
            <Button 
              variant={filter === "pending" ? "ai" : "outline"} 
              size="sm"
              onClick={() => setFilter("pending")}
            >
              <Clock className="w-4 h-4" />
              Pending
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id}
            className={`border-border cursor-pointer transition-all duration-200 hover:shadow-card
              ${selectedProject === project.id ? 'border-accent shadow-card' : ''}
            `}
            onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">PM: {project.manager}</p>
                  <p className="text-xs text-muted-foreground">Due: {project.dueDate}</p>
                </div>
                <Badge 
                  variant={project.status === "active" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {project.status === "near_completion" ? "Near Completion" : "Active"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Budget Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Budget Progress</span>
                  <span className="text-foreground">{project.completionRate}%</span>
                </div>
                <Progress value={project.completionRate} className="h-2" />
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted-foreground">
                    ${project.invoicesTotal.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground">
                    ${project.budget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-4 h-4 text-accent mr-1" />
                    <span className="text-lg font-semibold text-foreground">
                      {project.invoicesCount}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Total Invoices</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-status-pending mr-1" />
                    <span className="text-lg font-semibold text-foreground">
                      {project.pendingCount}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <AlertTriangle className="w-4 h-4 text-status-flagged mr-1" />
                    <span className="text-lg font-semibold text-foreground">
                      {project.flaggedCount}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Flagged</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="ai" size="sm" className="flex-1">
                  <Building className="w-4 h-4" />
                  View Details
                </Button>
                <Button variant="neural" size="sm" className="flex-1">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Project Invoices */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Recent Project Invoices
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
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
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border hover:bg-muted/20">
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs font-mono">
                        {invoice.id}
                      </Badge>
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
                          Review
                        </Button>
                        {invoice.status === "flagged" && (
                          <Button variant="ai" size="sm">
                            Resolve
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}