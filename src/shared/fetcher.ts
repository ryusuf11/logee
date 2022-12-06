// interface HttpConfig extends RequestInit
async function http<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok) {
    throw await response.json();
  }

  return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'get', ...config };
  return await http<T>(path, init);
}

export async function post<T extends BodyInit, U>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<U> {
  const init = { method: 'post', body, ...config };
  return await http<U>(path, init);
}

export async function put<T extends URLSearchParams, U>(
  path: string,
  body: T,
  config?: RequestInit,
): Promise<U> {
  const init = { method: 'put', body, ...config };
  return await http<U>(path, init);
}
