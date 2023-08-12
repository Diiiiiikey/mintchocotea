export const imageProcess = images => {
  return images.map(url => ({ url })).filter((url, idx) => idx % 2 === 1);
};
