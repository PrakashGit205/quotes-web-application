import { useEffect, useState } from "react";

function EditQuote(props) {
    // const [newQuote,setNewQuote] = useState({author : "",quote_text : "",id : "",user_id : ""})
    // const [newQuote,setNewQuote] = useState({});
    // setNewQuote(props.EditQuote);
    // const [message, setMessage] = useState("");
    var id = window.sessionStorage.getItem("user_id")
   
    const addNew = ()=>{
        debugger;
        var server = new XMLHttpRequest();
        server.onreadystatechange = ()=>{
            if(server.readyState==4 && server.status ==200){
                    debugger;
                    var responseText = JSON.parse(server.responseText);
                    if(responseText.affectedRows>0){
                            props.setMessage("Quote Edited")
                    }
                    else props.setMessage("Something Went Wrong")
                   
                }
        }
        server.open("PUT","http://127.0.0.1:9999/quotes");
        server.setRequestHeader('Content-Type','application/json')
        server.send(JSON.stringify({...props.newQuote}));
    }
    const ontextChange = (args)=>{
        let copyQuote = {...props.newQuote};
        copyQuote[args.target.name] = args.target.value;
        props.setNewQuote(copyQuote);
    }
  return (
    <>
      {" "}
      <div style={{ display: props.editDisplay}}>
        <p>Author Name</p>
        <input
          type="text"
          value={props.newQuote.author}
          onChange={ontextChange}
          name="author"
        ></input>
        <p>Quote to Edit </p>
        <textarea
          cols={40}
          rows={5}
          value={props.newQuote.quote_text}
          onChange={ontextChange}
          name="quote_text"
        ></textarea>
        <br></br>
        <br></br>{" "}
        <button onClick={addNew} className="btn btn-primary">
          Edit Quote
        </button>
      </div>
    </>
  );
}

export default EditQuote;
