import { instance } from 'apis/utils';

export const postTrade = async value => {
  try {
    const res = await instance.post(`/trade`, value);
    return { status: res.status, memberId: res.data.memberId };
  } catch (err) {
    console.log(err);
  }
};

export const getTrade = async id => {
  try {
    const res = await instance.get(`/trade/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAuthorTrades = async data => {
  try {
    const res = await instance.get(
      `/trade/author?page=${data.page}&size=20&sort=trade_id,desc&authorEmail=${data.email}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getMemberTrades = async data => {
  try {
    const res = await instance.get(
      `/trade?page=${data.page}&size=20&sort=trade_id,asc&memberId=${data.memberId}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const patchTradeStatus = async (data, id) => {
  try {
    const res = await instance.patch(`/trade/${id}`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
