import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../services/appointmentService";
import FormInput from "../components/common/FormInput";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    descripcion: "",
    fecha: "",
    categoria: "General",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categorias = [
    "General",
    "Cardiología",
    "Dermatología",
    "Neurología",
    "Pediatría",
    "Oftalmología",
    "Ginecología",
    "Traumatología",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo debe contener letras y espacios";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingrese un email válido";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }

    if (!formData.fecha) {
      newErrors.fecha = "La fecha es obligatoria";
    } else {
      const selectedDate = new Date(formData.fecha);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.fecha = "La fecha no puede ser anterior a hoy";
      }
    }

    if (!formData.categoria) {
      newErrors.categoria = "Seleccione una categoría";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpiar el error del campo cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        await createAppointment(formData);
        setIsSubmitting(false);
        navigate("/lista");
      } catch (error) {
        setIsSubmitting(false);
        alert("Error al crear la cita: " + error.message);
      }
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (!/^[a-zA-ZÀ-ÿ\s\b]$/.test(key) && key.length === 1) {
      e.preventDefault(); // evita escribir números o símbolos
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h1 className="mb-6">Programar Nueva Cita</h1>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="Nombre del paciente"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
            error={errors.nombre}
            required={true}
            onKeyDown={handleKeyDown}
          />

          <FormInput
            label="Email de contacto"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            error={errors.email}
            required={true}
          />

          <div className="mb-4">
            <label htmlFor="descripcion" className="block mb-1 font-medium">
              Motivo de la cita <span className="text-red-500">*</span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              rows="3"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.descripcion ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describa brevemente el motivo de su cita"
              required={true}
            ></textarea>
            {errors.descripcion && (
              <p className="mt-1 text-red-500 text-sm">{errors.descripcion}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Fecha y hora de la cita"
              id="fecha"
              name="fecha"
              type="datetime-local"
              value={formData.fecha}
              onChange={handleChange}
              error={errors.fecha}
              required={true}
            />

            <div className="mb-4">
              <label htmlFor="categoria" className="block mb-1 font-medium">
                Especialidad médica <span className="text-red-500">*</span>
              </label>
              <select
                id="categoria"
                name="categoria"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.categoria ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.categoria}
                onChange={handleChange}
                required={true}
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.categoria && (
                <p className="mt-1 text-red-500 text-sm">{errors.categoria}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-secondary mr-3"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Programar Cita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}