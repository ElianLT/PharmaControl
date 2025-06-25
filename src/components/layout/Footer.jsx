
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white">MediCitas</h2>
            <p className="text-gray-300">Sistema de gestión de citas médicas</p>
          </div>
          <div className="text-gray-300 text-sm">
            © {new Date().getFullYear()} MediCitas. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
