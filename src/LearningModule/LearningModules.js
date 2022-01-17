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
    // const data = posts.map(post => ({name: 'post.firstname', dateregistered: 'post.date', department: 'post.department'})) 
    axios.get('http://localhost:3002/api/getData', { params: { table: string } }).then((response) => {
          console.log('hii')
          setContent(response.data)
      });
  }, [])

  return (
    <div className="home">
      <div class="container">
        <h1 className="text-center mt-5">Custom Learning Module page???</h1>
        <h1 className="text-center mt-5"> {content.length} </h1>
        <h1 className="text-center mt-5"> {content[0]} </h1>

      </div>
    </div>
  );
}

export default LearningModules;