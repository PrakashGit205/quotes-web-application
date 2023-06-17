import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function Details() {
        // const {tutorials} = useParams();
        const history = useHistory();
        var tutorials = history.location,state;
        // console.log(history.location.state);
    const LogOut = ()=>{
            sessionStorage.setItem("isLoggedIn",'false');
    }
    return (<><h1>This is Detaill</h1>
    <table className="table table-responsive">
        <thead>
                <tr>
                        <th>
                                publish Date
                        </th>
                        <th>
                                
                        </th>
                        <th>
                                publish Date
                        </th>
                        <th>
                                publish Date
                        </th>
                </tr>
        </thead>
    </table>
    <button onClick={LogOut} >Log Out</button>
    
     </> );
}

export default Details;