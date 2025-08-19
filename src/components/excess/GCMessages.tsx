import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Plus, 
  Paperclip,
  Send,
  Eye,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Building,
  FileText,
  Flag
} from "lucide-react";

export default function GCMessages() {
  const [selectedThread, setSelectedThread] = useState<string | null>("thread-001");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const messageThreads = [
    {
      id: "thread-001",
      title: "SUB-INV-445 - Quantity Clarification",
      participants: ["ABC Electric Co.", "John Martinez (PM)", "Sarah Chen (Controller)"],
      lastMessage: "Please provide delivery tickets for the additional quantities",
      lastActivity: "2 hours ago",
      status: "open",
      priority: "high",
      invoice: "SUB-INV-445",
      project: "Plaza Tower",
      unreadCount: 2
    },
    {
      id: "thread-002",
      title: "Insurance Renewal Required",
      participants: ["Steel Works LLC", "Compliance Team"],
      lastMessage: "We've uploaded the renewed policy. Please confirm receipt.",
      lastActivity: "4 hours ago",
      status: "resolved",
      priority: "medium",
      invoice: null,
      project: "Downtown Retail",
      unreadCount: 0
    },
    {
      id: "thread-003",
      title: "PAY-APP-008 - Owner Review Status",
      participants: ["Metropolitan Development", "Michael Roberts (CFO)"],
      lastMessage: "Owner has requested additional documentation for line 15",
      lastActivity: "1 day ago",
      status: "waiting",
      priority: "medium",
      invoice: null,
      project: "Plaza Tower",
      unreadCount: 1
    },
    {
      id: "thread-004",
      title: "Backcharge Discussion - HVAC-BG-001",
      participants: ["HVAC Solutions Inc.", "Project Team"],
      lastMessage: "Disputed charge - scheduling meeting to discuss",
      lastActivity: "2 days ago",
      status: "escalated",
      priority: "high",
      invoice: "SUB-INV-447",
      project: "Office Renovation",
      unreadCount: 3
    }
  ];

  const selectedThreadData = messageThreads.find(t => t.id === selectedThread);

  const messages = selectedThread === "thread-001" ? [
    {
      id: "msg-001",
      sender: "John Martinez (PM)",
      senderType: "gc",
      content: "Hi ABC Electric, I've reviewed your invoice SUB-INV-445 and noticed the quantities for conduit exceed the PO allowance. Can you provide delivery tickets to verify?",
      timestamp: "Aug 24, 2024 2:30 PM",
      attachments: [],
      status: "sent"
    },
    {
      id: "msg-002", 
      sender: "Mike Johnson (ABC Electric)",
      senderType: "sub",
      content: "Thanks John. We had an approved change order for additional conduit runs. I'll attach the CO documentation and delivery tickets.",
      timestamp: "Aug 24, 2024 3:15 PM",
      attachments: [
        { name: "CO-ABC-001.pdf", size: "2.1 MB" },
        { name: "Delivery-Ticket-082224.pdf", size: "890 KB" }
      ],
      status: "sent"
    },
    {
      id: "msg-003",
      sender: "Sarah Chen (Controller)",
      senderType: "gc", 
      content: "I've reviewed the change order. It's properly approved. Please proceed with processing the invoice.",
      timestamp: "Aug 24, 2024 4:45 PM",
      attachments: [],
      status: "sent"
    },
    {
      id: "msg-004",
      sender: "John Martinez (PM)",
      senderType: "gc",
      content: "Perfect, thanks Sarah. ABC Electric - your invoice has been approved and scheduled for payment on Sep 5th.",
      timestamp: "Aug 24, 2024 5:00 PM", 
      attachments: [],
      status: "sent"
    }
  ] : [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-500">Open</Badge>;
      case "resolved":
        return <Badge className="bg-green-500">Resolved</Badge>;
      case "waiting":
        return <Badge className="bg-amber-500">Waiting</Badge>;
      case "escalated":
        return <Badge variant="destructive">Escalated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getSenderIcon = (senderType: string) => {
    switch (senderType) {
      case "gc":
        return <Building className="w-6 h-6 text-blue-500" />;
      case "sub":
        return <User className="w-6 h-6 text-green-500" />;
      case "owner":
        return <Building className="w-6 h-6 text-purple-500" />;
      default:
        return <User className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Threaded communication by invoice and project</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Threads</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Thread
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Message Threads Sidebar */}
        <div className="w-1/3 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2 p-4">
              {messageThreads
                .filter(thread => selectedFilter === "all" || thread.status === selectedFilter)
                .map((thread) => (
                <div 
                  key={thread.id} 
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedThread === thread.id 
                      ? "bg-accent border border-accent-foreground/20" 
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => setSelectedThread(thread.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2">
                      {thread.title}
                    </h4>
                    {thread.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 text-xs">
                        {thread.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(thread.status)}
                    {getPriorityBadge(thread.priority)}
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {thread.lastMessage}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{thread.project}</span>
                    <span>{thread.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 flex flex-col">
          {selectedThreadData ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedThreadData.title}</h2>
                    <p className="text-sm text-muted-foreground">{selectedThreadData.project}</p>
                    {selectedThreadData.invoice && (
                      <p className="text-sm text-muted-foreground">Related: {selectedThreadData.invoice}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedThreadData.status)}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Invoice
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="w-4 h-4 mr-2" />
                      Escalate
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Participants: {selectedThreadData.participants.join(", ")}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${
                    message.senderType === "gc" ? "justify-end" : "justify-start"
                  }`}>
                    <div className={`max-w-[70%] ${
                      message.senderType === "gc" ? "order-2" : "order-1"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {getSenderIcon(message.senderType)}
                        <span className="text-sm font-medium text-foreground">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      
                      <div className={`p-3 rounded-lg ${
                        message.senderType === "gc" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-accent text-accent-foreground"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        
                        {message.attachments.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-white/10 rounded text-xs">
                                <Paperclip className="w-3 h-3" />
                                <span>{attachment.name}</span>
                                <span className="text-white/70">({attachment.size})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                  />
                  <Button size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="rounded" />
                    Notify all participants
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="rounded" />
                    Mark as resolved
                  </label>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose a thread from the left to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}