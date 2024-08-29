import { Navigate, useNavigate } from "react-router-dom"
import rootReducer from './redux/root-reducer.js'
import { useSelector } from "react-redux";

const ProtectedRoute = ({useAdmin, children}) => {
    const currentToken = useSelector((rootReducer) => rootReducer.userSlice.currentToken);
    const { isAdmin } = useSelector((rootReducer) => rootReducer.userSlice) || {};
    const history = useNavigate();
    
    if(!currentToken) {
        return <Navigate to="/login" replace/>
    }
    else {
        if(useAdmin) {
            if( isAdmin )
                return children;
            else {
                
                return <Navigate to="/login"  replace/>
            } 
        }
        return children;
    }
}
export default ProtectedRoute;