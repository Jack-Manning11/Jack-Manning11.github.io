import React, { useState, useEffect, useRef } from 'react';
import useAuth from './hooks/useAuth';
import Player from './Player';
import Details from './Details';
import { AlbumContainer, Album, TextContainer } from './styles/Dashboard.styles';
import SpotifyWebApi from 'spotify-web-api-node';
import {
    DashBoardContainer,
    PlayerContainer,
    BackButton,
} from './styles/Dashboard.styles';

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
});

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    const [playingTrack, setPlayingTrack] = useState();
    const [songs, setSongs] = useState([]);
    const [centeredIndex, setCenteredIndex] = useState(0); // Track the centered image index
    const albumContainerRef = useRef(null);
    const [show, setShow] = useState(false);

    const playlistId = "5zTUX59PIGj24TuLWBxnQC";  

    function chooseTrack(e) {
        setPlayingTrack(songs[e.target.id].track);
        setShow(true);
    }

    function onBackButtonClick(){
        setShow(false);
    }

    useEffect(() => {
        if(!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if(!accessToken) return;

        let cancel = false;
        let offset = 0;
        const allTracks = [];

        const fetchPlaylistTracks = async () => {
            try {
                const { body } = await spotifyApi.getPlaylistTracks(playlistId, { offset: offset });
                if (cancel) return;

                allTracks.push(...body.items);

                if(allTracks.length < body.total){
                    offset += 100;
                    await fetchPlaylistTracks();
                } else {
                    console.log(allTracks);
                    setSongs(allTracks);
                }
            } catch (err) {
                console.log("Error fetching tracks: ", err);
            }
        };

        fetchPlaylistTracks();

        return () => (cancel = true);
    }, [playlistId, accessToken]);

    useEffect(() => {
        // Add a scroll event listener to track the centered image index
        const handleScroll = () => {
          if (!albumContainerRef.current) return;
          const container = albumContainerRef.current;
          const containerWidth = container.clientWidth;
          const scrollLeft = container.scrollLeft;
          const albumWidth = 310;
    
          // Calculate the centered index based on the scroll position
          const index = Math.floor((scrollLeft+(containerWidth/2))/albumWidth);
          setCenteredIndex(index);
        };
    
        const container = albumContainerRef.current;
        if (container) {
          container.addEventListener("scroll", handleScroll);
        }
    
        return () => {
          if (container) {
            container.removeEventListener("scroll", handleScroll);
          }
        };
      }, [songs, show]);


    return (
        <DashBoardContainer>
            {show ? (
                <>
                    <BackButton onClick={onBackButtonClick}><span>&#8592;</span></BackButton>
                    <Details track={songs[centeredIndex]} />
                </>
            ) : (
                <>
                    <AlbumContainer ref={albumContainerRef}>
                    {songs.map((song, index) => (
                        <Album key={index} onClick={chooseTrack}>
                            <img src={song.track?.album?.images[1].url} alt={song.track?.album?.name} id={index}/>
                        </Album>
                    ))}
                    </AlbumContainer>
                    <TextContainer>
                    {songs[centeredIndex] && (
                        <>
                            <p>Song: {songs[centeredIndex].track?.name}</p>
                            <p>Artists: {songs[centeredIndex].track?.artists.map((artist) => artist.name).join(", ")}</p>
                        </>
                    )}
                    </TextContainer>
                </>
            )}
            <PlayerContainer>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
            </PlayerContainer>
        </DashBoardContainer>
    );
};

export default Dashboard;