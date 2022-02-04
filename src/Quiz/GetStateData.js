import React,{useState,useEffect} from 'react';

const GetStateData = () => {
    const [data,setData]=useState([
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
      { answer:"", correct: false},
    ]);
      /** 
       * 
       * @param {int} index Index of question that is clicked on by user
       * @param {str} answer String value of answer that was clicked on 
       * Function is used as an onChange function for the question toggle buttons to change state data
      */
    function adjustStateData (index, answer) {
     // console.log(numQuestions[0].NumberOfQuestions);
      let newData=data[index];
      newData["answer"]=answer;
      data[index]=newData;
      setData([...data]);
      console.log("" + answer);
    }
  
    return (
        <div>
        .{data}
        </div>
        );
  }

  export default GetStateData;