function showToast(message, type = "success") {
  const toast = document.createElement("div")
  const colors = {
    success: "bg-green-500",
    error:   "bg-red-500",
    info:    "bg-blue-500",
  }

  toast.className = `
    fixed top-4 right-4 z-50 px-5 py-3 rounded-lg text-white text-sm
    font-medium shadow-lg transition-all duration-300 ${colors[type] || colors.success}
  `
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = "0"
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

function formatDate(dateStr) {
  if (!dateStr) return "-"
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day:   "2-digit",
    month: "long",
    year:  "numeric",
  })
}

function confirmDelete(message = "Yakin ingin menghapus data ini?") {
  return window.confirm(message)
}