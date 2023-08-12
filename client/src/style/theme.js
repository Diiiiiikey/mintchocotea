const deviceSizes = {
  mobile: '500px',
  tablet: '800px',
  laptop: '1024px',
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (max-width: ${deviceSizes.laptop})`,
};

const fontSizes = {
  s: '12px',
  content: '14px',
  base: '16px',
  l: '18px',
  zl: '20px',
  xl: '24px',
  title: '28px',
  carousel: '32px',
};

const sizes = {
  xs: '1.5rem',
  s: '2rem',
  mm: '3rem',
  base: '7rem',
  m: '8rem',
  l: '10rem',
  xl: '16rem',
  xxl: '40rem',
};

const colors = {
  black: '#000',
  white: '#fff',
  gray_1: '#cecece',
  gray_2: '#ececec',
  gray_3: '#666666',
  gray_4: '#f6f6f6',
  mint_1: '#9fe4c5',
  mint_2: '#cae4d8',
  choco_1: '#3f321d',
  choco_2: '#8e785c',
  red: '#ff0000',
  transparent: 'transparent',
};

const radiuses = {
  half: '10rem',
  base: '0.25rem',
};

const imgStyles = {
  user: '1 / 1',
  commission: '4 / 3',
  carousel: '2 / 1',
};

const buttons = {
  header: {
    backgroundColor: 'transparent',
    border: 'none',
    bold: 'bold',
    size: fontSizes.base,
    color: colors.gray_3,
  },
  write: {
    backgroundColor: colors.mint_1,
    border: 'none',
    size: fontSizes.base,
    color: colors.white,
    padding: '0.5rem 1.5rem',
    borderRadius: radiuses.base,
    margin: '1rem 0',
  },
  edit: {
    backgroundColor: colors.gray_2,
    border: 'none',
    size: fontSizes.base,
    padding: '0.5rem 1.5rem',
    borderRadius: radiuses.base,
  },
  long: {
    backgroundColor: colors.mint_1,
    border: 'none',
    size: fontSizes.base,
    color: colors.white,
    padding: '1rem 0',
    borderRadius: radiuses.base,
    width: '100%',
  },
  long_2: {
    backgroundColor: colors.mint_1,
    border: `1px solid ${colors.mint_1}`,
    size: fontSizes.base,
    color: colors.white,
    padding: '1rem 0',
    borderRadius: `0 0 0 ${radiuses.base}`,
    width: '100%',
  },
  long_3: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray_1}`,
    size: fontSizes.base,
    color: colors.mint_1,
    padding: '1rem 0',
    borderRadius: `0 0 ${radiuses.base} 0 `,
    width: '100%',
  },
};

const typos = {
  title_1: {
    size: fontSizes.title,
    color: colors.choco_1,
    bold: 'bold',
  },
  title_2: {
    size: fontSizes.zl,
    color: colors.gray_3,
    bold: 'bold',
  },
  carousel: {
    size: fontSizes.carousel,
    color: colors.choco_1,
    space: 'nowrap',
    textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
  },
  commissions: {
    size: fontSizes.base,
    height: sizes.xs,
    line: 1,
  },
  name: {
    size: fontSizes.zl,
    color: colors.mint_1,
    bold: 'bold',
  },
  name_2: {
    size: fontSizes.base,
    color: colors.mint_1,
  },
  base: {
    size: fontSizes.base,
    color: colors.gray_3,
  },
  base_2: {
    size: fontSizes.content,
    color: colors.gray_3,
  },
  base_3: {
    size: fontSizes.s,
    color: colors.gray_3,
  },
  err: {
    size: fontSizes.s,
    color: colors.red,
  },
};

const images = {
  commissions: {
    imgStyle: imgStyles.commission,
    borderRadius: radiuses.base,
    border: '1px solid #ececec',
    hover: 'contain',
  },
  carousel: {
    imgStyle: imgStyles.carousel,
    borderRadius: radiuses.base,
    objectFit: 'contain',
  },
  postCarousel: {
    imgStyle: imgStyles.commission,
    borderRadius: radiuses.base,
    border: '1px solid #cecece',
    width: sizes.base,
  },
  smallCarousel: {
    imgStyle: imgStyles.commission,
    borderRadius: radiuses.base,
    border: '1px solid #cecece',
    hover: 'contain',
  },
  createPost: {
    imgStyle: imgStyles.commission,
    objectFit: 'contain',
    border: '1px solid #cecece',
  },
};

const theme = {
  fontSizes,
  imgStyles,
  colors,
  radiuses,
  sizes,
  device,
  buttons,
  typos,
  images,
};

export default theme;
