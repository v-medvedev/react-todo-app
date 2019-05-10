import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    searchFilter: '',
    filterBy: 'all'
  };

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label: label,
      important: false,
      done: false
    };
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      return {
        todoData: [...before, ...after]
      }
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({todoData}) => {
      return {
        todoData: [...todoData, newItem]
      }
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    }); 
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    }); 
  };

  onSearch = (term) => {
    this.setState({
      searchFilter: term
    });
  };

  onFilterToggle = (filterBy) => {
    this.setState({
      filterBy
    });
  };
  
  render() {
    const { todoData, searchFilter, filterBy } = this.state;
    let todoDataFiltered = todoData.filter((todo) => todo.label.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1)
    if (filterBy === 'active') {
      todoDataFiltered = todoDataFiltered.filter(todo => !todo.done);
    } else if (filterBy === 'done') {
      todoDataFiltered = todoDataFiltered.filter(todo => todo.done);
    }
    const doneCount = todoDataFiltered.filter((todo) => todo.done).length;
    const todoCount = todoDataFiltered.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearch={ this.onSearch } />
          <ItemStatusFilter onFilterToggle={ this.onFilterToggle } />
        </div>
        <TodoList 
          todos={todoDataFiltered}
          onDeleted={ this.deleteItem }
          onToggleImportant={ this.onToggleImportant }
          onToggleDone={ this.onToggleDone } />
        <ItemAddForm onItemAdded={ this.addItem } />
      </div>
    );
  }
};