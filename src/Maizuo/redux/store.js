import RightListReducer from './reducers/RightListReducer'
import CollapsedReducer from './reducers/CollapsedReducer'
import { applyMiddleware, combineReducers ,createStore,compose} from 'redux'
import reduxPromise from 'redux-promise'

const reducer = combineReducers({
    RightListReducer,
    CollapsedReducer
})
//配置dev-tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(reduxPromise)))

export default store