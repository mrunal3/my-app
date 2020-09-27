import React, { Component } from 'react';
import './App.css';
import { MainBar } from "./components/MainBar";
import { ChatBar } from "./components/ChatBar";
import { Table } from "./components/Table";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [{
        name: "John Doe",
        email: "johndoe@gmail.com",
        number: "8888888888",
        image: <img src="/img/profile.png" height="30px" width="30px" style={{borderRadius:"50%"}}/>
      }],
      user: {
        name: "",
        email: "",
        number: "",
        image: ""
      },
      chatUser: {}
    }
    this.handleTable = this.handleTable.bind(this);
  }

  handleTable(table) {
    this.setState({
      users: table
    })
  }

  selectActiveUser(index) {
    let users = [...this.state.users];
    let user = users.splice(index,1,);
    if (this.state.user.name) {
      users.push(this.state.user);
    }
    if (user[0].name === this.state.chatUser.name) {
      this.setState({
        chatUser: {}
      })
    }
    this.setState({
      user: user[0],
      users: users
    })
  }

  handleChatUser(index) {
    this.setState({
      chatUser: this.state.users[index]
    })
  }

  render() {
    return (
        <div className="App">
          <MainBar users={this.state.users} user={this.state.user} selectActiveUser={this.selectActiveUser.bind(this)}/>
          <Table callParent={this.handleTable} table={this.state.users} user={this.state.user} handleChatUser={this.handleChatUser.bind(this)}/>
          <ChatBar chatUser={this.state.chatUser}/>
        </div>
    );
  }
}

export default App;