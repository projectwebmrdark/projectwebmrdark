"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Sidebar } from "@/components/chat/Sidebar";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

export default function ChatPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = trpc.auth.me.useQuery();
  const { data: sessions, isLoading: sessionsLoading, refetch: refetchSessions } = trpc.sessions.list.useQuery();
  const createSession = trpc.sessions.create.useMutation();
  
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  // Select first session by default
  useEffect(() => {
    if (sessions && sessions.length > 0 && !currentSessionId) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [sessions, currentSessionId]);

  const handleNewChat = async () => {
    try {
      const newSession = await createSession.mutateAsync({
        title: "New Chat",
      });
      await refetchSessions();
      setCurrentSessionId(newSession.id);
      toast.success("New chat created!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create new chat");
    }
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  if (userLoading || sessionsLoading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 border-r p-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-16 border-b" />
          <div className="flex-1 p-4 space-y-4">
            <Skeleton className="h-20 w-3/4" />
            <Skeleton className="h-20 w-2/3 ml-auto" />
            <Skeleton className="h-20 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          sessions={sessions || []}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            )}
            <h1 className="text-lg font-semibold">
              {sessions?.find((s) => s.id === currentSessionId)?.title || "Mr.Dark AI Agent"}
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleNewChat}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </header>

        {/* Chat Interface */}
        {currentSessionId ? (
          <ChatInterface sessionId={currentSessionId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-4">No chat selected</p>
              <Button onClick={handleNewChat}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
