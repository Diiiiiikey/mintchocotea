import { getreviews } from 'apis/api/reveiw';
import { useState, useEffect } from 'react';

export const getreviewsFn = id => {
  const [reviews, setreviews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await getreviews(id);
      if (status < 300) {
        setreviews(data.data);
        setLoading(false);
      }
    };
    fetch();
  }, [setreviews, setLoading]);
  return { reviews, loading };
};
