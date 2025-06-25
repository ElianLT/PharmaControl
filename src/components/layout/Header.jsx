import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-600 hover:text-blue-500";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-700">
              MediCitas
            </Link>
          </div>
          <nav className="flex space-x-6">
            <Link to="/" className={`${isActive("/")} font-medium py-2`}>
              Inicio
            </Link>
            <Link
              to="/registro"
              className={`${isActive("/registro")} font-medium py-2`}
            >
              Nueva Cita
            </Link>
            <Link
              to="/lista"
              className={`${isActive("/lista")} font-medium py-2`}
            >
              Citas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
