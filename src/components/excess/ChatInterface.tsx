import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Send, 
  Brain, 
  FileText, 
  Search,
  Mic,
  Paperclip,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  metadata?: {
    invoiceId?: string;
    confidence?: number;
    sources?: string[];
  };
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'ai',
    content: "Hello! I'm Excess AI, your agentic financial workflow assistant. I have access to your complete invoice history, compliance records, and real-time MCP state. How can I help you today?",
    timestamp: "Just now"
  }
];

const suggestedQueries = [
  "What's the status of Summit Electrical's last invoice?",
  "Why did the system block payment to Apex Concrete?", 
  "How many invoices were auto-approved this month?",
  "Show me the MCP entry for INV-651",
  "Which vendors have compliance issues?",
  "What's our average processing time?"
];

const knowledgeBase = [
  {
    type: "invoice",
    title: "INV-1234 - Summit Electrical",
    preview: "Status: Compliance Review | Amount: $12,450",
    lastUpdated: "2 minutes ago"
  },
  {
    type: "contract", 
    title: "Master Agreement - Apex Concrete",
    preview: "Effective: Jan 2024 - Dec 2024 | Auto-renewal clause",
    lastUpdated: "1 day ago"
  },
  {
    type: "compliance",
    title: "Insurance Certificate - ProTech",
    preview: "Expires: March 2024 | General Liability $2M",
    lastUpdated: "3 days ago"
  },
  {
    type: "audit",
    title: "Q4 Audit Trail Report",
    preview: "847 invoices processed | 97.2% accuracy rate",
    lastUpdated: "1 week ago"
  }
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: "Just now",
        metadata: {
          confidence: 94,
          sources: ["MCP State", "Invoice Database", "Compliance Records"]
        }
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("summit electrical")) {
      return "Summit Electrical's most recent invoice (INV-1234) for $12,450 is currently under compliance review. The ComplianceAgent flagged it 2 minutes ago for a missing lien waiver. The invoice was received for Building A - Phase 2 project and is awaiting manual review before proceeding to approval workflow.";
    } else if (query.toLowerCase().includes("apex concrete")) {
      return "The system blocked payment to Apex Concrete (INV-1235) due to expired insurance certificate. Their general liability insurance expired on January 15th, 2024. The PaymentAgent automatically held the $8,750 invoice pending updated documentation. I've escalated this to the compliance team for vendor outreach.";
    } else if (query.toLowerCase().includes("auto-approved")) {
      return "This month, 847 invoices have been processed with 756 auto-approved (89.2% approval rate). This represents a 5.1% efficiency improvement over last month. The SupervisorAgent optimized approval thresholds based on historical accuracy patterns.";
    } else {
      return "I understand you're asking about our financial workflows. Based on the current MCP state and recent agent activities, I can provide specific details about invoice statuses, compliance issues, approval workflows, or payment processing. Could you be more specific about what you'd like to know?";
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="h-full flex gap-6">
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col bg-gradient-card border-accent/20">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent animate-agent-pulse" />
              Ask Excess AI
              <Badge variant="outline" className="ml-auto text-xs">
                RAG + MCP Enabled
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-4' 
                      : 'bg-card border border-border mr-4'
                  }`}>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-accent" />
                        <span className="text-xs font-medium text-accent">Excess AI</span>
                        {message.metadata?.confidence && (
                          <Badge variant="secondary" className="text-xs">
                            {message.metadata.confidence}% confident
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.metadata?.sources && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {message.metadata.sources.map((source, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-lg p-4 mr-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-accent animate-agent-pulse" />
                      <span className="text-sm text-muted-foreground">Excess AI is thinking...</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggested Queries */}
            <div className="px-6 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.slice(0, 3).map((query, index) => (
                  <Button
                    key={index}
                    variant="neural" 
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => handleSuggestedQuery(query)}
                  >
                    {query}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about invoices, compliance, agents, or MCP state..."
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent pr-20"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Mic className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Button 
                  variant="ai" 
                  size="lg"
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Base Sidebar */}
      <Card className="w-80 bg-gradient-card border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-accent" />
            Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            {knowledgeBase.map((item, index) => (
              <div key={index} className="p-3 rounded-lg border border-border bg-card/30 hover:border-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-agent flex items-center justify-center">
                    {item.type === 'invoice' ? (
                      <FileText className="w-4 h-4 text-accent" />
                    ) : item.type === 'contract' ? (
                      <CheckCircle className="w-4 h-4 text-agent-approval" />
                    ) : item.type === 'compliance' ? (
                      <AlertTriangle className="w-4 h-4 text-agent-compliance" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.preview}
                    </p>
                    <p className="text-xs text-accent">{item.lastUpdated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="neural" size="sm" className="w-full">
            <Zap className="w-4 h-4" />
            Advanced Search
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}