import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import RegistrationPage from './pages/RegistrationPage'
import AppointmentsListPage from './pages/AppointmentsListPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<RegistrationPage />} />
          <Route path="/lista" element={<AppointmentsListPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App