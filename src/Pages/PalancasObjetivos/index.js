import React, { Component, Fragment } from "react";
import "./Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import YearPicker from "react-year-picker";
import { connect } from "react-redux";
import * as Placas_Objetivos from "../../actions/HomeAction";
import Table from "../../Components/TableComponent";
import { IoIosAddCircleOutline } from "react-icons/io";
import Spinner from "../../General/Spinner";
import Fatal from "../../General/Fatal";
import Success from "../../General/Success";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineReload } from "react-icons/ai";

import Button from "../../Components/ButtonComponent";

/* const validate = (values) => {
  const errors = {};

  if (!values.textObjetivo) {
    errors.textObjetivo = true;
  }

  if (!values.textPalanca) {
    errors.textPalanca = true;
  }

  return errors;
}; */

class PalancaObjetivos extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    date: "",
    textObjetivo: "",
    textPalanca: "",
    errors: {},
    value: "",
    id: "",
    text: "",
    suggestVar: false,
    type: 1,
  };

  componentDidMount() {}
  componentDidUpdate() {
    if (!this.props.busqueda) {
      const { consultar_items } = this.props;
      consultar_items(this.state.date);
    }

    console.log(this.props)
  }
  componentWillUnmount() {}

  handleChangeEstado = (event) => {
    this.setState({ type: event.target.value });
  };
  handleChange(date) {
    const { consultar_items } = this.props;

    this.setState({ date: date });
    consultar_items(date);
  }


  create(id, description, year_P_O, e) {
    e.preventDefault();
    const { createItem } = this.props;
    const data = {
      type_id: id,
      description: description,
      year_P_O: year_P_O,
    };

    createItem(data);
  }

  mostrarAccion = () => {
    const { error, cargando, success } = this.props;
    if (cargando) {
      return <Spinner />;
    }

    if (success) {
      return <Success mensaje={success} />;
    }

    if (error) {
      return <Fatal mensaje={error} />;
    }
    return false;
  };
  handleChangeItems(e, index, dataType, value, type_id) {
    this.props.handleChangeItem(index, dataType, value, type_id);
  }

  handleEditar = (e, value, id) => {
    const { editar } = this.props;
    const UploadDatos = {
      description: value,
    };
    e.preventDefault();

    editar(UploadDatos, id);
  };

  eliminar = (id, e) => {
    const { eliminar } = this.props;

    eliminar(id);
  };
  reporteObjetivos = () => {
    const { objetivos } = this.props;
    console.log(objetivos);
    const ponerInfo = () =>
      objetivos.map((reporte, key) => (
        <tr key={key}>
          <td>{reporte.id}</td>
          <td>
            <input
              type="text"
              style={{ width: "100%" }}
              value={this.props.objetivos[key].description || ""}
              onChange={(e) =>
                this.handleChangeItems(e, key, "description", e.target.value, 1)
              }
            />
          </td>
          <td>
            <div className="d-flex">
              {" "}
              <span>
                <AiOutlineReload
                  size={"32px"}
                  onClick={(e) =>
                    this.handleEditar(
                      e,
                      this.props.objetivos[key].description,
                      reporte.id
                    )
                  }
                />
              </span>
              <span>
                <MdDeleteForever
                  size={"32px"}
                    onClick={e => this.eliminar(reporte.id)}
                />
              </span>
            </div>
          </td>
        </tr>
      ));

    return ponerInfo();
  };

  reportePalancas = () => {
    const { palancas } = this.props;
    const ponerInfo = () =>
      palancas.map((reporte, key) => (
        <tr key={key}>
          <td>{reporte.id}</td>
          <td>
            <input
              type="text"
              style={{ width: "100%" }}
              value={this.props.palancas[key].description || ""}
              onChange={(e) =>
                this.handleChangeItems(e, key, "description", e.target.value, 2)
              }
            />
          </td>
          <td>
            <div className="d-flex">
              {" "}
              <span>
                <AiOutlineReload
                  size={"32px"}
                  onClick={(e) =>
                    this.handleEditar(
                      e,
                      this.props.palancas[key].description,
                      reporte.id
                    )
                  }
                />
              </span>
              <span>
                <MdDeleteForever
                  size={"32px"}
                   onClick={e => this.eliminar(reporte.id)}
                />
              </span>
            </div>
          </td>
        </tr>
      ));

    return ponerInfo();
  };

  reporteItem = () => {
    const { item } = this.props;

    const ponerInfo = () =>
    item.map((reporte, key) => (
        <tr key={key}>
          <td>{reporte.id}</td>
          <td>
          {reporte.description}
          </td>
          <td>
          {reporte.year_P_O}
          </td>
        </tr>
      ));

    return ponerInfo();
  };

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];

    const { consultarSuggestions } = this.props;
    const dataSuggestion = {
      data: value,
      type: this.state.type,
    };
    if (value.length > 2) {
      this.setState(() => ({ suggestVar: true }));
      consultarSuggestions(dataSuggestion);
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      suggestions =
        inputLength === 0
          ? []
          : this.props.SuggestionDatabase.filter(
              (lang) =>
                lang.name.toLowerCase().slice(0, inputLength) === inputValue
            );
    } else {
      this.setState(() => ({ suggestVar: false,id:'' }));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  suggestionSelected(value) {
    this.setState(() => ({
      text: value.name,
      id: value.id,
      suggestVar: false,
    }));
    const { consultar_item_id } = this.props;
    consultar_item_id(value.id)
  }

  renderSuggestions() {
    if (!this.state.suggestVar) {
      return null;
    }
    return (
      <div className="srchList">
        {this.props.SuggestionDatabase.map((item, key) => (
          <li key={key} onClick={() => this.suggestionSelected(item)}>
            {item.name}
          </li>
        ))}
      </div>
    );
  }
  render() {
    const {  text } = this.state;
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <h2 style={{ textAlign: "center" }}>Selecciona un año</h2>
              <YearPicker onChange={this.handleChange} />
              <h2 style={{ textAlign: "center" }}>buscador</h2>
              <select
                className="select__item"
                onChange={this.handleChangeEstado}
              >
                <option value="1">Objetivos</option>
                <option value="2">Palanca</option>
              </select>
              <div className="input">
                <input
                  className="input__autocomplete__Text perfil__Search__text"
                  value={text}
                  onChange={this.onTextChanged}
                  type="text"
                  placeholder="Buscar Item"
                  required
                />
              </div>
              <div className="col-md-12 justify-content-md-center input__autocomplete__SuggestionText">
                {this.renderSuggestions()}
              </div>
       
              {this.mostrarAccion()}
              <Button name="Salir" redirect="/" componentClass="P__button"/>
            </div>

            <div className="col-md-9">
              {this.state.date ? (
                <Fragment>

                    {this.state.id?   <Table
                ponerReporte={this.reporteItem()}
                Tittle="Item"
              />:
                    <Fragment>
                    <Table
                ponerReporte={this.reporteObjetivos()}
                Tittle="Objetivos"
              />

              <div className="item_center">
                {" "}
                <input
                  style={{ width: "80%" }
                  }
                  type="text"
                  value={this.state.textObjetivo}
                  onChange={(e) => {
                    this.setState({ textObjetivo: e.target.value });
                  }}
                />
                <IoIosAddCircleOutline
                  size={"32px"}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    this.create(
                      1,
                      this.state.textObjetivo,
                      this.state.date,
                      e
                    );
                  }}
                />{" "}
              </div>

              <Table
                ponerReporte={this.reportePalancas()}
                Tittle="Palancas"
              />
              <div className="item_center">
                {" "}
                <input
                style={{ width: "80%" }
            }
                  type="text"
                  onChange={(e) => {
                    this.setState({ textPalanca: e.target.value });
                  }}
                />
                <IoIosAddCircleOutline
                  size={"32px"}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    this.create(
                      2,
                      this.state.textPalanca,
                      this.state.date,
                      e
                    );
                  }}
                />{" "}
              </div>
                </Fragment>}
               
                </Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

//conectar tareas al reducer y traer las acciones del tareas action
//conectar tareas al reducer y traer las acciones del tareas actions
const mapStateToProps = (reducers) => {
  return reducers.HomeReducer;
};

export default connect(mapStateToProps, Placas_Objetivos)(PalancaObjetivos);
