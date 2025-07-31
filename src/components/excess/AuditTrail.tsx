import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  Filter,
  Calendar,
  User,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Clock,
  Shield,
  Link as LinkIcon
} from "lucide-react";

const auditLogs = [
  {
    id: "AUD-001",
    timestamp: "2024-01-31 14:32:15",
    agent: "ComplianceAgent",
    action: "Invoice Validation",
    target: "INV-1234",
    result: "FLAGGED",
    reason: "Missing lien waiver",
    blockchainHash: "0x8f2a...3d4e",
    user: "System"
  },
  {
    id: "AUD-002", 
    timestamp: "2024-01-31 14:30:42",
    agent: "ApprovalAgent",
    action: "Escalation Triggered",
    target: "INV-1235",
    result: "ESCALATED",
    reason: "Amount exceeds threshold",
    blockchainHash: "0x7e1b...2c3f",
    user: "System"
  },
  {
    id: "AUD-003",
    timestamp: "2024-01-31 14:28:33", 
    agent: "PaymentAgent",
    action: "Payment Executed",
    target: "INV-1236",
    result: "SUCCESS",
    reason: "ACH transfer completed",
    blockchainHash: "0x9a4c...5b6d",
    user: "System"
  },
  {
    id: "AUD-004",
    timestamp: "2024-01-31 14:25:18",
    agent: "Human",
    action: "Manual Override",
    target: "INV-1237",
    result: "APPROVED",
    reason: "Director approval - emergency payment",
    blockchainHash: "0x6d8e...4a7c",
    user: "john.doe@company.com"
  },
  {
    id: "AUD-005",
    timestamp: "2024-01-31 14:22:51",
    agent: "SupervisorAgent",
    action: "MCP State Update",
    target: "GLOBAL",
    result: "SYNCED",
    reason: "Periodic state synchronization",
    blockchainHash: "0x3f5a...8b9e",
    user: "System"
  }
];

export default function AuditTrail() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [selectedAgent, setSelectedAgent] = useState("all");

  const getStatusColor = (result: string) => {
    switch (result) {
      case "SUCCESS": return "text-status-approved";
      case "FLAGGED": return "text-status-flagged";
      case "ESCALATED": return "text-status-pending";
      case "APPROVED": return "text-accent";
      case "SYNCED": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes("Validation")) return Shield;
    if (action.includes("Escalation")) return AlertTriangle;
    if (action.includes("Payment")) return DollarSign;
    if (action.includes("Override")) return User;
    if (action.includes("MCP")) return LinkIcon;
    return FileText;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Audit Trail</h2>
          <p className="text-muted-foreground">Blockchain-synchronized system activity log</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="ai" size="sm">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Actions</p>
                <p className="text-2xl font-bold text-foreground">2,847</p>
              </div>
              <FileText className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Agent Actions</p>
                <p className="text-2xl font-bold text-foreground">2,643</p>
              </div>
              <Shield className="w-8 h-8 text-agent-compliance" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Human Overrides</p>
                <p className="text-2xl font-bold text-foreground">204</p>
              </div>
              <User className="w-8 h-8 text-status-pending" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blockchain Synced</p>
                <p className="text-2xl font-bold text-status-approved">100%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-status-approved" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex gap-2">
              <Button 
                variant={selectedTimeframe === "today" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("today")}
              >
                Today
              </Button>
              <Button 
                variant={selectedTimeframe === "week" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("week")}
              >
                This Week
              </Button>
              <Button 
                variant={selectedTimeframe === "month" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedTimeframe("month")}
              >
                This Month
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-8" />
            
            <div className="flex gap-2">
              <Button 
                variant={selectedAgent === "all" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedAgent("all")}
              >
                All Agents
              </Button>
              <Button 
                variant={selectedAgent === "compliance" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedAgent("compliance")}
              >
                Compliance
              </Button>
              <Button 
                variant={selectedAgent === "approval" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedAgent("approval")}
              >
                Approval
              </Button>
              <Button 
                variant={selectedAgent === "payment" ? "ai" : "outline"} 
                size="sm"
                onClick={() => setSelectedAgent("payment")}
              >
                Payment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Timestamp</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Agent/User</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Target</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Result</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Reason</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Blockchain</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, index) => {
                  const IconComponent = getActionIcon(log.action);
                  return (
                    <tr key={log.id} className="border-b border-border hover:bg-muted/20">
                      <td className="p-4">
                        <div className="text-sm text-foreground font-mono">{log.timestamp}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4 text-accent" />
                          <span className="text-sm text-foreground">{log.agent}</span>
                        </div>
                        {log.user !== "System" && (
                          <div className="text-xs text-muted-foreground mt-1">{log.user}</div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-foreground">{log.action}</span>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="text-xs">
                          {log.target}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge 
                          variant={log.result === "SUCCESS" ? "default" : "outline"} 
                          className={`text-xs ${getStatusColor(log.result)}`}
                        >
                          {log.result}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-muted-foreground">{log.reason}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{log.blockchainHash}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <LinkIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}