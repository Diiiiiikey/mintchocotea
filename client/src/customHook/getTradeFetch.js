import { useEffect, useState } from 'react';
import { getAuthorTrades, getMemberTrades, getTrade } from 'apis/api/trade';

export const getTradesFn = value => {
  const [trades, setTrades] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      let data;
      if (value.email) {
        data = await getAuthorTrades(value);
      } else {
        data = await getMemberTrades(value);
      }
      setTrades(data.data);
    };
    fetch();
  }, []);

  const result = [];

  if (trades) {
    result.push({ pending: trades.filter(el => el.status === '수락대기') });
    result.push({ proceeding: trades.filter(el => el.status === '진행 중') });
    result.push({ done: trades.filter(el => el.status === '완료') });
    result.push({ reject: trades.filter(el => el.status === '거절') });
  }

  return result;
};

export const getTradeFn = id => {
  const [trades, setTrades] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, status } = await getTrade(id);
      if (status < 300) {
        setTrades(data);
        setLoading(false);
      }
    };
    fetch();
  }, [setTrades, setLoading]);
  return { trades, loading };
};
