import ListTodo from "./todos/ListTodo";
import React from "react";

function App(){
  return(
    <div className="App">
      <div className="Header">
        Danh Sách Công Việc Nhà
      </div>
      <ListTodo />
      
    </div>
  )
}
export default App;