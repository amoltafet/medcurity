import Questions from './Questions'
import React,{useState,useEffect} from 'react';
import { useParams } from "react-router";
import axios from 'axios';

const GetData = () => {
    const [content, setContent] = useState([])
    const [numQuestions, setNumQuestions] = useState("")
    var index;
     // data array that holds question information using state
    
  
    let { slug } = useParams();
  
    useEffect(() => {
      // Fetch post using the postSlug
    }, [slug]);
  
    useEffect(() => {
      axios.get('http://localhost:3002/api/getModuleQuestions', { params: { id: slug } }).then((response) => {
            setContent(Object.values(response.data))
        });
    }, [])
  
    useEffect(() => {
      axios.get('http://localhost:3002/api/getQuery', { params: { the_query: "SELECT COUNT(*) AS NumberOfQuestions FROM Questions WHERE module = " + slug  } }).then((response) => {
            setNumQuestions(Object.values(response.data[0]))
        });
    }, [])
  
  
    var index = 0;
  
    const QuestionContent = content.map((question) => {
      index++;
      //const newData = data.concat({answer: "", correct: false});
      //setData(newData);
      var questionId = ` questionId${index-1}`
      console.log(question)
      return (<div>
                .{question}
              </div>
      );
    })
  
    console.log(QuestionContent)
    return(content);
  }

  export default GetData;