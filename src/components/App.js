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
  function onDeleteQuestion(deletedQuestionId) {
    fetch(`http://localhost:4000/questions/${deletedQuestionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete question");
        }
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== deletedQuestionId));
      })
      .catch((error) => console.error("Error deleting question:", error));
  }
  

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onAddQuestion={onAddQuestion}/> : 
      <QuestionList questions={questions} onDeleteQuestion={onDeleteQuestion}/>}
    </main>
  );
}

export default App;
