import { useState, useEffect } from "react";
import { getAppointments } from "../services/appointmentService"
import AppointmentCard from "../components/ui/AppointmentCard";

export default function AppointmentsListPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar las citas. Por favor, intente nuevamente.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((app) => app.categoria === filter);

  const categories = [
    "all",
    ...new Set(appointments.map((app) => app.categoria)),
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1>Citas Programadas</h1>

        <div className="flex items-center">
          <label htmlFor="filter" className="mr-2 font-medium">
            Filtrar por especialidad:
          </label>
          <select
            id="filter"
            className="input max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas</option>
            {categories
              .filter((cat) => cat !== "all")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-3 text-gray-600">Cargando citas...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">
            {filter === "all"
              ? "No hay citas programadas"
              : `No hay citas programadas para la especialidad ${filter}`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}