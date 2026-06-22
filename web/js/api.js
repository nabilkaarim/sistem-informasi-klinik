const BASE_URL = "http://localhost:8080/api"

function getToken() {
  return localStorage.getItem("token")
}

async function request(method, endpoint, body = null) {
  const headers = {
    "Content-Type": "application/json",
  }

  const token = getToken()
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options)

    if (res.status === 401) {
      localStorage.clear()
      window.location.href = "/web/index.html" // Sesuaikan path jika index.html adalah halaman login
      return
    }

    const data = await res.json()
    return { ok: res.ok, status: res.status, data }

  } catch (err) {
    console.error("Request error:", err)
    return { ok: false, data: { message: "Tidak dapat terhubung ke server" } }
  }
}

const api = {
  get:    (endpoint)       => request("GET",    endpoint),
  post:   (endpoint, body) => request("POST",   endpoint, body),
  put:    (endpoint, body) => request("PUT",    endpoint, body),
  delete: (endpoint)       => request("DELETE", endpoint),
}