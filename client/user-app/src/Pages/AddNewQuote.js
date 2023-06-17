import { useState } from "react";

function AddNewQuote(props) {
    const [newQuote,setNewQuote] = useState({author : "",quote_text : ""})
    const [message, setMessage] = useState("");
    var id = window.sessionStorage.getItem("user_id");
    const addNew = ()=>{
        if(newQuote.author == "" || newQuote.quote_text == "")
        {
            setMessage("Please Enter Values")
            return;
        }
        var server = new XMLHttpRequest();
        server.onreadystatechange = ()=>{
            if(server.readyState==4 && server.status ==200){
                    debugger;
                    var responseText = JSON.parse(server.responseText);
                    if(responseText.affectedRows>0){
                            props.setMessage("Quote Added")
                    }
                    else props.setMessage("Something Went Wrong")
                   
                }
        }
        server.open("POST","http://127.0.0.1:9999/quotes/"+id);
        server.setRequestHeader('Content-Type','application/json')
        server.send(JSON.stringify({...newQuote}));
    }
    const ontextChange = (args)=>{
        let copyQuote = {...newQuote};
        copyQuote[args.target.name] = args.target.value;
        setNewQuote(copyQuote);
    }
    return ( <>
    <div style={{display : props.addDisplay}}>
    <p>Author Name</p>
    <input type="text" value={newQuote.author} onChange={ontextChange} name="author"></input>
    <p>Quote </p>
    <textarea cols={20} value={newQuote.quote_text} onChange={ontextChange}  name="quote_text"></textarea>
    <br></br>
    <h3>{message}</h3>
      <br></br>  <button onClick={addNew} className="btn btn-primary">Add Quote</button>
      </div></> );
}

export default AddNewQuote;