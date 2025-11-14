"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  const router = useRouter();
  const { data: user, isLoading } = trpc.auth.me.useQuery();
  const { data: apiKeys = [] } = trpc.apiKeys.list.useQuery();
  const createApiKey = trpc.apiKeys.create.useMutation();
  const deleteApiKey = trpc.apiKeys.delete.useMutation();

  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyService, setNewKeyService] = useState("");

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleCreateKey = async () => {
    if (!newKeyName || !newKeyService) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const result = await createApiKey.mutateAsync({
        name: newKeyName,
        service: newKeyService,
      });

      toast.success("API Key created successfully");
      toast.info(`Key: ${result.key}`, { duration: 10000 });
      
      setNewKeyName("");
      setNewKeyService("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm("Are you sure you want to delete this API key?")) return;

    try {
      await deleteApiKey.mutateAsync({ id });
      toast.success("API Key deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {/* Profile Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">User ID</label>
              <p className="text-muted-foreground font-mono text-sm">{user.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* API Keys Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your API keys for external services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create New Key */}
            <div className="space-y-2">
              <h3 className="font-medium">Create New API Key</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Key name"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
                <Input
                  placeholder="Service (e.g., OpenAI)"
                  value={newKeyService}
                  onChange={(e) => setNewKeyService(e.target.value)}
                />
                <Button onClick={handleCreateKey} disabled={createApiKey.isPending}>
                  Create
                </Button>
              </div>
            </div>

            <Separator />

            {/* Existing Keys */}
            <div className="space-y-2">
              <h3 className="font-medium">Your API Keys</h3>
              {apiKeys.length === 0 ? (
                <p className="text-sm text-muted-foreground">No API keys yet</p>
              ) : (
                <div className="space-y-2">
                  {apiKeys.map((key: any) => (
                    <div
                      key={key.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{key.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {key.service} • {key.key}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteKey(key.id)}
                        disabled={deleteApiKey.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
            <CardDescription>Your platform usage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Usage statistics coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
