import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/callback")({
  component: CallbackPage,
});

function CallbackPage() {
  const { userManager, authenticated, refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only process callback if not already authenticated
    if (authenticated !== true) {
      userManager
        .signinRedirectCallback()
        .then(async (user) => {
          if (user) {
            // Refresh the user state in AuthProvider
            await refreshUser();
            navigate({ to: "/dashboard" });
          } else {
            navigate({ to: "/login" });
          }
        })
        .catch((_) => {
          navigate({ to: "/login" });
        });
    } else {
      // Already authenticated, redirect to dashboard
      navigate({ to: "/dashboard" });
    }
  }, [userManager, navigate, authenticated, refreshUser]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p className="mt-4 text-muted-foreground">Completing login...</p>
    </div>
  );
}
