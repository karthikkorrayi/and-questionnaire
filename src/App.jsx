import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import FormPage from './pages/FormPage'
import SuccessPage from './pages/SuccessPage'
import SubmissionsPage from './pages/SubmissionsPage'

export default function App() {
  // In-session submissions log (cleared on refresh — permanent storage is Google Sheets)
  const [submissions, setSubmissions] = useState([])

  const handleSubmitSuccess = (form) => {
    setSubmissions((prev) => [
      ...prev,
      { ...form, id: Date.now(), submittedAt: new Date().toISOString() },
    ])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <Header submissionCount={submissions.length} />

      <Routes>
        <Route
          path="/"
          element={<FormPage onSubmitSuccess={handleSubmitSuccess} />}
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route
          path="/submissions"
          element={<SubmissionsPage submissions={submissions} />}
        />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
