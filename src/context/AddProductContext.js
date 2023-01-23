const { createContext } = require("react");

const AddProductContext = createContext({
  submit: () => {},
  cancel: () => {},
  form: {
    title: { text: "", isValid: false },
    price: { text: "", isValid: false },
    discount: { text: "", isValid: false },
    description: { text: "", isValid: false },
    features: [],
    isFormValid: false,
  },
  setForm: () => {},
  msg: { title: "", description: "", price: "" },
  setMsg: () => {},
  files: [],
  setFiles: () => {},
  deletedImages: {},
  deletedVideos: {},
  setDeletedImages: () => {},
  setDeletedVideos: () => {},
});

export default AddProductContext;
