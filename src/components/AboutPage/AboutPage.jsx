import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p> Where At? at it's core is a one-stop-shop in the process of tracking concerts. It's the premier "search, 
          survey, and save" concert finder to suit your needs! Find your next concert now!
        </p>
        <p> Technologies employed: 
          Javascript, React.js, Redux-Sagas.js, Node.js, Express, postgreSQL, Material UI, and the Songkick API
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
