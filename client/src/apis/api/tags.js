import { instance } from 'apis/utils';

export const getTags = async () => {
  try {
    const res = await instance.get(`/tags?page=1&size=100&sort=tagId,desc`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getTagsSearch = async tag => {
  try {
    const res = await instance.get(`commission/tags=${tag}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
