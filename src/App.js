import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons : [
      {
        id : 1,
        name : "Vinay",
        age : 28
      },
      {
        id : 2,
        name  : "Ajab",
        age : 30
      },
      {
        id : 3,
        name : "Gajab",
        age : 33
      }
    ],
    otherState : "Some other state",
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // Another way to create copy of Object
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons : persons
    });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons : persons
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons : !doesShow
    });
  }

  render(){
    const style = {
      backgroundColor: 'green',
      color: 'white',
      border: '1px solid blue',
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer'
    }

    let personList = null;
    if(this.state.showPersons){
      personList = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              change={(event) => this.nameChangedHandler(event, person.id)}/>;
            })
          }
        </div>
      );
      style.backgroundColor = 'red';
    }

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Welcome to React Course.</h1>   
        <p className={classes.join(' ')}>This is really working!!</p>   
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>
            Toggle Persons
        </button>
        {personList}
      </div>
    );
  }
}

export default App;

