import { useState } from 'react'
import { Link } from 'react-router-dom'
import { downloadPDF } from '../lib/pdfGenerator'
import styles from './SubmissionsPage.module.css'

export default function SubmissionsPage({ submissions }) {
  const [downloading, setDownloading] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase()
    return (
      !q ||
      (s.fullName || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.city || '').toLowerCase().includes(q) ||
      (s.configuration || '').toLowerCase().includes(q)
    )
  })

  const handleDownload = async (submission) => {
    setDownloading(submission.id)
    try {
      await downloadPDF(submission)
    } catch (e) {
      console.error(e)
    }
    setDownloading(null)
  }

  return (
    <div className={styles.wrap}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <span className={styles.eyebrow}>Admin Dashboard</span>
          <h1 className={styles.title}>Submissions</h1>
          <p className={styles.desc}>
            {submissions.length} response{submissions.length !== 1 ? 's' : ''} received
          </p>
        </div>
        <Link to="/" className={styles.btnPrimary}>+ New Submission</Link>
      </div>

      {/* Search */}
      {submissions.length > 0 && (
        <div className={styles.searchWrap}>
          <input
            type="search"
            placeholder="Search by name, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          {search && (
            <span className={styles.searchCount}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Empty state */}
      {submissions.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📋</div>
          <p className={styles.emptyTitle}>No submissions yet</p>
          <p className={styles.emptyDesc}>
            Once clients fill out the questionnaire, their responses will appear here.
          </p>
          <Link to="/" className={styles.btnPrimary}>Open Questionnaire →</Link>
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Contact</th>
                <th>Property</th>
                <th>Budget</th>
                <th>Style</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id}>
                  <td className={styles.num}>{i + 1}</td>
                  <td>
                    <div className={styles.clientName}>{s.fullName || '—'}</div>
                    <div className={styles.clientSub}>{s.city || ''}</div>
                  </td>
                  <td>
                    <div>{s.phone || '—'}</div>
                    <div className={styles.clientSub}>{s.email || ''}</div>
                  </td>
                  <td>
                    <div>{s.configuration || '—'}</div>
                    <div className={styles.clientSub}>{s.area ? `${s.area} sq ft` : ''}</div>
                  </td>
                  <td>
                    <span className={styles.badge}>{s.budgetRange || '—'}</span>
                  </td>
                  <td className={styles.styleTd}>
                    {(s.stylePreference || []).slice(0, 2).join(', ') || '—'}
                  </td>
                  <td className={styles.dateTd}>
                    {s.submittedAt
                      ? new Date(s.submittedAt).toLocaleDateString('en-IN', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })
                      : '—'}
                  </td>
                  <td>
                    <button
                      className={styles.btnDownload}
                      onClick={() => handleDownload(s)}
                      disabled={downloading === s.id}
                      title="Download PDF"
                    >
                      {downloading === s.id ? '…' : '↓ PDF'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No search results */}
      {submissions.length > 0 && filtered.length === 0 && (
        <div className={styles.noResults}>
          No submissions match "<strong>{search}</strong>"
        </div>
      )}
    </div>
  )
}
