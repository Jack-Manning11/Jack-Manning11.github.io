import { useState, useEffect } from 'react';
import { accessToken, logout } from './spotify';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import Login from './Login';
import Home from './Home';
import Song from './Song';
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

function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);
  
  return (
    <div className="App">
      <GlobalStyle />

      <header className="App-header">
      {!token ? (
          <Login />
        ) : (
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
              <Routes>
                  <Route path="/song" element={ <Song /> }></Route>
                  <Route path="/" element={ <Home /> }></Route>
              </Routes>
          </>
        )}
      </header>
    </div>
  );
}

export default App;