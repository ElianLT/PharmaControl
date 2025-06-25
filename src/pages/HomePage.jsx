import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <div className="card max-w-3xl w-full text-center">
        <h1 className="mb-6">Bienvenido a MediCitas</h1>
        <p className="text-lg mb-8">
          Sistema de gestión de citas médicas para pacientes y profesionales de
          la salud. Organiza, programa y gestiona todas tus citas médicas en un
          solo lugar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/registro" className="btn btn-primary p-4 text-lg">
            Programar Nueva Cita
          </Link>
          <Link to="/lista" className="btn btn-secondary p-4 text-lg">
            Ver Citas Programadas
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="mb-4">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Programación Fácil
              </h3>
              <p className="text-gray-600">
                Crea citas médicas rápidamente con unos pocos clics
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Organización
              </h3>
              <p className="text-gray-600">
                Visualiza y gestiona todas tus citas en un solo lugar
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Recordatorios
              </h3>
              <p className="text-gray-600">
                Nunca pierdas una cita con nuestro sistema de recordatorios
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
