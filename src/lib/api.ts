// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://express-example-production-4d54.up.railway.app";

export async function fetchAPI(input: RequestInfo, options?: any) {
  const url = BASE_URL + input;

  const newOptions: RequestInit = options || {};

  if (newOptions.body) {
    newOptions.headers = { "Content-Type": "application/json" };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  const res = await fetch(url, newOptions);
  const data = await res.json();

  if (res.status >= 200 && res.status < 300) {
    return data;
  } else {
    console.log(data);
    return { message: data.message, status: res.status };
  }
}
