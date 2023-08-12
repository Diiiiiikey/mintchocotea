import { instance, imgInstance } from 'apis/utils';

export const getCommission = async id => {
  try {
    const res = await instance.get(`/commission/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const postCommission = async data => {
  try {
    const res = await imgInstance.post('/commission', data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const patchCommission = async (data, id) => {
  try {
    const res = await imgInstance.patch(`/commission/${id}`, data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCommission = async id => {
  try {
    const res = await instance.delete(`/commission/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
