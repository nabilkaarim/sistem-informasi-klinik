import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

function getStoredUser() {
  try {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    return null
  }
}

function getRoleLabel(role) {
  switch (role) {
    case 'admin':
      return 'Administrator'
    case 'petugas':
      return 'Petugas Klinik'
    case 'dokter':
      return 'Dokter'
    default:
      return 'Pengguna'
  }
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useMemo(() => getStoredUser(), [])
  const role = user?.role || 'admin'

  const [activeSection, setActiveSection] = useState('dashboard')
  const [doctors, setDoctors] = useState([])
  const [staff, setStaff] = useState([])
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const [transactions, setTransactions] = useState([])
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '', shift: '' })
  const [newStaff, setNewStaff] = useState({ name: '', role: '', phone: '' })
  const [newPatient, setNewPatient] = useState({ name: '', phone: '', complaint: '' })
  const [newAppointment, setNewAppointment] = useState({ patient: '', doctor: '', time: '', status: 'Menunggu' })
  const [newRecord, setNewRecord] = useState({ patient: '', diagnosis: '', note: '' })

  useEffect(() => {
    if (!user) {
      navigate('/')
      return
    }

    const loadData = async () => {
      try {
        const [patientsResponse, doctorsResponse, staffResponse, appointmentsResponse, transactionsResponse, recordsResponse] = await Promise.all([
          api.getPatients().catch(() => ({ data: [] })),
          api.getDoctors().catch(() => ({ data: [] })),
          api.getStaffs().catch(() => ({ data: [] })),
          api.getAppointments().catch(() => ({ data: [] })),
          api.getTransactions().catch(() => ({ data: [] })),
          api.getMedicalRecords().catch(() => ({ data: [] })),
        ])

        setPatients(Array.isArray(patientsResponse?.data) ? patientsResponse.data : [])
        setDoctors(Array.isArray(doctorsResponse?.data) ? doctorsResponse.data : [])
        setStaff(Array.isArray(staffResponse?.data) ? staffResponse.data : [])
        setAppointments(Array.isArray(appointmentsResponse?.data) ? appointmentsResponse.data : Array.isArray(appointmentsResponse) ? appointmentsResponse : [])
        setTransactions(Array.isArray(transactionsResponse?.data) ? transactionsResponse.data : [])
        setRecords(Array.isArray(recordsResponse?.data) ? recordsResponse.data : [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [navigate, user])

  const navItems = {
    admin: [
      { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { key: 'doctors', label: 'Data Dokter', icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
      { key: 'staff', label: 'Data Petugas', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { key: 'reports', label: 'Laporan', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    ],
    petugas: [
      { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { key: 'patients', label: 'Pendaftaran Pasien', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
      { key: 'appointments', label: 'Jadwal', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { key: 'transactions', label: 'Transaksi', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
    ],
    dokter: [
      { key: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { key: 'visits', label: 'Pemeriksaan', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
      { key: 'records', label: 'Rekam Medis', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    ],
  }
  const navItemsForRole = navItems[role] || navItems.admin

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  const handleAddDoctor = async (event) => {
    event.preventDefault()
    if (!newDoctor.name || !newDoctor.specialty) return
    const saved = await api.createDoctor(newDoctor)
    setDoctors([saved.data, ...doctors])
    setNewDoctor({ name: '', specialty: '', shift: '' })
  }

  const handleAddStaff = async (event) => {
    event.preventDefault()
    if (!newStaff.name || !newStaff.role) return
    const saved = await api.createStaff(newStaff)
    setStaff([saved.data, ...staff])
    setNewStaff({ name: '', role: '', phone: '' })
  }

  const handleAddPatient = async (event) => {
    event.preventDefault()
    if (!newPatient.name) return
    const saved = await api.createPatient(newPatient)
    setPatients([saved.data, ...patients])
    setNewPatient({ name: '', phone: '', complaint: '' })
  }

  const handleAddAppointment = async (event) => {
    event.preventDefault()
    if (!newAppointment.patient || !newAppointment.doctor) return
    const payload = {
      patient_name: newAppointment.patient,
      doctor_name: newAppointment.doctor,
      time: newAppointment.time,
      status: newAppointment.status,
      date: new Date().toISOString().slice(0, 10),
    }
    const saved = await api.createAppointment(payload)
    setAppointments([saved, ...appointments])
    setNewAppointment({ patient: '', doctor: '', time: '', status: 'Menunggu' })
  }

  const handleAddRecord = async (event) => {
    event.preventDefault()
    if (!newRecord.patient || !newRecord.diagnosis) return
    const payload = {
      patient_name: newRecord.patient,
      diagnosis: newRecord.diagnosis,
      note: newRecord.note,
    }
    const saved = await api.createMedicalRecord(payload)
    setRecords([saved.data, ...records])
    setNewRecord({ patient: '', diagnosis: '', note: '' })
  }

  const summaryCards = {
    admin: [
      { label: 'Dokter', value: doctors.length, color: 'blue' },
      { label: 'Petugas', value: staff.length, color: 'green' },
      { label: 'Pasien', value: patients.length, color: 'purple' },
      { label: 'Laporan', value: '12', color: 'yellow' },
    ],
    petugas: [
      { label: 'Pasien', value: patients.length, color: 'blue' },
      { label: 'Jadwal', value: appointments.length, color: 'green' },
      { label: 'Transaksi', value: transactions.length, color: 'purple' },
      { label: 'Pendapatan', value: `Rp ${transactions.reduce((sum, item) => sum + item.amount, 0).toLocaleString('id-ID')}`, color: 'yellow' },
    ],
    dokter: [
      { label: 'Pasien Hari Ini', value: patients.length, color: 'blue' },
      { label: 'Rekam Medis', value: records.length, color: 'green' },
      { label: 'Jadwal', value: appointments.length, color: 'purple' },
      { label: 'Status', value: 'Siap', color: 'yellow' },
    ],
  }[role]

  const renderContent = () => {
    if (role === 'admin') {
      switch (activeSection) {
        case 'doctors':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Tambah Dokter</h3>
                <form onSubmit={handleAddDoctor} className="grid gap-4 md:grid-cols-3">
                  <input value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Nama dokter" />
                  <input value={newDoctor.specialty} onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Spesialis" />
                  <input value={newDoctor.shift} onChange={(e) => setNewDoctor({ ...newDoctor, shift: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Shift" />
                  <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-white md:col-span-3">Simpan Dokter</button>
                </form>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Daftar Dokter</h3>
                <div className="space-y-3">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialty} · Shift {doctor.shift}</p>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Aktif</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        case 'staff':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Tambah Petugas</h3>
                <form onSubmit={handleAddStaff} className="grid gap-4 md:grid-cols-3">
                  <input value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Nama petugas" />
                  <input value={newStaff.role} onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Jabatan" />
                  <input value={newStaff.phone} onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Telepon" />
                  <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-white md:col-span-3">Simpan Petugas</button>
                </form>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Daftar Petugas</h3>
                <div className="space-y-3">
                  {staff.map((person) => (
                    <div key={person.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{person.name}</p>
                        <p className="text-sm text-gray-500">{person.role} · {person.phone}</p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">Siap</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        case 'reports':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Laporan Klinik</h3>
                  <button onClick={() => window.print()} className="rounded-lg bg-primary-600 px-4 py-2 text-white">Cetak Laporan</button>
                </div>
                <div className="overflow-hidden rounded-lg border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-3 py-2">Periode</th>
                        <th className="px-3 py-2">Pasien</th>
                        <th className="px-3 py-2">Transaksi</th>
                        <th className="px-3 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-3 py-2">Juni 2026</td>
                        <td className="px-3 py-2">24</td>
                        <td className="px-3 py-2">Rp 1.950.000</td>
                        <td className="px-3 py-2 text-green-600">Tertutup</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        default:
          return (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Ringkasan Operasional</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dokter aktif: {doctors.length}</li>
                  <li>• Petugas siap: {staff.length}</li>
                  <li>• Pasien terdaftar: {patients.length}</li>
                  <li>• Laporan tersedia untuk dicetak</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Agenda Hari Ini</h3>
                <div className="space-y-3">
                  {appointments.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.patient_name || item.patient || '-'}</p>
                        <p className="text-sm text-gray-500">{item.doctor_name || item.doctor || '-'} · {item.time}</p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
      }
    }

    if (role === 'petugas') {
      switch (activeSection) {
        case 'patients':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Pendaftaran Pasien</h3>
                <form onSubmit={handleAddPatient} className="grid gap-4 md:grid-cols-3">
                  <input value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Nama pasien" />
                  <input value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Telepon" />
                  <input value={newPatient.complaint} onChange={(e) => setNewPatient({ ...newPatient, complaint: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Keluhan" />
                  <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-white md:col-span-3">Daftarkan Pasien</button>
                </form>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Daftar Pasien</h3>
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.phone} · {patient.complaint}</p>
                      </div>
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">Terdaftar</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        case 'appointments':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Buat Jadwal</h3>
                <form onSubmit={handleAddAppointment} className="grid gap-4 md:grid-cols-4">
                  <input value={newAppointment.patient} onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Nama pasien" />
                  <input value={newAppointment.doctor} onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Nama dokter" />
                  <input value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Jam" />
                  <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-white">Simpan</button>
                </form>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Jadwal Hari Ini</h3>
                <div className="space-y-3">
                  {appointments.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.patient_name || item.patient || '-'}</p>
                        <p className="text-sm text-gray-500">{item.doctor_name || item.doctor || '-'} · {item.time}</p>
                      </div>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        case 'transactions':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Transaksi</h3>
                <div className="space-y-3">
                  {transactions.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{item.patient_name || item.patient || '-'}</p>
                        <p className="text-sm text-gray-500">{item.detail}</p>
                      </div>
                      <span className="font-semibold text-gray-900">Rp {Number(item.amount || 0).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        default:
          return (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Proses Hari Ini</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pasien terdaftar: {patients.length}</li>
                  <li>• Jadwal aktif: {appointments.length}</li>
                  <li>• Transaksi tercatat: {transactions.length}</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Antrian</h3>
                <div className="space-y-3">
                  {appointments.filter((item) => item.status === 'Menunggu').map((item) => (
                    <div key={item.id} className="rounded-lg border p-3">
                      <p className="font-medium text-gray-900">{item.patient_name || item.patient || '-'}</p>
                      <p className="text-sm text-gray-500">{item.doctor_name || item.doctor || '-'} · {item.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
      }
    }

    if (role === 'dokter') {
      switch (activeSection) {
        case 'visits':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Antrian Pasien</h3>
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <p className="text-sm text-gray-500">Keluhan: {patient.complaint}</p>
                      </div>
                      <button onClick={() => setActiveSection('records')} className="rounded-lg bg-primary-600 px-3 py-2 text-sm text-white">Periksa</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        case 'records':
          return (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Input Rekam Medis</h3>
                <form onSubmit={handleAddRecord} className="grid gap-4 md:grid-cols-3">
                  <input value={newRecord.patient} onChange={(e) => setNewRecord({ ...newRecord, patient: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Nama pasien" />
                  <input value={newRecord.diagnosis} onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Diagnosa" />
                  <input value={newRecord.note} onChange={(e) => setNewRecord({ ...newRecord, note: e.target.value })} className="rounded-lg border px-3 py-2" placeholder="Catatan" />
                  <button type="submit" className="rounded-lg bg-primary-600 px-4 py-2 text-white md:col-span-3">Simpan Rekam Medis</button>
                </form>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Riwayat Rekam Medis</h3>
                <div className="space-y-3">
                  {records.map((record) => (
                    <div key={record.id} className="rounded-lg border p-3">
                      <p className="font-medium text-gray-900">{record.patient_name || record.patient || '-'}</p>
                      <p className="text-sm text-gray-500">Diagnosa: {record.diagnosis}</p>
                      <p className="text-sm text-gray-500">Catatan: {record.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        default:
          return (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Pasien Hari Ini</h3>
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <div key={patient.id} className="rounded-lg border p-3">
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.complaint}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Aktivitas Rekam Medis</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Rekam medis tersedia: {records.length}</li>
                  <li>• Pemeriksaan dapat dilakukan langsung dari antrian</li>
                  <li>• Catatan pasien dapat disimpan dengan cepat</li>
                </ul>
              </div>
            </div>
          )
      }
    }

    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen overflow-hidden">
        <aside className="fixed z-30 flex h-full w-64 flex-col border-r border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-5">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Klinik Sehat</p>
              <p className="text-xs text-gray-400">Sistem Informasi</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Menu Utama</p>
            {navItemsForRole.map((item) => (
              <button key={item.key} onClick={() => setActiveSection(item.key)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${activeSection === item.key ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-gray-100 px-4 py-4">
            <div className="mb-2 flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100">
                <svg className="h-4 w-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="truncate text-xs capitalize text-gray-400">{getRoleLabel(role)}</p>
              </div>
            </div>
            <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Keluar
            </button>
          </div>
        </aside>

        <div className="ml-64 flex flex-1 flex-col overflow-auto">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{getRoleLabel(role)}</h1>
              <p className="text-xs text-gray-400">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" />
              </svg>
              Sistem aktif
            </div>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="rounded-2xl bg-primary-600 p-6 text-white">
              <p className="mb-1 text-sm opacity-80">Selamat datang kembali,</p>
              <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
              <p className="mt-1 text-sm capitalize opacity-70">{getRoleLabel(role)}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {summaryCards.map((card) => (
                <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
              ))}
            </div>

            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}
