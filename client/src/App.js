import { useState, useEffect } from 'react';
// React router v5
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';

/* React Router v6 OG
npm uninstall -s react-router-dom  ---> Uninstall current version
npm install -s react-router-dom@5.3.0  ---> install specific version
import { BrowserRouter, Routes, Route, Link, } from "react-router-dom";
// Edited v6
import { BrowserRouter as Router, Routes, Route, Link, useRoutes,} from "react-router-dom";
*/
import { accessToken, logout, } from './spotify';
//import { catchErrors } from './utils'; { getCurrentUserProfile (in ./spotify import)}
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks, Playlists } from './pages';
import styled from 'styled-components/macro';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);
    useEffect(() => {
      setToken(accessToken);

  }, []);
  
// Original code for React Router v5 (not compatible with v6)
return (
  <div className="App">
    <GlobalStyle />

    <header className="App-header">
    {!token ? (
          <Login />
        ) : (
          <>
          <StyledLogoutButton onClick={ logout }>Log Out</StyledLogoutButton>

          <Router>
            <ScrollToTop />

            <Switch>
              <Route path="/top-artists">
                <TopArtists />
              </Route>
              <Route path="/top-tracks">
                <TopTracks />
              </Route>
              <Route path="/playlists/:id">
                <h1>Playlist</h1>
              </Route>
              <Route path="/playlists">
                <Playlists />
              </Route>
              <Route path="/">
                <Profile />
              </Route>
            </Switch>
          </Router>
          </>
        )}
    </header>
  </div>
);
}

  export default App;