import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, CheckCircle, Settings, UserCheck, Brain } from "lucide-react";

interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const roles: Role[] = [
  {
    id: "subcontractor",
    title: "Subcontractor Portal",
    description: "Upload invoices, track status & payments - Free access",
    icon: Users,
    color: "text-agent-payment"
  },
  {
    id: "gc",
    title: "GC Portal", 
    description: "Multi-project management, AI compliance, approvals & payments",
    icon: Brain,
    color: "text-agent-supervisor"
  },
  {
    id: "owner",
    title: "Owner Portal",
    description: "Review pay applications, approve/reject, fund release tracking",
    icon: Shield,
    color: "text-agent-compliance"
  }
];

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

export default function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setTimeout(() => onRoleSelect(roleId), 300);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Excess
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">
            Agentic AI Financial Workflow System
          </p>
          <p className="text-foreground/80">
            Select your role to access your personalized dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const IconComponent = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card 
                key={role.id}
                className={`
                  relative cursor-pointer transition-all duration-300 hover:shadow-card hover:scale-105
                  ${isSelected ? 'shadow-glow border-accent scale-105' : 'border-border hover:border-accent/50'}
                `}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-agent flex items-center justify-center ${isSelected ? 'animate-glow' : ''}`}>
                    <IconComponent className={`w-8 h-8 ${role.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-agent opacity-10 rounded-lg" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="neural" size="lg" className="mr-4">
            <UserCheck className="w-4 h-4" />
            Continue as Guest
          </Button>
          <Button variant="ghost" size="lg">
            Need help choosing?
          </Button>
        </div>
      </div>
    </div>
  );
}