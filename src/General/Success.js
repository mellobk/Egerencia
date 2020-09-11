import React, { Fragment } from 'react'
import '../css/spinner.css'
const Success = (props) => (

<Fragment>

    <div className="alert alert-success" role="alert" style={{textAlign:"center"}}>
  { props.mensaje}
</div>
 </Fragment>
)

export default Success