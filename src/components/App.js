import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const [questions, setQuestions] = useState([]); 

  
  useEffect(() =>{
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((data)=> setQuestions(data))
  }, [])

  function onAddQuestion(newQuestion){
    setQuestions([...questions, newQuestion]);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onAddQuestion={onAddQuestion}/> : 
      <QuestionList questions={questions}/>}
    </main>
  );
}

export default App;
