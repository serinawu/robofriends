import React, { Component } from 'react';
import CardList from '../components/CardList' ;
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll' ;
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css' ;

//Props are simply things that come out of "state"
//So a parent feeds "state" into  a child component and as soon as child (components)components receives a "state" it's a property. That child can never change that property. 
// The parent just tells it what the "state" is and the child receives it as "robots"
// So the first things we need to do is to start being able to use "state" in our app,
// the description of what our "state" should be

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: users}));
    }
// react don't use arrow function

    onSearchChange= (event)=> {
        this.setState( {searchfield: event.target.value} )
        console.log(event.target.value);
    }

    render () {
        const {robots, searchfield} = this.state;
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
            // if name of the robots in lowercase includes - and this does the comparison
            // if anything in the sting includes"toLowerCase", then only return the robots that return true
        })
        return !robots.length?
        <h1>Loading</h1>:
        (
            <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <CardList robots={filteredRobots}/>
            </Scroll>
            </div>
        );
    }
}

export default App;