import { useState, useEffect } from 'react';
import { templatesAPI } from '../utils/api';

export const useTemplates = (params = {}) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await templatesAPI.getAll(params);
        setTemplates(response.data);
        setMeta(response.meta);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Failed to fetch templates');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [JSON.stringify(params)]);

  return { templates, loading, error, meta };
};

export const useTemplate = (id) => {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await templatesAPI.getById(id);
        setTemplate(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Failed to fetch template');
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id]);

  return { template, loading, error };
};