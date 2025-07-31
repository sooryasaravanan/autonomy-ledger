import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertCircle,
  Plus,
  RefreshCw,
  Building,
  CreditCard,
  Database,
  Receipt
} from "lucide-react";

const integrations = [
  {
    id: "procore",
    name: "Procore",
    description: "Construction project management and document control",
    status: "connected",
    icon: Building,
    color: "text-accent",
    lastSync: "5 minutes ago",
    features: ["Project sync", "Document sharing", "Invoice routing"],
    apiVersion: "v3.2"
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Accounting and financial management integration",
    status: "connected", 
    icon: Receipt,
    color: "text-agent-approval",
    lastSync: "12 minutes ago",
    features: ["GL posting", "Vendor sync", "Payment reconciliation"],
    apiVersion: "v2.0"
  },
  {
    id: "textura",
    name: "Textura",
    description: "Payment management and compliance platform",
    status: "disconnected",
    icon: Database,
    color: "text-muted-foreground",
    lastSync: "Never",
    features: ["Lien waiver tracking", "Compliance docs", "Payment scheduling"],
    apiVersion: "v1.8"
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing and transaction management",
    status: "connected",
    icon: CreditCard,
    color: "text-agent-payment",
    lastSync: "2 minutes ago",
    features: ["ACH payments", "Transaction logs", "Webhook events"],
    apiVersion: "v2023-10-16"
  }
];

const webhookLogs = [
  {
    id: 1,
    source: "Procore",
    event: "invoice.created",
    status: "success",
    timestamp: "2024-01-31 14:32:15",
    payload: "New invoice INV-1234 from Summit Electrical"
  },
  {
    id: 2,
    source: "QuickBooks",
    event: "vendor.updated", 
    status: "success",
    timestamp: "2024-01-31 14:28:33",
    payload: "Vendor profile updated for Apex Concrete"
  },
  {
    id: 3,
    source: "Stripe",
    event: "payment.succeeded",
    status: "success",
    timestamp: "2024-01-31 14:25:18",
    payload: "Payment $8,750 processed for INV-1235"
  },
  {
    id: 4,
    source: "Textura",
    event: "compliance.check",
    status: "failed",
    timestamp: "2024-01-31 14:22:51",
    payload: "Connection timeout after 30s"
  }
];

export default function IntegrationManager() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const handleConnect = (integrationId: string) => {
    console.log(`Connecting to ${integrationId}...`);
    // Connection logic would go here
  };

  const handleDisconnect = (integrationId: string) => {
    console.log(`Disconnecting from ${integrationId}...`);
    // Disconnection logic would go here
  };

  const handleTestConnection = (integrationId: string) => {
    console.log(`Testing connection to ${integrationId}...`);
    // Test connection logic would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Integration Manager</h2>
          <p className="text-muted-foreground">Connect and manage external system integrations</p>
        </div>
        <Button variant="ai" size="sm">
          <Plus className="w-4 h-4" />
          Add Integration
        </Button>
      </div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const IconComponent = integration.icon;
          const isConnected = integration.status === "connected";
          
          return (
            <Card 
              key={integration.id} 
              className={`border-border cursor-pointer transition-all duration-200 hover:shadow-card
                ${selectedIntegration === integration.id ? 'border-accent shadow-card' : ''}
              `}
              onClick={() => setSelectedIntegration(selectedIntegration === integration.id ? null : integration.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${integration.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={isConnected ? "default" : "secondary"}
                    className={isConnected ? "text-status-approved" : "text-muted-foreground"}
                  >
                    {isConnected ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {integration.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last sync:</span>
                  <span className="text-foreground">{integration.lastSync}</span>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {isConnected ? (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestConnection(integration.id);
                        }}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Test
                      </Button>
                      <Button 
                        variant="neural" 
                        size="sm" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDisconnect(integration.id);
                        }}
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="ai" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(integration.id);
                      }}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Configuration Panel */}
      {selectedIntegration && (
        <Card className="border-accent shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-accent" />
              {integrations.find(i => i.id === selectedIntegration)?.name} Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Auto-sync enabled</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Webhook notifications</label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Error retry attempts</label>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Sync frequency</label>
                  <select className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm">
                    <option>Every 5 minutes</option>
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Daily</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">API Version</label>
                  <input 
                    type="text" 
                    defaultValue={integrations.find(i => i.id === selectedIntegration)?.apiVersion}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="ai" className="flex-1">
                Save Configuration
              </Button>
              <Button variant="neural" className="flex-1">
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Webhook Activity Log */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-accent" />
            Recent Webhook Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {webhookLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${
                  log.status === 'success' ? 'bg-status-approved' : 'bg-status-flagged'
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{log.source}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.event}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.payload}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                <Badge 
                  variant={log.status === 'success' ? 'default' : 'destructive'} 
                  className="text-xs mt-1"
                >
                  {log.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}