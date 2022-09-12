import React from "react";
import AddTodo from "./AddTodo";
import './ListTodo.css'; 
class ListTodo extends React.Component{
    state = {
        listTodos: [],
        editTodo:{}
    }
    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo],
        })
    }
    handleDeleteTodo = (todo) => {
        let currentTodos = this.state.listTodos;
        currentTodos = currentTodos.filter(item => item.id !==  todo.id);
        this.setState({
            listTodos: currentTodos
        })
        // console.log('>>>checktodo: ', todo)
    }
    handleEditTodo = (todo) =>{
        let {editTodo, listTodos} = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if(isEmptyObj === false && editTodo.id === todo.id){
            let listTodosCopy = [...listTodos]

            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            console.log("before update: ", listTodosCopy[objIndex]);
            listTodosCopy[objIndex].title = editTodo.title;

            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })

            return;
        } 
        this.setState({
            editTodo:todo
        })
    
    }
    handleOnchangeEditTodo = (event) =>{
        
        let editTodoCoppy = {...this.state.editTodo};
        editTodoCoppy.title = event.target.value;

        this.setState({
            editTodo: editTodoCoppy
        })
    }
    render(){
        let {listTodos, editTodo} = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        return(
            <div className="list-todo-container">
               <AddTodo  
               addNewTodo={this.addNewTodo}
               />
                <div className="list-todo-content">
                    { 
                        listTodos && listTodos.length > 0 && 
                        listTodos.map((item, index) => {
                            return(
                            <div className="todo-child" key={item.id}>
                                {isEmptyObj === true ?
                                    <span className="text">{index + 1} - {item.title}</span>
                                    :
                                    <>
                                    {editTodo.id === item.id ?
                                        <span >

                                            {index+1} - <input value={editTodo.title}
                                            onChange = {(event) => this.handleOnchangeEditTodo(event)}
                                            />
                                            
                                        </span>
                                        :
                                        <span>
                                            {index + 1} - {item.title}
                                        </span>
                                    }
                                    </>
                                }
                                {/* <input value={item.title} /> */}
                                <button className="edit" 

                                onClick={
                                    () => this.handleEditTodo(item)
                                }
                                >
                                    {isEmptyObj === false && editTodo.id === item.id ?
                                        'Save':'Edit'
                                    }
                                    
                                    </button>
                                <button className="btn"
                                onClick={()=>this.handleDeleteTodo(item)}
                                >Delete</button>
                            </div>
                            )
                        })
                    }
                    
                    
                </div>
            </div>
        )
        
    }
}
export default ListTodo;