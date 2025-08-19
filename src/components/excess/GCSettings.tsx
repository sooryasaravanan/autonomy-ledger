import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Users, 
  Building, 
  DollarSign, 
  Shield,
  Zap,
  Bell,
  Mail,
  Smartphone,
  Plus,
  Edit,
  Trash2,
  Save,
  RefreshCw,
  Key,
  Link2
} from "lucide-react";

export default function GCSettings() {
  const [selectedTab, setSelectedTab] = useState("routing");

  const approvalRules = [
    {
      id: "rule-001",
      name: "PM Approval Threshold",
      condition: "Invoice amount ≤ $25,000",
      approver: "Project Manager",
      autoApprove: false,
      active: true
    },
    {
      id: "rule-002", 
      name: "Controller Approval",
      condition: "Invoice amount ≤ $100,000",
      approver: "Controller",
      autoApprove: false,
      active: true
    },
    {
      id: "rule-003",
      name: "High Confidence Auto-Approval",
      condition: "AI Score > 95% AND Amount < $10,000",
      approver: "System",
      autoApprove: true,
      active: true
    },
    {
      id: "rule-004",
      name: "Compliance Flag Auto-Reject",
      condition: "Missing required documents",
      approver: "System",
      autoApprove: false,
      active: true
    }
  ];

  const userRoles = [
    {
      id: "user-001",
      name: "John Martinez",
      email: "john.martinez@gc.com",
      role: "Project Manager",
      projects: ["Plaza Tower", "Downtown Retail"],
      permissions: ["approve_invoices", "view_compliance", "message_subs"],
      active: true,
      lastLogin: "2 hours ago"
    },
    {
      id: "user-002",
      name: "Sarah Chen",
      email: "sarah.chen@gc.com", 
      role: "Controller",
      projects: ["All Projects"],
      permissions: ["approve_invoices", "schedule_payments", "view_audit"],
      active: true,
      lastLogin: "1 day ago"
    },
    {
      id: "user-003",
      name: "Michael Roberts",
      email: "michael.roberts@gc.com",
      role: "CFO",
      projects: ["All Projects"],
      permissions: ["all_permissions"],
      active: true,
      lastLogin: "3 hours ago"
    }
  ];

  const integrations = [
    {
      id: "quickbooks",
      name: "QuickBooks",
      type: "Accounting",
      status: "connected",
      lastSync: "2 hours ago",
      description: "Sync approved invoices and payments"
    },
    {
      id: "procore",
      name: "Procore",
      type: "Project Management",
      status: "connected",
      lastSync: "1 hour ago", 
      description: "Import project data and SOVs"
    },
    {
      id: "sage",
      name: "Sage Construction",
      type: "ERP",
      status: "disconnected",
      lastSync: "Never",
      description: "Full ERP integration for financials"
    },
    {
      id: "stripe",
      name: "Stripe",
      type: "Payments",
      status: "connected",
      lastSync: "30 minutes ago",
      description: "Process electronic payments"
    },
    {
      id: "textura",
      name: "Textura",
      type: "Payments",
      status: "pending",
      lastSync: "Configuring",
      description: "Construction payment platform"
    }
  ];

  const projectPolicies = [
    {
      id: "policy-001",
      project: "Plaza Tower",
      retainageRate: 5,
      lienWaiverRequired: true,
      insuranceMinimum: 2000000,
      materialsBillingCap: 50,
      payrollReporting: true
    },
    {
      id: "policy-002",
      project: "Downtown Retail", 
      retainageRate: 5,
      lienWaiverRequired: true,
      insuranceMinimum: 1000000,
      materialsBillingCap: 40,
      payrollReporting: false
    },
    {
      id: "policy-003",
      project: "Office Renovation",
      retainageRate: 10,
      lienWaiverRequired: true,
      insuranceMinimum: 1500000,
      materialsBillingCap: 30,
      payrollReporting: true
    }
  ];

  const notificationSettings = {
    email: {
      invoiceSubmitted: true,
      approvalRequired: true,
      paymentScheduled: true,
      complianceAlerts: true,
      riskDetected: true
    },
    sms: {
      urgentAlerts: true,
      paymentFailures: true,
      systemDown: true
    },
    inApp: {
      allNotifications: true,
      realTimeUpdates: true
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500">Connected</Badge>;
      case "disconnected":
        return <Badge variant="destructive">Disconnected</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "CFO":
        return <Badge className="bg-purple-500">CFO</Badge>;
      case "Controller":
        return <Badge className="bg-blue-500">Controller</Badge>;
      case "Project Manager":
        return <Badge className="bg-green-500">PM</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure routing rules, user roles, and integrations</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync All
          </Button>
          <Button className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="routing">Routing Rules</TabsTrigger>
          <TabsTrigger value="users">User Roles</TabsTrigger>
          <TabsTrigger value="projects">Project Policies</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="routing" className="space-y-6">
          {/* Approval Routing Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Approval Routing Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approvalRules.map((rule) => (
                  <div key={rule.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.condition}</p>
                        <p className="text-sm text-muted-foreground">Approver: {rule.approver}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {rule.autoApprove && <Badge className="bg-blue-500">Auto</Badge>}
                        <Switch checked={rule.active} />
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Rule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Escalation Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Escalation & Delegation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Auto-escalate after (hours)
                    </label>
                    <Input type="number" defaultValue="24" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Urgent escalation threshold
                    </label>
                    <Select defaultValue="100000">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50000">$50,000</SelectItem>
                        <SelectItem value="100000">$100,000</SelectItem>
                        <SelectItem value="250000">$250,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-foreground">Enable weekend escalation</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-foreground">Send escalation notifications</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Roles & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userRoles.map((user) => (
                  <div key={user.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {getRoleBadge(user.role)}
                            <Badge variant="outline" className="text-xs">
                              {user.projects.length === 1 && user.projects[0] === "All Projects" 
                                ? "All Projects" 
                                : `${user.projects.length} projects`}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Switch checked={user.active} />
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Last Login</p>
                        <p className="font-medium text-foreground">{user.lastLogin}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Permissions</p>
                        <p className="font-medium text-foreground">{user.permissions.length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Projects Access</p>
                        <p className="font-medium text-foreground">
                          {user.projects.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Invite New User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {/* Project Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Project Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectPolicies.map((policy) => (
                  <div key={policy.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-medium text-foreground">{policy.project}</h4>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Policy
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Retainage Rate</p>
                        <p className="font-medium text-foreground">{policy.retainageRate}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Insurance Minimum</p>
                        <p className="font-medium text-foreground">${policy.insuranceMinimum.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Materials Cap</p>
                        <p className="font-medium text-foreground">{policy.materialsBillingCap}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Lien Waivers</p>
                        <p className="font-medium text-foreground">
                          {policy.lienWaiverRequired ? "Required" : "Optional"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payroll Reporting</p>
                        <p className="font-medium text-foreground">
                          {policy.payrollReporting ? "Required" : "Not Required"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          {/* Integrations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                System Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{integration.name}</h4>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(integration.status)}
                          <Badge variant="outline" className="text-xs">{integration.type}</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {integration.status === "connected" ? (
                          <>
                            <Button variant="outline" size="sm">
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button size="sm">
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-muted-foreground">
                        Last sync: {integration.lastSync}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                API Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    API Base URL
                  </label>
                  <Input defaultValue="https://api.excess.com/v1" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Webhook URL
                  </label>
                  <Input defaultValue="https://gc.company.com/webhooks/excess" />
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-foreground">Enable API rate limiting</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <span className="text-sm text-foreground">Log API requests</span>
                </div>
                
                <Button variant="outline">
                  Generate New API Key
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <Switch checked={value} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    SMS Notifications
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.sms).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <Switch checked={value} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    In-App Notifications
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(notificationSettings.inApp).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <Switch checked={value} />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Notification Email
                      </label>
                      <Input defaultValue="notifications@gc.company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        SMS Number
                      </label>
                      <Input defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}