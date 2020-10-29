function CollapsedReducer (prevState={
    //设置默认值
    isCollapsed : false
},action){
    let {type} = action
    //将状态拷贝一份
    let newState = {...prevState}
    switch ((type)) {
        case 'CHANEG_COLLAPSED':
            newState.isCollapsed = !newState.isCollapsed
            return newState
        default:
            return prevState;
    }
}
export default CollapsedReducer