import { useState } from "react";
import RoleSelector from "@/components/excess/RoleSelector";
import Navigation from "@/components/excess/Navigation";
import Dashboard from "@/components/excess/Dashboard";
import AgentControl from "@/components/excess/AgentControl";
import ChatInterface from "@/components/excess/ChatInterface";

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
      case "invoices":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Invoice Explorer</h2>
            <p className="text-muted-foreground">Invoice management interface coming soon...</p>
          </div>
        );
      case "agents":
        return <AgentControl />;
      case "mcp":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">MCP Inspector</h2>
            <p className="text-muted-foreground">MCP state visualization coming soon...</p>
          </div>
        );
      case "chat":
        return <ChatInterface />;
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
