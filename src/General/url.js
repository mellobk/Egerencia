

let URL

if(process.env.NODE_ENV==='development'){
     URL='http://localhost:8000/'
}else{
    URL='https://xtremestudio.com.co/API-Egerencia/'
}
//export const URL='https://xtremestudio.com.co/API/'
export default URL