import { useState, useEffect } from 'react';
import api from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const createProject = async (projectData) => {
    const res = await api.post('/projects', projectData);
    setProjects(prev => [...prev, res.data]);
  };

  return { projects, loading, createProject };
}