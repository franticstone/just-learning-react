import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


// Styles
import './styles/main.scss';

// Pages
import Homepage from './components/home';
import VideoPage from './components/video';
import Moviepage from './components/movies';
import Weatherpage from './components/weather';


export default class App extends React.Component {

    render() {
        return (
            <Router>
                {/* <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand" href="#">REACTY</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/movies">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/weather">Weather</Link>
                            </li>
                        </ul>
                    </div>
                </nav> */}
                <div className="main-navigation">
                    <div className="brand">
                        <div className="title"><Link to="/">Reacty</Link></div>
                    </div>
                    <ul className="links">
                        <li><Link to="/weather">Weather</Link></li>
                        <li><Link to="/movies">Movies</Link></li>
                    </ul>
                </div>
                <div className="thee-container">
                <Switch>
                    <Route path="/weather">
                        <Weatherpage />
                    </Route>
                    <Route path="/movies">
                        <Moviepage />
                    </Route>
                    <Route path="/video/:videoid" render={(props) => <VideoPage {...props} />}>
                        <VideoPage />
                    </Route>
                    <Route path="/">
                        <Homepage />
                    </Route>
                </Switch>
                </div>
            </Router>
          );
    }

}