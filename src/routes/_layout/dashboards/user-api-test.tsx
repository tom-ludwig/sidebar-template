import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUser, useCreateUser } from "@api/generated/users/users/users";
import {
  useGetHealthz,
  useGetLivez,
  useGetReadyz,
} from "@api/generated/health/health/health";
import { Activity, Heart, Zap, User, UserPlus, Search } from "lucide-react";

export const Route = createFileRoute("/_layout/dashboards/user-api-test")({
  component: UserApiTestPage,
});

function UserApiTestPage() {
  const [searchUserId, setSearchUserId] = useState("");
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  // Form state for creating a new user
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // Health check queries
  const healthz = useGetHealthz({ query: { refetchInterval: 30000 } });
  const livez = useGetLivez({ query: { refetchInterval: 30000 } });
  const readyz = useGetReadyz({ query: { refetchInterval: 30000 } });

  // User query - only enabled when activeUserId is set
  const {
    data: user,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUser(
    { user_id: activeUserId ?? "" },
    { query: { enabled: !!activeUserId } }
  );

  // Create user mutation
  const createUser = useCreateUser();

  const handleSearch = () => {
    if (searchUserId.trim()) {
      setActiveUserId(searchUserId.trim());
    }
  };

  const handleCreateUser = () => {
    if (newUser.first_name && newUser.last_name && newUser.email) {
      createUser.mutate(
        { data: newUser },
        {
          onSuccess: (createdUser) => {
            setActiveUserId(createdUser.user_id);
            setSearchUserId(createdUser.user_id);
            setNewUser({ first_name: "", last_name: "", email: "" });
          },
        }
      );
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboards</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>User API Test</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 pt-0">
        {/* Health Status Grid - 3 tiles */}
        <div className="grid gap-4 md:grid-cols-3">
          <HealthTile
            title="Healthz"
            description="Overall health check"
            icon={<Heart className="h-5 w-5" />}
            isLoading={healthz.isLoading}
            isError={healthz.isError}
            status={healthz.data?.status}
          />
          <HealthTile
            title="Livez"
            description="Liveness probe"
            icon={<Activity className="h-5 w-5" />}
            isLoading={livez.isLoading}
            isError={livez.isError}
            status={livez.data?.status}
          />
          <HealthTile
            title="Readyz"
            description="Readiness probe"
            icon={<Zap className="h-5 w-5" />}
            isLoading={readyz.isLoading}
            isError={readyz.isError}
            status={readyz.data?.status}
          />
        </div>

        {/* User Management Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Search/View User Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">User Lookup</CardTitle>
                  <CardDescription>Search for a user by ID</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter user ID..."
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={!searchUserId.trim()}
                  size="icon"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {/* User Result Display */}
              {activeUserId && (
                <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                  {isLoadingUser ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Loading user...
                    </div>
                  ) : userError ? (
                    <div className="text-destructive">
                      Error: {userError.message || "User not found"}
                    </div>
                  ) : user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          ID:
                        </span>
                        <span className="font-mono text-sm">{user.user_id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Name:
                        </span>
                        <span>
                          {user.first_name} {user.last_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Email:
                        </span>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Create User Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Create User</CardTitle>
                  <CardDescription>Add a new user to the system</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="First name"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, first_name: e.target.value })
                  }
                />
                <Input
                  placeholder="Last name"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, last_name: e.target.value })
                  }
                />
              </div>
              <Input
                type="email"
                placeholder="Email address"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <Button
                onClick={handleCreateUser}
                disabled={
                  createUser.isPending ||
                  !newUser.first_name ||
                  !newUser.last_name ||
                  !newUser.email
                }
                className="w-full"
              >
                {createUser.isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create User
                  </>
                )}
              </Button>

              {createUser.isError && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  {createUser.error?.message || "Failed to create user"}
                </div>
              )}

              {createUser.isSuccess && (
                <div className="rounded-lg border border-emerald-500/50 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400">
                  User created successfully!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}

function HealthTile({
  title,
  description,
  icon,
  isLoading,
  isError,
  status,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  status?: string;
}) {
  const isUp = !isError && status;

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${
              isLoading
                ? "bg-muted/50 text-muted-foreground"
                : isUp
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-destructive/10 text-destructive"
            }`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {isLoading ? (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        ) : (
          <span
            className={`text-2xl font-bold ${
              isUp ? "text-emerald-500" : "text-destructive"
            }`}
          >
            {isUp ? "UP" : "DOWN"}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

