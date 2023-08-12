import { instance } from 'apis/utils';

export const getCommissions = async (filter, count) => {
  try {
    const res = await instance.get(`/commission?page=1&size=${count}&sort=${filter},desc`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};
