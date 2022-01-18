import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
const assets = require.context('../assets/', true);

/**
 * Returns a essentially blank page. Serves to handle the postSlug.
 * @returns 
 */
function LearningModules() {
  const [content, setContent] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3002/api/getData', { params: { id: 1 } }).then((response) => {
          setContent(Object.values(response.data))
      });
  }, [])

  // https://flaviocopes.com/jsx-return-multiple-elements/
  const LearningModuleContent = content.map((module) => {
    
    return ([
      <h1 className="text-center mt-5">
        {module.Title}
      </h1>,
      <h6 className="text-center">
        {module.Subtitle}
      </h6>,
      <h4 className="text-left mt-3">
        {module.Description}
      </h4>,
      <div>
        <img src={assets(`./${module.Banner}`)} />
      </div>
    ]);
  })

  return (
    <div className="home">
      <div class="container">
          {LearningModuleContent}
      </div>
    </div>
  );
}

export default LearningModules;