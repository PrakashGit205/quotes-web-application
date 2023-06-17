import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Header() {
    const history = useHistory();
    const Home =()=>{
history.push('/home')

    }
    const MyQuotes = ()=>{
        history.push('/my-quotes')

    }
    const Profile = ()=>{
        history.push('/profile')

    }
    const LogOut = ()=>{
        sessionStorage.setItem("isLoggedIn",'false');
        history.push('/login')

    }
  return (
    <>
      <header>
        <div style={{ backgroundColor: "lightblue" }} className="header">
            <center>
          <button onClick={Home} style={{backgroundColor : "transparent", border : 'none'}}>Home</button>
          <button onClick={MyQuotes} style={{backgroundColor : "transparent", border : 'none'}}>My Quotes</button>
          <button onClick={Profile} style={{backgroundColor : "transparent", border : 'none'}}>profile</button>
          <button onClick={LogOut} style={{backgroundColor : "transparent", border : 'none'}}>Log out</button>
          </center></div>
      </header>
    </>
  );
}

export default Header;
