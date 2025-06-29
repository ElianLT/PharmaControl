import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { patientsService } from '../services/patients';
import { resultsService } from '../services/results';
import { filesService } from '../services/files';
import { Users, FileText, Upload, Activity } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalEvaluations: 0,
    totalFiles: 0,
    recentPatients: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [patients, evaluations, files] = await Promise.all([
          patientsService.getPatients(),
          resultsService.getAll(),
          filesService.getAll()
        ]);

        setStats({
          totalPatients: patients.length,
          totalEvaluations: evaluations.length,
          totalFiles: files.length,
          recentPatients: patients.slice(0, 5)
        });
      } catch (error) {
        console.error('Error al obtener estadísticas del dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getGenderText = (gender) => {
    switch(gender) {
      case 'Male': return 'Masculino';
      case 'Female': return 'Femenino';
      case 'Other': return 'Otro';
      default: return gender || 'No especificado';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }


    const quickActions = [
    {
      title: 'Gestionar Pacientes',
      description: 'Ver, agregar y editar pacientes',
      icon: Users,
      href: '/patients',
      color: 'bg-blue-500'
    },
    {
      title: 'Procesar Archivos',
      description: 'Subir y convertir archivos .txt',
      icon: Upload,
      href: '/files',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Panel Principal</h1>
      <p className="mt-2 text-gray-600">Bienvenido al sistema de evaluación postural</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Pacientes</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPatients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Evaluaciones</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEvaluations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Archivos Procesados</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
