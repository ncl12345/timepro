import axios from 'axios'

function RightListAction(){
    return axios.get('http://localhost:5001/rights').then(res=>{
        return {
            type:"CHANEG_RIGHT_LIST",
            payload:res.data
        }
    })
}
export default RightListAction