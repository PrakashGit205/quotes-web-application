import { useEffect, useState } from "react";

function AllQuote() {
  const [quotes, setQuotes] = useState([]);
  const [likeBack, setLikeBack] = useState([]);
  const [favQuote, setfavQuote] = useState([]);
  const [message, setMessage] = useState("");
  const [likedQuote,setLikedQuote]  = useState([]);
  var user_id = window.sessionStorage.getItem("user_id");
  useEffect(() => {
    debugger;
    AllQuotes();
    getQuoteId();
  }, []);
  useEffect(()=>{
      setTimeout(() => {
        setMessage("");
      }, 3000);

  },[message]);
  const getQuoteId = ()=>{
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        // setQuotes([]);
        setLikedQuote(JSON.parse(server.responseText));
      }
    };
    server.open("PUT", "http://127.0.0.1:9999/quotes/"+user_id);
    server.send();
  }
  const AllQuotes = () => {
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        setQuotes([]);
        setQuotes(JSON.parse(server.responseText));
        
      }
    };
    server.open("GET", "http://127.0.0.1:9999/quotes");
    server.send();
  };
  const updateLike = ()=>{

  }
  const checkLikeUn = (id,likeradio)=>{
    debugger;
    if(likeradio=='checked'){
        console.log('checked')
        dislike(id);
    }else{
        like(id);
    }
    getQuoteId();
  }
  const dislike = (id)=>{
    debugger;
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        var responseText = JSON.parse(server.responseText);
        if (responseText.affectedRows > 0) {
          setMessage("Quote Unliked");
          getQuoteId();
        }else{
            setMessage("Something Went Wrong");
        }
      }
      
    };
    server.open(
      "DELETE",
      "http://127.0.0.1:9999/favorite/" + id +"/" + user_id
    );
    server.send();
  }

  const like = (quote_id, user_id1) => {
    if(user_id == user_id1){
        setMessage("You cant like own quotes");
        return;
    }
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        var responseText = JSON.parse(server.responseText);
        if (responseText.affectedRows > 0) {
          setMessage("Quote Liked");
          getQuoteId();
        }else{
            setMessage("Something Went Wrong")
        }
      }
      
    };
    server.open(
      "POST",
      "http://127.0.0.1:9999/favorite/" + quote_id + "/" + user_id
    );
    server.send();
  };
  const favouriteQuote = () => {
    debugger;
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        var responseText = JSON.parse(server.responseText);
          setQuotes([]);
          setQuotes(responseText);
          quotes.map((quote)=>{
            quote.likeradio = 'checked'
          })
        
      }
    };
    server.open("GET", "http://127.0.0.1:9999/favorite/" +user_id);
    server.send();
  };

  return (
    <>
    <h3>{message}</h3>
      <div style={{ marginLeft: "900px" }}>
        <button className="btn btn-primary" onClick={AllQuotes}>
          All Quotes
        </button>
        {"      "}
        {}
        <button className="btn btn-primary" onClick={favouriteQuote}>
          Favorite Quotes
        </button>
      </div>
      <table className="table table-bordered">
        <tbody>
          {quotes.map((quote) => {
            likedQuote.map((likeqt)=>{
                if(likeqt.id == quote.id)
                quote.likeradio = 'checked';
            })
            return (
              <tr>
                <td>{quote.author}</td>
                <td>{quote.quote_text}</td>
                <td>
                <input className="btn btn-primary" 
                onClick={() => {
                    checkLikeUn(quote.id,quote.likeradio);
                    }}
                // onClick={checkLikeUn} 
                    type="radio" value={quote.user_id} checked = {quote.likeradio} ></input>

                  {/* <button
                    className="btn btn-primary"
                    onClick={() => {
                      like(quote.id, quote.user_id);
                    }}
                  >
                    {" "}
                    {quote.like}
                  </button> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </>
  );
}

export default AllQuote;
