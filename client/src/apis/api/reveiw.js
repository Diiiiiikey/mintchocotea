import { instance } from 'apis/utils';

export const getreviews = async id => {
  try {
    const res = await instance.get(`review?page=1&size=10&sort=reviewId,desc&commissionId=${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const postReview = async data => {
  console.log(data);
  try {
    const res = await instance.post(`/review`, data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
