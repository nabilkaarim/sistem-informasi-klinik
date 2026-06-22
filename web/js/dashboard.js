async function loadDashboard() {
  await loadStats()
  await loadTodayAppointments()
  await loadRecentPatients()
}

async function loadStats() {
  // Patients
  const patients = await api.get("/patients")
  if (patients?.ok) {
    const total = Array.isArray(patients.data) ? patients.data.length
      : patients.data?.total ?? patients.data?.data?.length ?? "-"
    document.getElementById("stat-patients").textContent = total
  } else {
    document.getElementById("stat-patients").textContent = "0"
  }

  // Doctors
  const doctors = await api.get("/doctors")
  if (doctors?.ok) {
    const total = Array.isArray(doctors.data) ? doctors.data.length
      : doctors.data?.total ?? doctors.data?.data?.length ?? "-"
    document.getElementById("stat-doctors").textContent = total
  } else {
    document.getElementById("stat-doctors").textContent = "0"
  }

  // Appointments hari ini
  const appointments = await api.get("/appointments")
  if (appointments?.ok) {
    const today = new Date().toISOString().split("T")[0]
    const list = Array.isArray(appointments.data) ? appointments.data
      : appointments.data?.data ?? []
    const todayCount = list.filter(a => {
      const d = a.date || a.appointment_date || a.scheduled_at || ""
      return d.startsWith(today)
    }).length
    document.getElementById("stat-appointments").textContent = todayCount
  } else {
    document.getElementById("stat-appointments").textContent = "0"
  }

  // Revenue (payments)
  const payments = await api.get("/payments")
  if (payments?.ok) {
    const list = Array.isArray(payments.data) ? payments.data
      : payments.data?.data ?? []
    const thisMonth = new Date().toISOString().slice(0, 7)
    const total = list
      .filter(p => {
        const d = p.created_at || p.payment_date || ""
        return d.startsWith(thisMonth)
      })
      .reduce((sum, p) => sum + (p.total_amount || p.amount || 0), 0)
    document.getElementById("stat-revenue").textContent =
      total > 0
        ? "Rp " + total.toLocaleString("id-ID")
        : "Rp 0"
  } else {
    document.getElementById("stat-revenue").textContent = "Rp 0"
  }
}

async function loadTodayAppointments() {
  const el = document.getElementById("today-appointments")
  const res = await api.get("/appointments")

  if (!res?.ok) {
    el.innerHTML = `<p class="text-center text-sm text-gray-400 py-4">Gagal memuat data</p>`
    return
  }

  const today = new Date().toISOString().split("T")[0]
  const list = Array.isArray(res.data) ? res.data : res.data?.data ?? []
  const todayList = list.filter(a => {
    const d = a.date || a.appointment_date || a.scheduled_at || ""
    return d.startsWith(today)
  }).slice(0, 5)

  if (todayList.length === 0) {
    el.innerHTML = `
      <div class="text-center py-6">
        <svg class="w-10 h-10 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-sm text-gray-400">Tidak ada jadwal hari ini</p>
      </div>`
    return
  }

  el.innerHTML = todayList.map(a => `
    <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
        <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          ${a.patient_name || a.patient?.name || "Pasien"}
        </p>
        <p class="text-xs text-gray-400 truncate">
          Dr. ${a.doctor_name || a.doctor?.name || "-"}
        </p>
      </div>
      <span class="text-xs px-2 py-1 rounded-full font-medium
        ${a.status === "done" || a.status === "selesai"
          ? "bg-green-100 text-green-700"
          : a.status === "cancelled" || a.status === "dibatalkan"
          ? "bg-red-100 text-red-700"
          : "bg-blue-100 text-blue-700"}">
        ${a.status || "Menunggu"}
      </span>
    </div>
  `).join("")
}

async function loadRecentPatients() {
  const el = document.getElementById("recent-patients")
  const res = await api.get("/patients")

  if (!res?.ok) {
    el.innerHTML = `<p class="text-center text-sm text-gray-400 py-4">Gagal memuat data</p>`
    return
  }

  const list = Array.isArray(res.data) ? res.data : res.data?.data ?? []
  const recent = list.slice(-5).reverse()

  if (recent.length === 0) {
    el.innerHTML = `
      <div class="text-center py-6">
        <svg class="w-10 h-10 text-gray-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p class="text-sm text-gray-400">Belum ada data pasien</p>
      </div>`
    return
  }

  el.innerHTML = recent.map(p => {
    const initials = (p.name || p.full_name || "P")
      .split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    return `
      <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
        <div class="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0
          text-xs font-bold text-primary-600">
          ${initials}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            ${p.name || p.full_name || "-"}
          </p>
          <p class="text-xs text-gray-400 truncate">
            ${p.phone || p.phone_number || "-"} · ${formatDate(p.birth_date || p.date_of_birth)}
          </p>
        </div>
        <a href="patients.html" class="text-xs text-primary-600 hover:underline flex-shrink-0">Detail</a>
      </div>
    `
  }).join("")
}