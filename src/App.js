import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListItem from './ListItem';

class App extends Component {

  constructor(){
    super();
      
    this.state = {

      newTodo : 'Default',
      editing: false,
      editingIndex: null,
      notification: null,

      todos : []

    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.geneerateTodoId = this.geneerateTodoId.bind(this);
    this.alert = this.alert.bind(this);

  }

  handleChange(event){

    this.setState({

      newTodo : event.target.value
    });

   }

   geneerateTodoId(){

      const lastTodo = this.state.todos[this.state.todos.length - 1];

      if(lastTodo){

        return lastTodo.id + 1;
      }

      return 1;

   }


   addTodo(){

    const newTodo = {

      name : this.state.newTodo,
      id : this.geneerateTodoId()

    } ;


    const todos = this.state.todos

    todos.push(newTodo);

    this.setState({

      todos: todos,
      editing: false,
      edintingIndex: null,
      newTodo: ''

    });
    this.alert('Todo added successfully!!!')

   }


   alert(notification){

    this.setState({
      
      notification
      });

      setTimeout(() => {

        this.setState({
          notification: null

        });
      }, 2000);

   }

   
   deleteTodo(index){

    const todos = this.state.todos;

    delete todos[index];

    this.setState({todos});

    this.alert('Todo deleted successfully!!!')
   

   }

   editTodo(index){

      const todo = this.state.todos[index];

      this.setState({

        editing: true,
        newTodo : todo.name,
        editingIndex: index

      }); 
      this.alert('Todo edited successfully!!!')

   }

   updateTodo(index){

    const todo = this.state.todos[this.state.editingIndex];
    todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = todo;
    this.setState({todos, editing: false, editingIndex: null});
    this.alert('Todo updated successfully!!!')
    
 }



  render() {
    
    console.log(this.state.newTodo);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>React CRUD</h1>
        
        </header>
        <div className="container">
       
          { 
            this.state.notification &&
            <div className = "alert mt-3 alert-success">
            <p className = "text-center">{this.state.notification}</p>
            </div>
        
        }

        <input 
            type="text" name="todo" 
            className= "my-4 form-control" 
            placeholder="Add a new ToDo!" 
            onChange= {this.handleChange} 
            value = {this.state.newTodo}
          />

        <button className = "btn-success form-control mb-3" 
          onClick = {this.state.editing ? this.updateTodo : this.addTodo}
          disabled = {this.state.newTodo.length < 5}
        > 

            {this.state.editing ? 'Update TODO' : 'Add TODO'}
        
        
        </button>

        
          {!this.state.editing && 
          
          <ul className="list-group">
            
          {this.state.todos.map((item, index) => {

            return <ListItem
            
            key = {item.id}

            item = {item}

            editTodo = {() => {this.editTodo(index);}}

            deleteTodo = {() => {this.deleteTodo(index);}}

            
            />

          })}

              
        </ul>
        
        
        }

        </div>
        <footer className = "App-footer mt-5">
            <h4>my footer</h4>
        
        </footer>

      </div>
    );
  }
}

export default App;
