import axios from "axios";
import * as actions from "store/api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegin.type) return next(action);

    next(action);

    const { url, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000/api",
        method: "GET",
        url: url,
      });
      dispatch({ type: onSuccess, payload: response.data });
    } catch (ex) {
      dispatch({ type: onError, payload: ex.message });
    }
  };

export default api;
