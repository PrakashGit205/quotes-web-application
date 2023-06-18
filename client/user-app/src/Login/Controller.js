import { Route, Switch, useParams } from "react-router-dom/cjs/react-router-dom.min";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Header from "../designs/Header";
import Register from "./Register";
import Home from "../Pages/home";
import MyQuotes from "../Pages/MyQuote";
import MyProfile from "./MyProfile";

function Controller() {
    var {path} = useParams();
    debugger;
    return ( <>
   
    <Switch>
               <Route exact path="/" component={Login}/>
               <Route exact path="/login" component={Login}/>
               <Route exact path="/register" component={Register}/>
               <ProtectedRoute  exact path="/home" component={Home}/>
               <ProtectedRoute  exact path="/my-quotes" component={MyQuotes}/>
               <ProtectedRoute  exact path="/profile" component={MyProfile}/>
               
               {/* <ProtectedRoute  exact path="/tutorials/:topic_id" component={Tutorails}/> */}
               {/* <ProtectedRoute  exact path="/details/:tutorial_id" component={Details}/> */}
    </Switch>
    
    </> );
}

export default Controller;
