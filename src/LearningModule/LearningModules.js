import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"

/**
 * Returns a essentially blank page. Serves to handle the postSlug.
 * @returns 
 */
function LearningModules() {
  const [content, setContent] = useState([])
  const string = 'LearningModules'

  useEffect(() => {
    axios.get('http://localhost:3002/api/getData', { params: { table: string } }).then((response) => {
          setContent(Object.values(response.data))
      });
  }, [])

  return (
    <div className="home">
      <div class="container">
        <h1 className="text-center mt-5">Custom Learning Module page???</h1>
        {content.map((val) => {
          return (<h2>
            Description: {val.Description}
          </h2>);
        })}
      </div>
    </div>
  );
}

export default LearningModules;