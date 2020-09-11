import {
  CARGANDO,
  ERROR,
  SUCCESS,
  MODAL_UP,
  CONSULTAR_OBJETIVOS,
  CONSULTAR_PALANCAS,
  CONSULTARS,
  CONSULTAR_ID,
  BUSQUEDA,
} from "../types/HomeTypes";

const INITIAL_STATE = {
  item: [],
  showModal: false,
  cargando: false,
  error: "",
  success: "",
  objetivos: [],
  palancas: [],
  busqueda: true,
  SuggestionDatabase: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSULTAR_ID:
      return {
        ...state,
        item: action.payload,
      };
    case CONSULTAR_OBJETIVOS:
      return {
        ...state,
        objetivos: action.payload,
      };
    case CONSULTARS:
      return {
        ...state,
        SuggestionDatabase: action.payload,
      };
    case BUSQUEDA:
      return {
        ...state,
        busqueda: action.payload,
      };
    case CONSULTAR_PALANCAS:
      return {
        ...state,
        palancas: action.payload,
      };

    case MODAL_UP:
      return {
        ...state,
        showModal: action.payload,
      };

    case CARGANDO:
      return { ...state, cargando: true, success: "", error: "" };

    case ERROR:
      return { ...state, error: action.payload, cargando: false, success: "" };

    case SUCCESS:
      return { ...state, success: action.payload, cargando: false, error: "" };

    default:
      return state;
  }
};
