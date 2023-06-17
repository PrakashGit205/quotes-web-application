import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

function Topics() {
  const history = useHistory();
  const [topics, setTopics] = useState([]);
  const [topic_id, setTopicId] = useState();
  const GoToTutorial = () => {
    history.push(`/tutorials/${topic_id}`);
  };
  useEffect(() => {
    var server = new XMLHttpRequest();
    server.onreadystatechange = () => {
      if (server.readyState == 4 && server.status == 200) {
        setTopics(JSON.parse(server.responseText));
      }
    };
    server.open("GET", "http://127.0.0.1:9999/topics");
    server.send();
  }, []);

  const onTextChange = (args) => {
    setTopicId(args.target.id);
  };
  var name = sessionStorage.getItem("Name");
  return (
    <>
      <h1>welcome {name} in Topic page </h1>
      {topics.map((topic) => {
        return (
          <>
            <p>{topic.topic_name}</p>
            <input
              type="radio"
              onClick={onTextChange}
              id={topic.topic_id}
            ></input>
          </>
        );
      })}
      <button onClick={GoToTutorial}>Go To Tutorials </button>
    </>
  );
}

export default Topics;
