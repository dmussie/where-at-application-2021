import React from 'react';
import {useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const navigateToSearch = () => {
    history.push('/concertsearch');
  }
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <LogOutButton className="btn" /> */}
      <Button 
      variant="contained"
      color="primary"
      onClick={navigateToSearch}>Find a Concert!</Button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
