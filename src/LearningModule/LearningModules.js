import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';


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
  
  // banners should have default size of height 200
  // https://stackoverflow.com/questions/62192049/how-do-i-dynamically-import-images-in-react
  return ([
      <h1 className="text-center mt-3">
        {module.Title}
      </h1>,
      <div class="d-flex justify-content-center">
        <img src={require(`../assets/${module.Banner}`).default} class="img-fluid rounded mx-auto d-block" alt={module.Title} />
      </div>,
      <h6 className="text-center  mt-2">
        {module.Subtitle}
      </h6>,
      <h4 className="text-left mt-3">
        {module.Description}
      </h4>
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