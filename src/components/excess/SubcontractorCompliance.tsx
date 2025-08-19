import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  Upload, 
  Download,
  Calendar,
  AlertCircle,
  Building,
  Users,
  DollarSign,
  Briefcase,
  RefreshCw,
  Eye
} from "lucide-react";

export default function SubcontractorCompliance() {
  const [selectedProject, setSelectedProject] = useState("turner-x");

  const projects = [
    {
      id: "turner-x",
      name: "Turner Project X Plaza",
      gc: "Turner Construction",
      status: "active",
      complianceScore: 85,
      issues: 2,
      requirements: 12
    },
    {
      id: "skanska",
      name: "Skanska Downtown",
      gc: "Skanska USA",
      status: "active", 
      complianceScore: 92,
      issues: 1,
      requirements: 10
    }
  ];

  const complianceCategories = [
    {
      id: "insurance",
      name: "Insurance & Bonding",
      status: "warning",
      score: 75,
      items: [
        { name: "General Liability", status: "good", expiry: "Dec 31, 2024", required: true },
        { name: "Workers Compensation", status: "warning", expiry: "Sep 15, 2024", required: true },
        { name: "Auto Liability", status: "good", expiry: "Nov 30, 2024", required: true },
        { name: "Performance Bond", status: "missing", expiry: null, required: false }
      ]
    },
    {
      id: "licenses",
      name: "Licenses & Certifications",
      status: "critical",
      score: 60,
      items: [
        { name: "C-10 Electrical License", status: "expired", expiry: "Aug 30, 2024", required: true },
        { name: "Business License", status: "good", expiry: "Dec 31, 2024", required: true },
        { name: "OSHA 30 Certification", status: "good", expiry: "Jan 15, 2025", required: true }
      ]
    },
    {
      id: "tax",
      name: "Tax & Financial",
      status: "good",
      score: 100,
      items: [
        { name: "W-9 Form", status: "good", expiry: "Current", required: true },
        { name: "State Tax ID", status: "good", expiry: "Current", required: true },
        { name: "Banking Information", status: "good", expiry: "Current", required: true }
      ]
    },
    {
      id: "safety", 
      name: "Safety & Training",
      status: "good",
      score: 90,
      items: [
        { name: "Safety Training Records", status: "good", expiry: "Mar 1, 2025", required: true },
        { name: "Drug Testing Policy", status: "good", expiry: "Current", required: true },
        { name: "Emergency Action Plan", status: "warning", expiry: "Sep 30, 2024", required: false }
      ]
    }
  ];

  const gcRequirements = [
    {
      category: "Retainage",
      rule: "5% retention on all progress payments",
      status: "compliant",
      note: "Standard retention rate applied"
    },
    {
      category: "Lien Waivers",
      rule: "Conditional waiver required with each invoice",
      status: "compliant", 
      note: "Auto-generated for all submissions"
    },
    {
      category: "Materials Storage",
      rule: "50% max stored materials billing",
      status: "compliant",
      note: "Currently at 35% of contract value"
    },
    {
      category: "Payroll Reporting",
      rule: "Certified payroll for prevailing wage work",
      status: "warning",
      note: "Missing reports for Aug 15-22 period"
    },
    {
      category: "Insurance Minimums",
      rule: "$2M General Liability, $1M Workers Comp",
      status: "compliant",
      note: "Coverage meets requirements"
    }
  ];

  const upcomingDeadlines = [
    {
      item: "Workers Comp Renewal",
      date: "Sep 15, 2024",
      daysLeft: 12,
      priority: "high",
      action: "Contact insurance agent"
    },
    {
      item: "C-10 License Renewal", 
      date: "Aug 30, 2024",
      daysLeft: -3,
      priority: "critical",
      action: "File renewal immediately"
    },
    {
      item: "Safety Training Update",
      date: "Sep 30, 2024",
      daysLeft: 27,
      priority: "medium",
      action: "Schedule training session"
    },
    {
      item: "Certified Payroll Due",
      date: "Aug 28, 2024",
      daysLeft: 1,
      priority: "high", 
      action: "Submit missing reports"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "critical":
      case "expired":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "missing":
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
      case "compliant":
        return <Badge className="bg-green-500">Good</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "critical":
      case "expired":
        return <Badge variant="destructive">Critical</Badge>;
      case "missing":
        return <Badge variant="outline">Missing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Center</h1>
          <p className="text-muted-foreground">Monitor compliance requirements and maintain project eligibility</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync Requirements
          </Button>
          <Button className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Project Selector */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Project Compliance</h3>
            <div className="flex items-center gap-3">
              {projects.map((project) => (
                <Button
                  key={project.id}
                  variant={selectedProject === project.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedProject(project.id)}
                >
                  {project.name}
                </Button>
              ))}
            </div>
          </div>
          
          {selectedProjectData && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Building className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Project</p>
                  <p className="font-medium text-foreground">{selectedProjectData.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                  <p className="font-medium text-foreground">{selectedProjectData.complianceScore}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-amber-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Issues</p>
                  <p className="font-medium text-foreground">{selectedProjectData.issues}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Requirements</p>
                  <p className="font-medium text-foreground">{selectedProjectData.requirements}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Overall Compliance Health */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {complianceCategories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-foreground">{category.name}</h4>
                {getStatusIcon(category.status)}
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Compliance</span>
                    <span className="text-sm font-medium text-foreground">{category.score}%</span>
                  </div>
                  <Progress value={category.score} className="h-2" />
                </div>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.name}</span>
                      {getStatusIcon(item.status)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Compliance Tracking */}
      <Tabs defaultValue="requirements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requirements">GC Requirements</TabsTrigger>
          <TabsTrigger value="deadlines">Upcoming Deadlines</TabsTrigger>
          <TabsTrigger value="documents">Document Status</TabsTrigger>
        </TabsList>

        <TabsContent value="requirements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                GC Policy Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gcRequirements.map((req, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{req.category}</h4>
                        <p className="text-sm text-muted-foreground">{req.rule}</p>
                      </div>
                      {getStatusBadge(req.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{req.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deadlines">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground">{deadline.item}</h4>
                        <p className="text-sm text-muted-foreground">Due: {deadline.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          deadline.priority === "critical" ? "destructive" :
                          deadline.priority === "high" ? "secondary" :
                          "outline"
                        }>
                          {deadline.daysLeft < 0 ? `${Math.abs(deadline.daysLeft)} days overdue` :
                           deadline.daysLeft === 0 ? "Due today" :
                           `${deadline.daysLeft} days left`}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{deadline.priority} priority</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{deadline.action}</p>
                      <Button size="sm" variant={deadline.priority === "critical" ? "destructive" : "outline"}>
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Status by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {complianceCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-foreground">{category.name}</h4>
                      {getStatusBadge(category.status)}
                    </div>
                    <div className="space-y-2">
                      {category.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(item.status)}
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.expiry ? `Expires: ${item.expiry}` : "No expiration"}
                                {item.required && " • Required"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Required Actions
            <Badge variant="destructive">2 urgent</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-red-900">Renew C-10 Electrical License</h4>
                  <p className="text-sm text-red-700">License expired 3 days ago. Cannot invoice until renewed.</p>
                </div>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Renew License
              </Button>
            </div>
            
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-amber-900">Submit Missing Payroll Reports</h4>
                  <p className="text-sm text-amber-700">Certified payroll due for Aug 15-22 period.</p>
                </div>
                <Badge className="bg-amber-500">High</Badge>
              </div>
              <Button size="sm" variant="outline">
                Upload Reports
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}