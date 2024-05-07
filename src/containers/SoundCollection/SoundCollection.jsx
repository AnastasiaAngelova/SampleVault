// import React from 'react';
import React, { useState, useEffect } from 'react';
import "./SoundCollection.css"
import { usePlaylist } from "../../components/Player/PlaylistContext"

const SoundCollection = () =>  {
    const [samples, setSamples] = useState([]);
    const [genres, setGenres] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [moods, setMoods] = useState([]);
    const [tons, setTons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedInstrument, setSelectedInstrument] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedTonality, setSelectedTonality] = useState('');

    const { setPlaylist, setTrackIndex, setIsPlaying, isPlaying, trackIndex } = usePlaylist();

    const handleSongClick = (playlist, number) => {
        console.log(playlist)
        if (trackIndex === number && playlist === playlist) {
        setIsPlaying(!isPlaying);
        } else {
        setIsPlaying(true);
        updatePlaylist(playlist, number);
        }
  };

    const updatePlaylist = (playlist, trackIndex) => {
        const newPlaylist = playlist; // Новый плейлист, который нужно передать
        setPlaylist(newPlaylist);
        setTrackIndex(trackIndex);
    };

    const handleDownload = (audioSrc, title) => {
        fetch(audioSrc.split("?")[0])
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.wav`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch(error => console.error('Error downloading file:', error));
    };


    const handleGetAllSamples = async (event) => {
        try {
            const response = await fetch('https://samplevault.ru/api/v1/sounds', {
                method: 'GET',
                mode: 'cors'
            });

            if (!response) {
                throw new Error('Ошибка при получении списка сэмплов');
            }

            const text = await response.text();
            if (text.trim() === '') {
                console.log('Ответ пустой');
                return;
            }

            const data = JSON.parse(text);
            console.log('Сэмплы получены: ', data);

            if (data.length === 0) {
                console.log('Список сэмплов пуст');
            }

            const updatedSamples = data.map(item => {
                return {
                    icon_url: item.icon_url,
                    audioSrc: item.audio_url,
                    title: item.title,
                    musical_instrument: item.musical_instrument,
                    genre: item.genre,
                    mood: item.mood,
                    tonality: item.tonality,
                    tempo: item.tempo,
                };
            });

            setSamples(updatedSamples); // Обновляем состояние samples

            const uniqueGenres = updatedSamples.reduce((genres, sample) => {
                if (!genres.includes(sample.genre)) {
                    return [...genres, sample.genre];
                }
                return genres;
            }, []);
    
            console.log(uniqueGenres);
            setGenres(uniqueGenres);

            const uniqueInstrumentals = updatedSamples.reduce((musical_instruments, sample) => {
                if (!musical_instruments.includes(sample.musical_instrument)) {
                    return [...musical_instruments, sample.musical_instrument];
                }
                return musical_instruments;
            }, []);
    
            console.log(uniqueInstrumentals);
            setInstruments(uniqueInstrumentals);

            const uniqueMoods = updatedSamples.reduce((moods, sample) => {
                if (!moods.includes(sample.mood)) {
                    return [...moods, sample.mood];
                }
                return moods;
            }, []);
    
            console.log(uniqueMoods);
            setMoods(uniqueMoods);

            const uniqueTons = updatedSamples.reduce((tons, sample) => {
                if (!tons.includes(sample.tonality)) {
                    return [...tons, sample.tonality];
                }
                return tons;
            }, []);
    
            console.log(uniqueTons);
            setTons(uniqueTons);


        } catch (error) {
            console.error('Ошибка при получении списка сэмплов:', error);
        }
    };

    useEffect(() => {
        handleGetAllSamples();
    }, []);

const levenshteinDistance = (str1, str2) => {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
};


const filterSamples = (samples) => {
  const maxDistance = 2;
  const searchTerms = searchQuery.toLowerCase().split(' ');

  return samples.filter((sample) => {
    const matchesInstrument = selectedInstrument === '' || sample.musical_instrument === selectedInstrument;
    const matchesGenre = selectedGenre === '' || sample.genre === selectedGenre;
    const matchesMood = selectedMood === '' || sample.mood === selectedMood;
    const matchesTonality = selectedTonality === '' || sample.tonality === selectedTonality;

    const matchesSearchQuery = searchQuery === '' || searchTerms.every((term) => {
      const lowercaseTerm = term.toLowerCase();
      return (
        levenshteinDistance(sample.title.toLowerCase(), lowercaseTerm) <= maxDistance ||
        sample.title.toLowerCase().includes(lowercaseTerm) ||
        levenshteinDistance(sample.musical_instrument.toLowerCase(), lowercaseTerm) <= maxDistance ||
        sample.musical_instrument.toLowerCase().includes(lowercaseTerm) ||
        levenshteinDistance(sample.genre.toLowerCase(), lowercaseTerm) <= maxDistance ||
        sample.genre.toLowerCase().includes(lowercaseTerm) ||
        levenshteinDistance(sample.mood.toLowerCase(), lowercaseTerm) <= maxDistance ||
        sample.mood.toLowerCase().includes(lowercaseTerm) ||
        levenshteinDistance(sample.tonality.toLowerCase(), lowercaseTerm) <= maxDistance ||
        sample.tonality.toLowerCase().includes(lowercaseTerm) ||
        levenshteinDistance(sample.tempo.toLowerCase(), lowercaseTerm) <= 0 ||
        sample.tempo.toLowerCase().includes(lowercaseTerm)
      );
    });

    return matchesInstrument && matchesGenre && matchesMood && matchesTonality && matchesSearchQuery;
  });
};

const filteredSamples = filterSamples(samples);
    console.log(filteredSamples)

    return (
    <div className='collection-container'>
        <div className='searchrow'>
            <div className='searchbar'>
             
                    <img src={'icons/search.svg'}></img>
           
                <input className="searchinput" 
                placeholder='Поиск'   
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}></input>
            </div>

            <div className='filter-box-container'>
                <select className="filter-box" value={selectedInstrument} onChange={(e) => setSelectedInstrument(e.target.value)}>
                    <option className='option' value="" selected>Инструмент</option>
                    {instruments.map(instrument => (
                        <option className='option' key={instrument} value={instrument}>{instrument}</option>
                    ))}
                </select>

                <select className="filter-box" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option className='option' value="">Жанр</option>
                    {genres.map(genre => (
                        <option className='option' key={genre} value={genre}>{genre}</option>
                    ))}
                </select>

                <select className="filter-box" value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
                    <option className='option' value="">Настроение</option>
                    {moods.map(mood => (
                        <option className='option' key={mood} value={mood}>{mood}</option>
                    ))}
                </select>

            <select className="filter-box" value={selectedTonality} onChange={(e) => setSelectedTonality(e.target.value)}>
                    <option className='option' value="">Тональность</option>
                    {tons.map(tons => (
                        <option className='option' key={tons} value={tons}>{tons}</option>
                    ))}
                </select>
            </div>
        </div>

        <div className="containercol">
            <div className="numbercol"></div>
            <div className="imgtablecol"></div>
            <div className="tablecol">Название</div>
            <div className="tablecol">Инструменты</div>
            <div className="tablecol">Жанр</div>
            <div className="tablecol">Настроение</div>
            <div className="tablecol">Тональность</div>
            <div className="tablecol">Темп</div>
            <div className="song--control-img"></div>
            <div className="song--control-img"></div>
        </div>

        {filteredSamples.map((sample, index) => (
            <div className="containersample" onClick={() => handleSongClick(filteredSamples, index)}>
                
                <div className="numbercol">{index+1}</div>
                <img src={sample.icon_url} alt={sample.icon_url} className="imgcol" />
                <div className="elementcol">{sample.title}</div>
                <div className="elementcol">{sample.musical_instrument}</div>
                <div className="elementcol">{sample.genre}</div>
                <div className="elementcol">{sample.mood}</div>
                <div className="elementcol">{sample.tonality}</div>
                <div className="elementcol">{sample.tempo}</div>
                
                <img src={'icons/star.svg'} alt="star01I114" className="song--control-img" />
                <img src={'icons/download.svg'} alt="download01I114" className="song--control-img"
                onClick={(e) => {
                        e.stopPropagation(); // Остановить распространение события
                        handleDownload(sample.audioSrc, sample.title);
                        }}/>

            </div>
            ))}
    </div>

    );
};

export default SoundCollection;
