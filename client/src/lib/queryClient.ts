import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

function resolveApiUrl(pathOrUrl: string): string {
  // If already absolute HTTP(S) URL, return as-is
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  // Only prefix relative paths starting with '/'
  if (pathOrUrl.startsWith("/")) {
    const base = (import.meta as any).env?.VITE_API_URL as string | undefined;
    if (base && typeof base === "string" && base.length > 0) {
      const sanitizedBase = base.replace(/\/$/, "");
      return `${sanitizedBase}${pathOrUrl}`;
    }
  }

  return pathOrUrl;
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const resolvedUrl = resolveApiUrl(url);
  const res = await fetch(resolvedUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }: { queryKey: readonly unknown[] }) => {
    const path = queryKey.join("/") as string;
    const resolvedUrl = resolveApiUrl(path.startsWith("/") ? path : `/${path}`);
    const res = await fetch(resolvedUrl, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
