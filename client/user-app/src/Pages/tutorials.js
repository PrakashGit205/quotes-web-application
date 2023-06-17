import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

function Tutorails() {
    const history = useHistory();
    const {topic_id} = useParams();
    // const [tutorial_id,setTutId] = useState("");
    const [tutorials,setTutorials] = useState([]);
    const details = ()=>{
       
    }
    useEffect(()=>{
        debugger;
        var server = new XMLHttpRequest();
        server.onreadystatechange = ()=>{
            debugger;
                if(server.readyState==4 && server.status ==200){
                    setTutorials(JSON.parse(server.responseText));
                }
        }
        server.open("GET","http://127.0.0.1:9999/tutorials/"+topic_id);
        server.send();
    },[])
    const onTextChange = (tutorial_id)=>{
            var one = null;;
            tutorials.map((tutorial)=>{
                if(tutorial.tutorial_id==tutorial_id)
                 one= tutorial;
            });

            history.push(`/details/1`,{one});
    
}
    return ( <>
    <h1>Tutorial Page </h1>{
        tutorials.map((tutorial)=>{
            return(<><h2>{tutorial.contents}</h2>
                <button className="btn btn-primary" id={tutorial.tutorial_id} onClick={()=>{
                    onTextChange(tutorial.tutorial_id)
                }} >{tutorial.title}</button>
        </>)})
    }

    <button onClick={details}>Go To Details</button>
    </>);
}

export default Tutorails;