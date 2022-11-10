const BASE_URL = "http://localhost:3000";

export async function fetchAPI(input: RequestInfo, options?: any) {
  const url = BASE_URL + input;

  const newOptions: RequestInit = options || {};

  if (newOptions.body) {
    newOptions.headers = { "Content-Type": "application/json" };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  const res = await fetch(url, newOptions);

  if (res.status >= 200 && res.status < 300) {
    const data = await res.json();
    return data;
  } else {
    return { message: "Hubo un error", status: res.status };
  }
}
