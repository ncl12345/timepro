function RightListReducer (prevState={
    List :[]
},action){
    let {type ,payload} = action
    let newState = {...prevState}
    switch ((type)) {
        case 'CHANEG_RIGHT_LIST':
            newState.List = payload
                return newState  
        default:
            return prevState;
    }
}
export default RightListReducer