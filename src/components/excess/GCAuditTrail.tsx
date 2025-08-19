import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Link2,
  Clock,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Building,
  DollarSign,
  ArrowRight,
  Hash
} from "lucide-react";

export default function GCAuditTrail() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedAction, setSelectedAction] = useState("all");

  const auditEvents = [
    {
      id: "audit-001",
      timestamp: "2024-08-24 14:30:15 UTC",
      actor: "John Martinez (PM)",
      action: "invoice_approved",
      resource: "SUB-INV-445",
      description: "Invoice approved for $85,400 from ABC Electric Co.",
      blockchainHash: "0x7d4a2b8c9e1f3a5b7d9e2c4f6a8b0d2e4f6a8c0e2f4a6b8d0c2e4f6a8b0d2e4f",
      transactionId: "TXN-240824-001", 
      project: "Plaza Tower",
      previousState: "under_review",
      newState: "approved",
      ipAddress: "192.168.1.45",
      metadata: {
        amount: 85400,
        retainage: 4270,
        approvalMethod: "manual"
      }
    },
    {
      id: "audit-002",
      timestamp: "2024-08-24 14:25:08 UTC",
      actor: "AI Compliance Agent",
      action: "compliance_check",
      resource: "SUB-INV-445",
      description: "Automated compliance validation completed",
      blockchainHash: "0x6c3a1b7d8e0f2a4b6c8d1e3f5a7b9d1e3f5a7c9e1f3a5b7d9e1c3f5a7b9d1e3f",
      transactionId: "TXN-240824-002",
      project: "Plaza Tower",
      previousState: "submitted",
      newState: "under_review",
      ipAddress: "10.0.0.1",
      metadata: {
        validationScore: 92,
        flagsFound: 1,
        checksPerformed: ["insurance", "waivers", "licenses"]
      }
    },
    {
      id: "audit-003",
      timestamp: "2024-08-24 13:45:22 UTC",
      actor: "Mike Johnson (ABC Electric)",
      action: "invoice_submitted",
      resource: "SUB-INV-445",
      description: "Invoice submitted for August progress billing",
      blockchainHash: "0x5b2a0c6d7e9f1a3b5c7d0e2f4a6b8d0e2f4a6c8e0f2a4b6d8e0c2f4a6b8d0e2f",
      transactionId: "TXN-240824-003",
      project: "Plaza Tower",
      previousState: "draft",
      newState: "submitted",
      ipAddress: "203.45.67.89",
      metadata: {
        submissionMethod: "portal",
        documentsAttached: 8
      }
    },
    {
      id: "audit-004",
      timestamp: "2024-08-24 10:15:33 UTC",
      actor: "Sarah Chen (Controller)",
      action: "payment_scheduled",
      resource: "SUB-INV-447",
      description: "Payment scheduled for $68,900 to HVAC Solutions Inc.",
      blockchainHash: "0x4a1b9c5d6e8f0a2b4c6d9e1f3a5b7d9e1f3a5c7e9f1a3b5d7e9c1f3a5b7d9e1f",
      transactionId: "TXN-240824-004",
      project: "Office Renovation",
      previousState: "approved",
      newState: "scheduled",
      ipAddress: "192.168.1.52",
      metadata: {
        paymentDate: "2024-09-03",
        paymentMethod: "ACH",
        netAmount: 65455
      }
    },
    {
      id: "audit-005",
      timestamp: "2024-08-23 16:20:17 UTC",
      actor: "System",
      action: "payapp_generated",
      resource: "PAY-APP-008",
      description: "Pay application generated for Plaza Tower - August 2024",
      blockchainHash: "0x3a0b8c4d5e7f9a1b3c5d8e0f2a4b6d8e0f2a4c6e8f0a2b4d6e8c0f2a4b6d8e0f",
      transactionId: "TXN-240823-001",
      project: "Plaza Tower",
      previousState: "draft",
      newState: "generated",
      ipAddress: "10.0.0.1",
      metadata: {
        totalAmount: 850000,
        invoicesIncluded: 8,
        gcMarkup: 65000
      }
    },
    {
      id: "audit-006",
      timestamp: "2024-08-23 11:30:45 UTC",
      actor: "Risk Detection Agent",
      action: "anomaly_detected",
      resource: "SUB-INV-446",
      description: "Potential duplicate invoice detected",
      blockchainHash: "0x2a9b7c3d4e6f8a0b2c4d7e9f1a3b5d7e9f1a3c5e7f9a1b3d5e7c9f1a3b5d7e9f",
      transactionId: "TXN-240823-002",
      project: "Downtown Retail",
      previousState: "submitted",
      newState: "flagged",
      ipAddress: "10.0.0.2",
      metadata: {
        anomalyType: "duplicate_risk",
        confidence: 87,
        similarInvoice: "SUB-INV-443"
      }
    }
  ];

  const actionTypes = [
    { value: "all", label: "All Actions" },
    { value: "invoice_submitted", label: "Invoice Submitted" },
    { value: "invoice_approved", label: "Invoice Approved" },
    { value: "payment_scheduled", label: "Payment Scheduled" },
    { value: "compliance_check", label: "Compliance Check" },
    { value: "anomaly_detected", label: "Anomaly Detected" },
    { value: "payapp_generated", label: "Pay App Generated" }
  ];

  const getActionBadge = (action: string) => {
    switch (action) {
      case "invoice_submitted":
        return <Badge className="bg-blue-500">Submitted</Badge>;
      case "invoice_approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "payment_scheduled":
        return <Badge className="bg-purple-500">Scheduled</Badge>;
      case "compliance_check":
        return <Badge className="bg-amber-500">Compliance</Badge>;
      case "anomaly_detected":
        return <Badge variant="destructive">Anomaly</Badge>;
      case "payapp_generated":
        return <Badge className="bg-teal-500">Generated</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "invoice_submitted":
        return <FileText className="w-4 h-4" />;
      case "invoice_approved":
        return <CheckCircle className="w-4 h-4" />;
      case "payment_scheduled":
        return <DollarSign className="w-4 h-4" />;
      case "compliance_check":
        return <Shield className="w-4 h-4" />;
      case "anomaly_detected":
        return <AlertTriangle className="w-4 h-4" />;
      case "payapp_generated":
        return <Building className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getActorIcon = (actor: string) => {
    if (actor.includes("Agent") || actor === "System") {
      return <Shield className="w-4 h-4 text-purple-500" />;
    } else {
      return <User className="w-4 h-4 text-blue-500" />;
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    if (selectedAction !== "all" && event.action !== selectedAction) return false;
    if (selectedProject !== "all" && event.project !== selectedProject) return false;
    return true;
  });

  const auditStats = {
    totalEvents: auditEvents.length,
    humanActions: auditEvents.filter(e => !e.actor.includes("Agent") && e.actor !== "System").length,
    aiActions: auditEvents.filter(e => e.actor.includes("Agent") || e.actor === "System").length,
    flaggedEvents: auditEvents.filter(e => e.action === "anomaly_detected").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Trail</h1>
          <p className="text-muted-foreground">Immutable blockchain-verified transaction history</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1 day</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="90d">90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Audit Log
          </Button>
        </div>
      </div>

      {/* Audit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold text-foreground">{auditStats.totalEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Human Actions</p>
                <p className="text-2xl font-bold text-foreground">{auditStats.humanActions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">AI Actions</p>
                <p className="text-2xl font-bold text-foreground">{auditStats.aiActions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Flagged Events</p>
                <p className="text-2xl font-bold text-foreground">{auditStats.flaggedEvents}</p>
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
              <Input placeholder="Search audit logs..." className="pl-10" />
            </div>
            
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="Plaza Tower">Plaza Tower</SelectItem>
                <SelectItem value="Downtown Retail">Downtown Retail</SelectItem>
                <SelectItem value="Office Renovation">Office Renovation</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedAction} onValueChange={setSelectedAction}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Audit Events
            <Badge variant="outline">{filteredEvents.length} events</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-accent rounded-lg">
                      {getActionIcon(event.action)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getActionBadge(event.action)}
                        <Badge variant="outline" className="text-xs">{event.project}</Badge>
                      </div>
                      <h4 className="font-medium text-foreground">{event.description}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {getActorIcon(event.actor)}
                        <span className="text-sm text-muted-foreground">{event.actor}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{event.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{event.resource}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.previousState} → {event.newState}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Transaction ID</p>
                    <p className="font-mono text-foreground">{event.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">IP Address</p>
                    <p className="font-mono text-foreground">{event.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Blockchain Hash</p>
                    <p className="font-mono text-foreground text-xs">
                      {event.blockchainHash.substring(0, 20)}...
                    </p>
                  </div>
                </div>
                
                {event.metadata && (
                  <div className="mb-3 p-3 bg-accent/50 rounded border">
                    <p className="text-sm font-medium text-foreground mb-2">Event Metadata:</p>
                    <div className="text-xs text-muted-foreground font-mono">
                      {JSON.stringify(event.metadata, null, 2)}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link2 className="w-4 h-4 mr-2" />
                    Verify on Blockchain
                  </Button>
                  <Button variant="outline" size="sm">
                    <Hash className="w-4 h-4 mr-2" />
                    Compare Hash
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Verification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Blockchain Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Integrity Verification</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm text-muted-foreground">Chain Consistency</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm text-muted-foreground">Hash Validation</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm text-muted-foreground">Timestamp Integrity</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Network Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm text-muted-foreground">Network Health</span>
                  <Badge className="bg-green-500">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm text-muted-foreground">Last Block</span>
                  <span className="text-sm font-mono text-foreground">2 minutes ago</span>
                </div>
                <div className="flex items-center justify-between p-2 border border-border rounded">
                  <span className="text-sm text-muted-foreground">Confirmations</span>
                  <span className="text-sm font-mono text-foreground">6/6</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-2">
            <Button className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Verification Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              View Block Explorer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}