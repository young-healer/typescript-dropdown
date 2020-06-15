import React, { useState, useEffect } from 'react';

import Autocomplete from "./Autocomplete";

import './App.css';


const App = () => {  
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function fetchWords() {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=5000')
      return await response.json();
    }
  
    fetchWords().then((data) => {
      setWords(data);
    });
  }, [])


  return (
    <>
      <Autocomplete
        suggestions={words}
      />
    </>
  );
}

export default App;
