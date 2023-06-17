import Header from "../designs/Header";
import AllQuote from "./AllQuote";

function Home() {
    var name = window.sessionStorage.getItem("Name");
    return ( <>
        <Header></Header>
        <center>
        <h1>Welcome {name}</h1>
        </center><AllQuote></AllQuote>
    </> );
}

export default Home;