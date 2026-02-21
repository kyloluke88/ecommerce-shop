const DEFAULT_API_BASE_URL =
  process.env.SHOP_API_BASE_URL ?? process.env.NEXT_PUBLIC_SHOP_API_BASE_URL ?? "http://localhost:8080/api";

function buildApiURL(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${DEFAULT_API_BASE_URL}${normalizedPath}`;
}

export async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildApiURL(path), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
