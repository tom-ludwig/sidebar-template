import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { authenticated, login } = useAuth();

  if (authenticated === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg">
              <Building2 className="size-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>
            Sign in to access your application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={login} className="w-full" size="lg">
            Sign in
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Secure single sign-on authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
