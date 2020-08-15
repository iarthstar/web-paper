
import TYPE from './../Types/Page';

const initialState = {
  currentPage: null,
  allPages: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TYPE.SAVE_PAPER:
      return { ...state, backdrop: payload < 0 ? 0 : payload };

    default:
      return state;
  }
};