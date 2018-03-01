import React, { Component, Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';

const TOC = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/hello/Bob">Hello</Link>
    </li>
  </ul>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <ul>
    <li>
      <Link to="/about/ben">About Ben</Link>
    </li>
    <li>
      <Link to="/about/clark">About Clark</Link>
    </li>
  </ul>
);

const Ben = () => (
  <div>
    Ben kind of likes React Router v4, and is not very stabby.
  </div>
);

const Clark = () => (
  <div>
    Clark strongly dislikes React Router v4, and is very stabby.
  </div>
);

const Hello = (props) => (
  <div>Hello, { props.match.params.name }!</div>
)

function rightTrimSlash(str) {
  return str.replace(/\/+$/g, '');
}

function leftTrimSlash(str) {
  return str.replace(/^\/+/g, '');
}

const MyRoute = withRouter((props) => {
  // withRouter passes in the match, location, and history props
  const path = `${rightTrimSlash(props.match.path)}/${leftTrimSlash(props.path)}`;

  // "thin" means to keep all normal react-router behavior, but with a nested path
  if (props.thin) {
    return <Route {...props} path={ path } />
  }

  if (props.children) {
    return <Route {...props} path={ path } children={ null } component={ () => <Fragment>{ props.children }</Fragment> } />
  } else {
    return <Route {...props} path={ path } />
  }
});

class App extends Component {
  render() {
    return (
      <Router>
        <MyRoute path="/">
          <TOC />
          <MyRoute exact path="/" component={ Home } />
          <MyRoute path="/about">
            <h2>About</h2>
            <MyRoute exact path="/" component={ About } />
            <MyRoute path="/ben" component={ Ben } />
            <MyRoute path="/clark" component={ Clark } />
          </MyRoute>
          <MyRoute path="/hello/:name" component={ Hello } />
        </MyRoute>
      </Router>
    );
  }
}

export default App;
