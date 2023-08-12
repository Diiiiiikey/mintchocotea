import { getTagsSearch } from 'apis/api/tags';
import { useEffect, useState } from 'react';

export const getSearchFn = (tag, page) => {
  const [tagSearchCommissions, setTagSearchCommissions] = useState(null);
  const [tagCount, setTagCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const size = 20;

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await getTagsSearch(tag, size, page);
      if (status < 300) {
        setTagSearchCommissions(data.data);
        setTagCount(data.pageInfo.totalElements);
        setLoading(false);
      }
    };
    fetch();
  }, [setTagSearchCommissions, setTagCount, setLoading, tag]);
  return { tagSearchCommissions, tagCount, loading };
};
