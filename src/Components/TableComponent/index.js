import React, { Fragment,Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";





class  Table  extends Component{

    render(){
    
        const {Tittle,ponerReporte,className} = this.props
    
    return(
        <Fragment>
        <div >
            <h1  className={className} style={{ textAlign: "center",marginTop:"5%" }}>{Tittle}</h1>

        </div>

        <table className="table table-striped tabla-global" >
            <thead>
                <tr>
                    <th className="text__center">ID </th>
                    <th className="text__center">DESCRIPCIÓN</th>
                    <th className="text__center">ACCIÓN</th>
                </tr>
            </thead>
            <tbody>
                {ponerReporte}
            </tbody>
        </table>
    </Fragment>
    )
    
        
    }
    }
    
    export default Table

