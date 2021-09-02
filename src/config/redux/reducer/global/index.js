const initialStateRoot = {
  loading: false,
  refresh: false,
};

const global = (state = initialStateRoot, action) => {
  return state;
};

export default global;
