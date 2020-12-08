import moment from 'moment';

export const Types = {
  LOADING: 'LOADER',
  CLEAR: 'CLEAR',
  COMICS: 'COMICS',
  UPDATEDATE: 'UPDATEDATE',
};

export const initialState = {
  loading: false,
  comics: [],
  updateDate: moment(new Date()),
};

export function loader(state = initialState, action) {
  switch (action.type) {
    case Types.LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case Types.CLEAR:
      return {
        ...state,
        loading: false,
      };
    case Types.COMICS:
      return {
        ...state,
        comics: [...action.payload],
      };
    case Types.UPDATEDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return { ...state };
  }
}
