import { useState } from "react";
import RoleSelector from "@/components/excess/RoleSelector";
import Navigation from "@/components/excess/Navigation";
import Dashboard from "@/components/excess/Dashboard";
import AgentControl from "@/components/excess/AgentControl";
import ChatInterface from "@/components/excess/ChatInterface";
import AuditTrail from "@/components/excess/AuditTrail";
import IntegrationManager from "@/components/excess/IntegrationManager";
import ProjectView from "@/components/excess/ProjectView";
import PerformanceAnalytics from "@/components/excess/PerformanceAnalytics";
import InvoiceExplorer from "@/components/excess/InvoiceExplorer";
import MCPInspector from "@/components/excess/MCPInspector";
import SubcontractorInvoices from "@/components/excess/SubcontractorInvoices";
import SubcontractorDocuments from "@/components/excess/SubcontractorDocuments";
import SubcontractorCompliance from "@/components/excess/SubcontractorCompliance";
import SubcontractorPayments from "@/components/excess/SubcontractorPayments";

const Index = () => {
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");

  const handleRoleSelect = (role: string) => {
    setCurrentRole(role);
  };

  const handleLogout = () => {
    setCurrentRole(null);
    setCurrentView("dashboard");
  };

  if (!currentRole) {
    return <RoleSelector onRoleSelect={handleRoleSelect} />;
  }

  const renderCurrentView = () => {
    // For subcontractor role, render specific components
    if (currentRole === "subcontractor") {
      switch (currentView) {
        case "dashboard":
          return <Dashboard role={currentRole} />;
        case "invoices":
          return <SubcontractorInvoices />;
        case "documents":
          return <div className="p-6"><h1 className="text-2xl font-bold">Documents</h1><p>Document management interface</p></div>;
        case "compliance":
          return <div className="p-6"><h1 className="text-2xl font-bold">Compliance</h1><p>Compliance tracking interface</p></div>;
        case "payments":
          return <div className="p-6"><h1 className="text-2xl font-bold">Payments</h1><p>Payment tracking interface</p></div>;
        case "messages":
          return <div className="p-6"><h1 className="text-2xl font-bold">Messages</h1><p>Message threads interface</p></div>;
        case "settings":
          return <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Company settings interface</p></div>;
        default:
          return <Dashboard role={currentRole} />;
      }
    }

    // For other roles, use existing components
    switch (currentView) {
      case "dashboard":
        return <Dashboard role={currentRole} />;
      case "projects":
        return <ProjectView />;
      case "agents":
        return <AgentControl />;
      case "integrations":
        return <IntegrationManager />;
      case "analytics":
        return <PerformanceAnalytics />;
      case "audit":
        return <AuditTrail />;
      case "chat":
        return <ChatInterface />;
      case "invoices":
        return <InvoiceExplorer />;
      case "mcp":
        return <MCPInspector />;
      default:
        return <Dashboard role={currentRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentView={currentView}
        onViewChange={setCurrentView}
        role={currentRole}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-6 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default Index;
