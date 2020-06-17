import React from 'react';
import logo from './favicon_512.png';
import styles from './stylesheets/App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render()
    {
    return (
      <div className="App">
        <nav className={`uk-navbar-container uk-height-small ${styles.navbar}`} uk-navbar="boundary-align:true">
          {/* <div className="uk-navbar-left uk-logo"><img src={logo} className="uk-height-small" alt="logo" /></div> */}
          <div className="uk-navbar-center"><h1>We Are Pleased To Announce</h1></div>
          {/* <div className="uk-navbar-right"><span uk-icon="menu"></span></div> */}
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
