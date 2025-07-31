import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  MessageSquare, 
  Settings, 
  User,
  Menu,
  X,
  Network,
  LogOut
} from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  role: string;
  onLogout: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "invoices", label: "Invoices", icon: FileText, badge: "12" },
  { id: "agents", label: "Agents", icon: Brain },
  { id: "mcp", label: "MCP", icon: Network },
  { id: "chat", label: "Ask Excess", icon: MessageSquare },
];

const roleLabels: Record<string, string> = {
  cfo: "CFO",
  ap: "Accounts Payable",
  pm: "Project Manager", 
  compliance: "Compliance Officer",
  admin: "Agent Supervisor"
};

export default function Navigation({ currentView, onViewChange, role, onLogout }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Excess</span>
          </div>
          
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "ai" : "ghost"}
                  size="sm"
                  className={`relative ${isActive ? '' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => onViewChange(item.id)}
                >
                  <IconComponent className="w-4 h-4" />
                  {item.label}
                  {item.badge && (
                    <Badge variant="destructive" className="ml-2 h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{roleLabels[role]}</p>
            <p className="text-xs text-muted-foreground">Active Session</p>
          </div>
          
          <Button variant="neural" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">Excess</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">Excess</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "ai" : "ghost"}
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <IconComponent className="w-5 h-5 mr-3" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto h-5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
            
            <div className="px-4 py-6 border-t border-border space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-10 h-10 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{roleLabels[role]}</p>
                  <p className="text-sm text-muted-foreground">Active Session</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="neural" size="sm" className="flex-1">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="flex-1" onClick={onLogout}>
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}