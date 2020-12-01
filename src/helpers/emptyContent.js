const emptyContent = {
  pageName: '',
  tabTitle: '',
  metaDescription: '',
  pageHeader: '',
  subheader: '',
  textContent: [],
  pageImageUrl: '',
  externalMedia: {
    youTubeVideo: { header: '', link: '', channel: '' },
    scPlayer: { header: '', link: '', user: '' },
    instagram: { postCount: 6, profile: '', username: '' },
    scSongList: [],
  },
  lists: [],
  buttonLinkList: [],
  forms: [],
};

export const emptyForm = (fieldCount) => {
  const emptyLabelAry = Array.from({ length: fieldCount }, () => '');
  return {
    name: '',
    header: '',
    labels: emptyLabelAry,
  };
};

export const emptyList = (itemCount) => {
  const emptyItemAry = Array.from({ length: itemCount }, () => '');
  return {
    name: '',
    items: emptyItemAry,
  };
};
export default emptyContent;
