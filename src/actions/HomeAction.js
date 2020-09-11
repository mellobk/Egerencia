import axios from "axios";
import {
  CARGANDO,
  ERROR,
  SUCCESS,
  MODAL_UP,
  CONSULTAR_OBJETIVOS,
  CONSULTAR_PALANCAS,
  BUSQUEDA,
  CONSULTARS,
  CONSULTAR_ID
} from "../types/HomeTypes";

import URL from '../../src/General/url'

//acciones para tareas


  export const modal_change = (data) => async (dispatch) => {
  
    
        dispatch({

        
            type: MODAL_UP,
            payload: data
        
        })

  };




export const createItem = (data) => async(dispatch)=>{
    

    
  dispatch({

      type: CARGANDO
      
  
  })

  try {

  

      let json = JSON.stringify(data)
      let params = json;

      

      let headers = {
          "Content-Type": "application/json",
          'Authorization': window.localStorage.getItem('token')
      }
      const respuesta = await axios.post(URL+'createItem', params,{
          headers: headers
      })
  

      if(respuesta.data.status==='success'){

        dispatch({
  
          type: SUCCESS,
          payload: respuesta.data.message
  
  
      })


      dispatch({

        type: BUSQUEDA,
        payload: false
    
    
    })
  
      }
      if(respuesta.data.status==='error'){
        dispatch({
  
          type: ERROR,
          payload: respuesta.data.message.description[0]
  
  
      })
      }

      
  } catch (error) {
      
      if(error.message==="Request failed with status code 401"){
          window.localStorage.setItem('token','')
          window.localStorage.setItem('userData','')
      }else{
          dispatch({

              type: ERROR,
              payload: 'Intente mas tarde'
              
          
          })
      }
  }
}


export const consultar_items = (date) => async (dispatch) => {

  try {
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        
    };
    const respuesta = await axios.get(
        URL+`getItemsByYear/${date}`,
      {
        headers: headers,
      }
    );

    
 
    if(respuesta.data.status==='success'){

      dispatch({

        type: CONSULTAR_OBJETIVOS,
        payload: respuesta.data.objetivos


    })

    dispatch({

      type: CONSULTAR_PALANCAS,
      payload: respuesta.data.palancas


  })

  dispatch({

    type: BUSQUEDA,
    payload: true


})
  
    }else{
      dispatch({

        type: ERROR,
        payload: respuesta.data.message
    
    
    })
    }
  } catch (error) {}
};



export const consultar_item_id = (id) => async (dispatch) => {

  try {
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        
    };
    const respuesta = await axios.get(
        URL+`getItemsById/${id}`,
      {
        headers: headers,
      }
    );

    
 
    if(respuesta.data.status==='success'){

      dispatch({

        type: CONSULTAR_ID,
        payload: respuesta.data.data


    })
  
    }else{
      dispatch({

        type: ERROR,
        payload: respuesta.data.message
    
    
    })
    }
  } catch (error) {}
};

export const consultarSuggestions = (data) => async(dispatch)=>{
    


  try {

   
      let json = JSON.stringify(data)
      let params = json;

      

      let headers = {
          "Content-Type": "application/json",
          'Authorization': window.localStorage.getItem('token')
      }
  console.log(params)
      const respuesta = await axios.post(URL+`getSuggestionModels`, params,{
          headers: headers
      })
  

      dispatch({
          type: CONSULTARS,
          payload:respuesta.data.data,
      })

      
      
  } catch (error) {
      
  }



}



export const handleChangeItem  = (index, dataType, value,type_id) => (dispatch,getState) => {

  console.log('entro');
  const {objetivos} = getState().HomeReducer
  const {palancas} = getState().HomeReducer

  let varMap= []
  let dispatchVarialbe= ''
  if(type_id===1){
     varMap=objetivos
     dispatchVarialbe=CONSULTAR_OBJETIVOS
  }
  else if(type_id===2){
      varMap=palancas
      dispatchVarialbe=CONSULTAR_PALANCAS
  }

  const newinfo = varMap.map((item, i) => {
      if (i === index) {
        return {...item, [dataType]: value};
      }
      return item;
    });


    dispatch({
      type: dispatchVarialbe,
      payload:newinfo
  })


  

 
};

export const editar = (Uploaddatoscuenta, model_id) => async (dispatch) => {
  dispatch({
      type: CARGANDO,
  });

  try {
      let json = JSON.stringify(Uploaddatoscuenta);
      let params = json;

      

      let headers = {
          "Content-Type": "application/json",
          Authorization: window.localStorage.getItem("token"),
      };
      const respuesta = await axios.put(
          URL + `updateItem/${model_id}`,
          params,
          {
              headers: headers,
          }
      );
      if (respuesta.data.status === "success") {
          dispatch({
              type: SUCCESS,
              payload: respuesta.data.message,
          });
    
          
      }
      if (respuesta.data.status === "error") {
          dispatch({
              type: ERROR,
              payload: respuesta.data.message.description[0]
          });
      
      }

      /*
       */
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
  });
  }

};


export const eliminar = (id) => async (dispatch) => {
  dispatch({
      type: CARGANDO,
  });

  try {


      let headers = {
          "Content-Type": "application/json",
          Authorization: window.localStorage.getItem("token"),
      };
      const respuesta = await axios.delete(URL + `destroyItem/${id}`, {
          headers: headers,
      });
      if (respuesta.data.status === "success") {
          dispatch({
              type: SUCCESS,
              payload: respuesta.data.message,
          });

          dispatch({

            type: BUSQUEDA,
            payload: false
        
        
        })
      }
   

  } catch (error) {
      dispatch({
          type: ERROR,
          payload: "Error al intentar realizar esta operación",
      });
  }
};