import { useEffect, useState } from 'react';
import { getCommissions } from 'apis/api/commissions';
import { getCommission } from 'apis/api/commission';
import { getTags, getTagsSearch } from 'apis/api/tags';

const randomNum = Math.floor(Math.random() * 20);

export const getCommissionsFn = (filter, count) => {
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getCommissions(filter, count);
      setCommissions(data);
    };
    fetch();
  }, [setCommissions]);

  return commissions;
};

export const getCommissionFn = id => {
  const [commission, setCommission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await getCommission(id);
      if (status < 300) {
        setCommission(data);
        setLoading(false);
      }
    };
    fetch();
  }, [setCommission, setLoading]);

  return { commission, loading };
};

export const getTagsCommissionsFn = () => {
  const [tag, setTag] = useState(null);
  const [tagsCommissions, setTagsCommissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await getTags();
      if (status < 300) {
        const tagName = data.data[randomNum].tagName;
        setTag(tagName);
        console.log(tag);
      }
    };
    const fetchTwo = async () => {
      const { data, status } = await getTagsSearch(tag);
      if (status < 300 && data.data.length > 0) {
        setTagsCommissions(data.data);
        setLoading(false);
      }
    };
    fetch();
    if (tag) {
      fetchTwo();
    }
  }, [tag, loading]);
  return { tagsCommissions, tag, loading };
};
