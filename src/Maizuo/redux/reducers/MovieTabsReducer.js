function MovieTabReducer(prevState = {
    //设置默认值
    isShow: '1'
}, action) {
    let {
        type,
        key
    } = action
    //将状态拷贝一份
    let newState = {
        ...prevState
    }
    switch ((type)) {
        case 'CHANEG_MOVIE_TAB':
            newState.isShow = key
            return newState
        default:
            return prevState;
    }
}
export default MovieTabReducer