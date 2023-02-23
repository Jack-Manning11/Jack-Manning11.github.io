# ---------- # 
# import block

import sys
from time import time
import spotipy
import spotipy.util as util
from spotipy.oauth2 import SpotifyOAuth
import pandas as pd
import numpy as np
import csv
#from sklearn.cluster import KMeans
#from scipy.spatial import distance
import lyricsgenius


scope = 'user-library-read'

sp = spotipy.Spotify(
        auth_manager=spotipy.SpotifyOAuth(
          client_id='8ea9544c774649e49a2c2e41feb74396',
          client_secret='9df779bfb7fb45649869fbd792e9ae47',
          redirect_uri='http://localhost/',    
          scope=scope, open_browser=False))
          
# ------------------------- GENIUS API HOOKIN

token = 'UgaM6yZAhnHafToIewNQ7vT5E8JAmBfUBbiUEewKt37d-9oxHuP1_75X21_6CDI-'
 ## at the moment, getting ^this^ from here https://docs.genius.com/#/getting-started-h1
genius = lyricsgenius.Genius(token)

# Turn off status messages
genius.verbose = False

# Remove section headers (e.g. [Chorus]) from lyrics when searching
genius.remove_section_headers = True

# Include hits thought to be non-songs (e.g. track lists)
genius.skip_non_songs = False

artist = genius.search_artist("Sam Lachow", max_songs=15)
song = artist.song("Treehouse")


lyrics_new_line_breaks = song.lyrics
print(lyrics_new_line_breaks)

lyrics = lyrics_new_line_breaks.replace("\n", " ")
#print(lyrics)

#song.save_lyrics()  
'''


# ------------------------- ACTUAL STUFF HAPPENING BELOW

df = pd.read_csv('test.csv')

out_columns = ['Song', 'Song URI', 'Preview Link', 'Album', 'Artist', 'Big Album Art', 'Small Album Art', 'Lyrics New Line', 'Lyrics Compressed', 'Danceability', 'Energy', 'Key', 'Loudness', 'Mode', 'Speechiness', 'Acousticness', 'Instrumentalness', 'Liveness', 'Valence', 'Tempo', 'Duration', 'Time Signature']
out = pd.DataFrame(columns=out_columns)

for index, row in df.iterrows():
        print(row['URL'])

        # ------------------------- SPOTIFY API PULL

        results = spotify.track(row['URL']) # change the row['URL'] to a song URL to get single song output
        
        artist_name = results['album']['artists'][0]['name']
        album_name = results['album']['name']
        big_album_art = results['album']['images'][1]['url']
        small_album_art = results['album']['images'][2]['url']
        song_name = results['name']
        song_uri = results['uri']
        preview_link = results['preview_url']

        #print(artist_name, album_name, big_album_art, small_album_art, song_name, song_uri, preview_link)

        audio_analysis = spotify.audio_analysis(song_uri)
        #print(audio_analysis)

        audio_features = spotify.audio_features(song_uri)
        #print(audio_features)

        danceability = audio_features[0]['danceability']
        energy = audio_features[0]['energy']
        key = audio_features[0]['key']
        loudness = audio_features[0]['loudness']
        mode = audio_features[0]['mode']
        speechiness = audio_features[0]['speechiness']
        acousticness = audio_features[0]['acousticness']
        instrumentalness = audio_features[0]['instrumentalness']
        liveness = audio_features[0]['liveness']
        valence = audio_features[0]['valence']
        tempo = audio_features[0]['tempo']
        duration = audio_features[0]['duration_ms']
        time_signature = audio_features[0]['time_signature']

        #print(danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration, time_signature)

        # ------------------------- GENIUS LYRIC PULL

        #artist = genius.search_artist("Say Anything", max_songs=5)
        #song = artist.song("Alive With the Glory of Love")
        #artist = genius.search_artist("Say Anything", max_songs=5)
        song = genius.search_song(song_name, artist_name)
        lyrics_new_line_breaks = song.lyrics
        #print(lyrics_new_line_breaks)

        lyrics = lyrics_new_line_breaks.replace("\n", " ")
        #print(lyrics)

        #song.save_lyrics()  

        # ------------------------- OUT DF COMPOSITION

        song_array = [song_name, song_uri, preview_link, album_name, artist_name, big_album_art, small_album_art, lyrics_new_line_breaks, lyrics, danceability, energy, key, loudness, mode, speechiness, acousticness, instrumentalness, liveness, valence, tempo, duration, time_signature]

        out.loc[len(out.index)] = song_array    

# ------------------------- OUT TO CSV

print(out)
out.to_csv('out.csv') '''