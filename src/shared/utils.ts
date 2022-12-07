import { useState, useEffect } from 'react';

export const getBaseUrl = (fullUrl: string) => {
  const arr = fullUrl.split('/');
  const baseUrl = `${arr[0]}//${arr[2]}`;

  return baseUrl;
};

export const useClientOnly = () => {
  const [clientOnly, setClientOnly] = useState(false);

  useEffect(() => {
    setClientOnly(true);
  }, []);

  return clientOnly;
};
