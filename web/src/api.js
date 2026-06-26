async function request(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Permintaan gagal')
  }

  return data
}

export const api = {
  login: (payload) => request('/login', { method: 'POST', body: payload }),
  getUsers: () => request('/users'),
  getAppointments: () => request('/appointments'),
  createAppointment: (payload) => request('/appointments', { method: 'POST', body: payload }),
  getPatients: () => request('/patients'),
  createPatient: (payload) => request('/patients', { method: 'POST', body: payload }),
  getDoctors: () => request('/doctors'),
  createDoctor: (payload) => request('/doctors', { method: 'POST', body: payload }),
  getStaffs: () => request('/staffs'),
  createStaff: (payload) => request('/staffs', { method: 'POST', body: payload }),
  getMedicalRecords: () => request('/medical-records'),
  createMedicalRecord: (payload) => request('/medical-records', { method: 'POST', body: payload }),
  getTransactions: () => request('/transactions'),
  createTransaction: (payload) => request('/transactions', { method: 'POST', body: payload }),
}
