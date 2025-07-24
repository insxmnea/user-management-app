const API_URL = "http://localhost:4000/api";

export const api = {
  get: (endpoint: string) => fetchWrapper(endpoint, "GET"),
  post: (endpoint: string, body: object) =>
    fetchWrapper(endpoint, "POST", body),
  patch: (endpoint: string, body: object) =>
    fetchWrapper(endpoint, "PATCH", body),
  delete: (endpoint: string) => fetchWrapper(endpoint, "DELETE"),
};

async function fetchWrapper(endpoint: string, method: string, body?: object) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  if (method === "DELETE" || method === "PATCH") {
    return null;
  }

  return response.json();
}
