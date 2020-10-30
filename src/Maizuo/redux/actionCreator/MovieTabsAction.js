function MovieTabsAction(key) {
    console.log(key,'action')
    return {
        type: "CHANEG_MOVIE_TAB",
        key
    }
}
export default MovieTabsAction