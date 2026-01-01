const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (url, options = {}) => {
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const headers = {
      ...(options.headers || {}),
    };

    // Nếu body là object (và không phải FormData), stringify
    let body = options.body;
    if (body && typeof body === "object" && !(body instanceof FormData)) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
      body,
    });

    if (!res.ok) {
      let message = `Error ${res.status}`;
      try {
        const data = await res.json();
        message = data.message || message;
      } catch (_) {}
      throw new Error(message);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      return await res.text();
    }
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};
