const emptyContent = {
  pageName: "",
  tabTitle: "",
  metaDescription: "",
  pageHeader: "",
  subheader: "",
  textContent: [],
  pageImageUrl: "",
  externalMedia: {
    youTubeVideo: { header: "", link: "" },
    scPlayer: { header: "", link: "" },
    scSongList: [],
  },
  lists: [],
  buttonLinks: [],
  forms: [],
}

export const emptyForm = (fieldCount) => {
  const emptyLabelAry = Array.from({length: fieldCount}, () => "");
  return {
    formName: "",
    formHeader: "",
    fieldLabels: emptyLabelAry,
  }
}

export default emptyContent;