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
