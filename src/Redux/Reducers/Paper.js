
import TYPE from './../Types/Paper';

const initialState = {
  currentPaper: null,
  currentPaperIndex: 0,
  allPapers: []
};

let index = 0;
let temp;

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case TYPE.SAVE_PAPER:
      temp = [...state.allPapers];
      temp[state.currentPaperIndex] = payload;
      return { ...state, allPapers: temp, currentPaper: payload };

    case TYPE.NEW_PAPER:
      if (state.currentPaper !== null && state.currentPaper !== '["Layer",{"applyMatrix":true}]'){
        temp = [...state.allPapers, null];
        index =  temp.length - 1;
        return { ...state, allPapers: temp, currentPaper: null, currentPaperIndex: index };
      } else return {...state};

    case TYPE.PREV_PAPER:
      index = state.currentPaperIndex - 1;
      if (index > -1) {
        return { ...state, currentPaper: state.allPapers[index], currentPaperIndex: index };
      } else return {...state};

    case TYPE.NEXT_PAPER:
      index = state.currentPaperIndex + 1;
      if (index < state.allPapers.length) {
        return { ...state, currentPaper: state.allPapers[index], currentPaperIndex: index };
      } else return {...state};

    default:
      return state;
  }
};