import { formatDate } from '../../utils/dateUtils';

const AppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{appointment.nombre}</h2>
          <p className="text-gray-600">{appointment.email}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
          {appointment.categoria}
        </span>
      </div>
      
      <div className="mt-4">
        <p className="mb-2 font-medium">Motivo de la cita:</p>
        <p className="text-gray-700">{appointment.descripcion}</p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-gray-600">
          <span className="font-medium">Fecha y hora:</span>{' '}
          {formatDate(appointment.fecha)}
        </p>
      </div>
    </div>
  );
};

export default AppointmentCard;