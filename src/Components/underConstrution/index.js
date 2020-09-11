import React, {  Fragment } from "react";
import "./Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UnderGif from "../../img/underContuction.gif";





  const underContuction = () => (
 
     
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">

            <h1 className="landing__tittle"> En construcción</h1>

              <img
                src={UnderGif}
                alt="under contruction Gif"
                className="under_contruction_gif"
              />

      
            </div>

   
          </div>
          </div>
      </Fragment>
    );



export default underContuction;
