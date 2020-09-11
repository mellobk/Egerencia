import React from 'react'
import '../css/spinner.css'


const Fatal = (props) => (

      
    <div class="alert alert-danger" role="alert">
  
  { `${props.mensaje} `} 
</div>
    
)
export default Fatal
/*

class Fatal extends Component {


  ListadoErrores = () => {
    const { mensaje } = this.props;



return(
  {mensaje}
)

};
  render(){
    return(

<div className="alert alert-danger" role="alert">
{this.ListadoErrores()}
</div>

    )
  }

}
export default Fatal */