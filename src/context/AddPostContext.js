const { createContext } = require("react");

const AddPostContext = createContext({
  submit: () => {},
  cancel: () => {},
  form: {
    title: { text: "", isValid: false },
    subTitle: { text: "", isValid: false },
    description: { text: "", isValid: false },
    isFormValid: false,
  },
  setForm: () => {},
  msg: { title: "", description: "" },
  setMsg: () => {},
  files: [],
  setFiles: () => {},
  deletedImages: {},
  deletedVideos: {},
  setDeletedImages: () => {},
  setDeletedVideos: () => {},
});

export default AddPostContext;
