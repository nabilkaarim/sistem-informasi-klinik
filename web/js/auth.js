function getUser() {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

function isLoggedIn() {
  return !!localStorage.getItem("token")
}

function redirectIfNotLoggedIn() {
  if (!isLoggedIn()) {
    window.location.href = "/web/index.html"
  }
}

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = "/web/dashboard.html"
  }
}

function logout() {
  localStorage.clear()
  window.location.href = "/web/index.html"
}

async function login(username, password) {
  // Disinkronkan dengan input payload email backend Go kamu
  const res = await api.post("/login", { email: username, password })

  if (res.ok) {
    const { token, user } = res.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    window.location.href = "/web/dashboard.html"
  } else {
    showToast(res.data?.error || "Login gagal", "error")
  }
}

function renderUserInfo() {
  const user = getUser()
  const el = document.getElementById("user-name")
  if (el && user) el.textContent = user.name || user.username || "User"

  const roleEl = document.getElementById("user-role")
  if (roleEl && user) roleEl.textContent = user.role || ""
} 