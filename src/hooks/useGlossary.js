import { useState, useEffect } from 'react';
import { glossaryAPI } from '../utils/api';

export const useGlossary = (params = {}) => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setLoading(true);
        const response = await glossaryAPI.getAll(params);
        setTerms(response.data);
        setMeta(response.meta);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Failed to fetch glossary terms');
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [JSON.stringify(params)]);

  return { terms, loading, error, meta };
};

export const useGlossarySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await glossaryAPI.search(query);
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
};