import axios from 'axios'

function RightListAction(){
    return axios.get('/right/getRight').then(res=>{
        return {
            type:"CHANEG_RIGHT_LIST",
            payload:res.data
        }
    })
}
export default RightListAction