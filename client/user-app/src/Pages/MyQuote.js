import { useEffect, useState } from "react";
import AddNewQuote from "./AddNewQuote";
import EditQuote from "./edit";
import Header from "../designs/Header";

function MyQuotes() {
  const [myQuotes, setMyQuotes] = useState([]);
  const [message, setMessage] = useState("");
  const [addDisplay, setDisplay] = useState("none");
  const [mydispaly, setMydisplaly] = useState("block");
  const [editDisplay, setEditDisplay] = useState("none");
  const [quoteToEdit, setquoteToEdit] = useState({
    author: "",
    quote_text: "",
    id: "",
    user_id: "",
  });
  var id = window.sessionStorage.getItem("user_id");
  const AddQuote = () => {
    setMydisplaly("none");
    setDisplay("block");
  };
  useEffect(() => {
    setMydisplaly("block");
    setEditDisplay("none");
    setDisplay("none");
    select();
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);
  useEffect(() => {
    debugger;
    select();
  }, []);

  const select = () => {
    debugger;
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        setMyQuotes(JSON.parse(server.responseText));
      }
    };
    server.open("GET", "http://127.0.0.1:9999/quotes/" + id);
    server.send();
  };
  const Edit = (id) => {
    myQuotes.map((quote) => {
      if (quote.id == id) {
        setquoteToEdit(quote);
      }
    });
    setEditDisplay("block");
    // setMydisplaly('none');
  };
  const Delete = (id) => {
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        debugger;
        var responseText = JSON.parse(server.responseText);
        if (responseText.affectedRows > 0) {
          setMessage("Quote Deleted");
          select();
        } else {
          setMessage("Something Went Wrong");
        }
      }
    };
    server.open("DELETE", "http://127.0.0.1:9999/quotes/" + id);
    server.send();
  };
  return (
    <>
    <Header></Header>
      <AddNewQuote
        addDisplay={addDisplay}
        setMessage={setMessage}
      ></AddNewQuote>
      <div style={{ display: mydispaly }}>
        <h2>My Quotes</h2>
      <h3>{message}</h3>
        <table className="table table-bordered">
          <tbody>
            {myQuotes.map((quote) => {
              return (
                <tr>
                  <td>{quote.author}</td>
                  <td>{quote.quote_text}</td>
                  <td>
                    <button
                      onClick={() => {
                        Edit(quote.id);
                      }}
                      className="btn btn-primary"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        Delete(quote.id);
                      }}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        style={{ display: mydispaly }}
        onClick={AddQuote}
        className="btn btn-primary"
      >
        Add New Quote
      </button>
      <center>
      <EditQuote
        editDisplay={editDisplay}
        setMessage={setMessage}
        newQuote={quoteToEdit}
        setNewQuote={setquoteToEdit}
      ></EditQuote>
      </center>
    </>
  );
}

export default MyQuotes;
