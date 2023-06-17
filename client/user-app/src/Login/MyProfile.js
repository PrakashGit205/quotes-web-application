import { useEffect, useState } from "react";
import Header from "../designs/Header";

function MyProfile(props) {
    const [loginInfo,setLoginInfo] = useState({first_name : "",last_name: "",email : "",mobile: ""});
    var id = window.sessionStorage.getItem('user_id');
    const [message,setMessage] = useState("");
    useEffect(()=>{
       select();
    },[])
    useEffect(()=>{
        setTimeout(() => {
            setMessage("");
          }, 3000);
    },[message])
    const select =()=>{
        var server = new XMLHttpRequest();
        server.onreadystatechange = () => {
          if (server.readyState == 4 && server.status == 200) {
            debugger;
            var logininfor = JSON.parse(server.responseText);
            setLoginInfo(logininfor[0]);
            console.log(loginInfo);
          }
        };
        server.open("GET", "http://127.0.0.1:9999/users/"+id);
        server.send();
    
    }

    const textChange = (args)=>{
        debugger;
            let copyOfLogin = {...loginInfo};
            copyOfLogin[args.target.name] = args.target.value;
            setLoginInfo(copyOfLogin);
           
    }
    const Save = ()=>{
        var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        var logininfor = JSON.parse(server.responseText);
        if(logininfor.affectedRows>0){
            select();
            setMessage("Profile Updated")
        }
        else{
            setMessage("Something Went Wrong")
        }
      }
    };
    server.open("PUT", "http://127.0.0.1:9999/users/"+id);
    server.setRequestHeader('Content-Type','application/json');
    server.send(JSON.stringify({...loginInfo}));

    }
    return ( <><Header></Header>
         <><div>
        <style dangerouslySetInnerHTML={{__html: "\n    body,\n.signin {\n  background-color: #d3d3d3;\n  font-family: 'Montserrat', sans-serif;\n  color: #fff;\n  font-size: 14px;\n  letter-spacing: 1px;\n}\n\n.login {\n  position: relative;\n  height: 560px;\n  width: 405px;\n  margin: auto;\n  padding: 60px 60px;\n  background: url(https://picsum.photos/id/1004/5616/3744) no-repeat   center center #505050;   \n  background-size: cover;\n  box-shadow: 0px 30px 60px -5px #000;\n}\n\nform {\n  padding-top: 80px;\n}\n\n.active {\n  border-bottom: 2px solid #1161ed;\n}\n\n.nonactive {\n  color: rgba(255, 255, 255, 0.2);\n}\n\nh2 {\n  padding-left: 12px;\n  font-size: 22px;\n  text-transform: uppercase;\n  padding-bottom: 5px;\n  letter-spacing: 2px;\n  display: inline-block;\n  font-weight: 100;\n}\n\nh2:first-child {\n  padding-left: 0px;\n}\n\nspan {\n  text-transform: uppercase;\n  font-size: 12px;\n  opacity: 0.4; \n  display: inline-block;\n  position: relative;\n  top: -65px;\n  transition: all 0.5s ease-in-out;\n}\n\n.text {\n  border: none;\n  width: 89%;\n  padding: 10px 20px;\n  display: block;\n  height: 15px;\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.1);\n  border: 2px solid rgba(255, 255, 255, 0);\n  overflow: hidden;\n  margin-top: 15px;\n  transition: all 0.5s ease-in-out;\n}\n\n.text:focus {\n  outline: 0;\n  border: 2px solid rgba(255, 255, 255, 0.5);\n  border-radius: 20px;\n  background: rgba(0, 0, 0, 0);\n}\n\n.text:focus + span {\n  opacity: 0.6;\n}\n\ninput[type=\"text\"],\ninput[type=\"password\"] {\n  font-family: 'Montserrat', sans-serif;\n  color: #fff;\n}\n\n\n\ninput {\n  display: inline-block;\n  padding-top: 20px;\n  font-size: 14px;\n}\n\nh2,\nspan,\n.custom-checkbox {\n  margin-left: 20px;\n}\n\n.custom-checkbox {\n  -webkit-appearance: none;\n  background-color: rgba(255, 255, 255, 0.1);\n  padding: 8px;\n  border-radius: 2px;\n  display: inline-block;\n  position: relative;\n  top: 6px;\n}\n\n.custom-checkbox:checked {\n  background-color: rgba(17, 97, 237, 1);\n}\n\n.custom-checkbox:checked:after {\n  content: '\\2714';\n  font-size: 10px;\n  position: absolute;\n  top: 1px;\n  left: 4px;\n  color: #fff;\n}\n\n.custom-checkbox:focus {\n  outline: none;\n}\n\nlabel {\n  display: inline-block;\n  padding-top: 10px;\n  padding-left: 5px;\n}\n\n.signin {\n  background-color: #1161ed;\n  color: #FFF;\n  width: 100%;\n  padding: 10px 20px;\n  display: block;\n  height: 39px;\n  border-radius: 20px;\n  margin-top: 30px;\n  transition: all 0.5s ease-in-out;\n  border: none;\n  text-transform: uppercase;\n}\n\n.signin:hover {\n  background: #4082f5;\n  box-shadow: 0px 4px 35px -5px #4082f5;\n  cursor: pointer;\n}\n\n.signin:focus {\n  outline: none;\n}\n\nhr {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  top: 85px;\n  position: relative;\n}\n\na {\n  text-align: center;\n  display: block;\n  top: 120px;\n  position: relative;\n  text-decoration: none;\n  color: rgba(255, 255, 255, 0.2);\n}\n    " }} />
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
        <div className="login">
            <input onChange={textChange} value={loginInfo.first_name} type="text" className="text" name="first_name" />
            <span>First Name </span>
            <br />
            <br />
            <input onChange={textChange} value={loginInfo.last_name} type="text" className="text" name='last_name' />
            <span>Last Name </span>
            <br />
            <br />
            <input onChange={textChange} value={loginInfo.email} type="email" className="text" name="email" />
            <span>Email</span>
            <br />
            <br />
            <input onChange={textChange} value={loginInfo.mobile} type="number" className="text" name="mobile" />
            <span>Mobile</span>

            <label htmlFor="checkbox-1-1">{message}</label>
            <button onClick={Save} className="signin">
              Save
            </button>
            
            <hr />
        </div>
      </div></>
    </> );
}

export default MyProfile;