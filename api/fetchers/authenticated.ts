import { userManager } from "@/lib/auth";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const authenticatedFetch = async <T>({
  url,
  method,
  params,
  data,
  headers,
  signal,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, string>;
  data?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}): Promise<T> => {
  const user = await userManager.getUser();
  const token = user?.access_token;

  if (!token) {
    userManager.signinRedirect();
    throw new Error("No authentication token");
  }

  const searchParams = params ? `?${new URLSearchParams(params)}` : "";

  const response = await fetch(`${BASE_URL}${url}${searchParams}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: data ? JSON.stringify(data) : undefined,
    signal,
  });

  if (response.status === 401) {
    userManager.signinRedirect();
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.message || `HTTP error! status: ${response.status}`,
    );
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
};
