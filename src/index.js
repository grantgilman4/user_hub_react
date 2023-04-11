import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, UserPosts, UserTodos } from './components';
import { getUsers, getPostsByUser } from './api';
import { getCurrentUser } from './auth';

const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    const takeUsers = async () => {
      try {
        const users = await getUsers();
        setUserList(users)
      } 
      catch (error) {
        console.log(error)
      }} 
      takeUsers()
  }, []);


  useEffect(() => {
    if (!currentUser) {
      setUserPosts([]);
      setUserTodos([]);
      return;
    }
    const fetchPostsByUser = async () => {
    try {
      const posts = await getPostsByUser(currentUser.id);
      setUserPosts(posts)
    } 
    catch (error) {
      console.log(error)
    }}
    fetchPostsByUser()
  

    const fetchTodosByUser = async () => {
      try {
        const todos = await getTodosByUser(currentUser.id);
        setUserTodos(todos)
      } 
      catch (error) {
        console.log(error)
      }}
      fetchTodosByUser()
  }, [currentUser]);
  

  return (
    <Router>
      <div id="App">
        <Header 
        userList={ userList } 
        currentUser={ currentUser } 
        setCurrentUser={ setCurrentUser }/>
        {currentUser ? 
         <>
          <Routes>
          <Route path="/posts" element={
            <UserPosts userPosts={ userPosts } currentUser={ currentUser } />}
          />
          <Route path="/todos" element={
            <UserTodos userTodos={ userTodos } currentUser={ currentUser } />}
          />
          <Route exact path ="/" element={
            <h2 style={{padding: ".5em"}}>Welcome, { currentUser.username }!</h2>}
          />
          </Routes>
        </>:
        <>
        <Routes>
          <Route exact path="/" element={
            <h2 style={{padding: ".5em",}}>Please log in, above.</h2>}
          />
          </Routes>
        </>}

      </div>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);