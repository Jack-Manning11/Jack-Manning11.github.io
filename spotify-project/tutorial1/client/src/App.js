import { useState, useEffect } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import {
  Routes,
  Route,
} from 'react-router-dom';
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks, Playlists, Playlist } from './pages';
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
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    }

    catchErrors(fetchData());
  }, []);
  
  console.log(profile);

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
                <Route path="/top-artists" element={ <TopArtists /> }>
                  
                </Route>
                <Route path="/top-tracks" element={ <TopTracks /> }>
                  
                </Route>
                <Route path="/playlists/:id" element={ <Playlist /> }>
                  
                </Route>
                <Route path="/playlists" element={ <Playlists /> }>
                  
                </Route>
                <Route path="/" element={ <Profile /> }>
                  
                </Route>
              </Routes>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
