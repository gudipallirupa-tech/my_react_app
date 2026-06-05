import { useState } from 'react'
import './App.css'

function App() {
  const [movies] = useState([
    {
      id: 1,
      title: "Stranger Things",
      desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments.",
      img: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
      bg: "https://wallpapercave.com/wp/wp1839578.jpg",
      trailer: "b9EkMc79ZSU"
    },
    {
      id: 2,
      title: "Money Heist",
      desc: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain.",
      img: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
      bg: "https://wallpapercave.com/wp/wp5262778.jpg",
      trailer: "htqXL94Rza4"
    },
    {
      id: 3,
      title: "Wednesday",
      desc: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates murders.",
      img: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
      bg: "https://wallpapercave.com/wp/wp11672261.jpg",
      trailer: "Di310WS8zLk"
    },
    {
      id: 4,
      title: "Dark",
      desc: "A family saga with a supernatural twist set in a German town.",
      img: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
      bg: "https://wallpapercave.com/wp/wp4021781.jpg",
      trailer: "rrwycJ08PSA"
    },
    {
      id: 5,
      title: "Breaking Bad",
      desc: "A high school chemistry teacher diagnosed with cancer turns to crime.",
      img: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
      bg: "https://wallpapercave.com/wp/wp2037158.jpg",
      trailer: "HhesaQXLuRY"
    },
    {
      id: 6,
      title: "The Witcher",
      desc: "Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny.",
      img: "https://image.tmdb.org/t/p/w500/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg",
      bg: "https://wallpapercave.com/wp/wp4420164.jpg",
      trailer: "ndl1W4ltcmg"
    },
  ])

  const [banner, setBanner] = useState(movies[0])
  const [search, setSearch] = useState("")
  const [selectedMovie, setSelectedMovie] = useState(null)

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  const playTrailer = (trailerId) => {
    window.open(`https://www.youtube.com/watch?v=${trailerId}`, '_blank')
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="logo">NETFLIX</h1>
        <input
          type="text"
          placeholder="Search movies..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      {/* Banner */}
      <div
        className="banner"
        style={{
          backgroundImage: `url(${banner.bg})`,
          backgroundColor: '#333'
        }}
      >
        <div className="banner-content">
          <h1>{banner.title}</h1>
          <p>{banner.desc}</p>
          <div className="banner-buttons">
            <button className="play" onClick={() => playTrailer(banner.trailer)}>
              ▶ Play
            </button>
            <button className="info" onClick={() => setSelectedMovie(banner)}>
              ℹ More Info
            </button>
          </div>
        </div>
        <div className="banner-fade"></div>
      </div>

      {/* Movie Row */}
      <div className="row">
        <h2>{search? `Results for "${search}"` : "Trending Now"}</h2>
        <div className="row-posters">
          {filteredMovies.length > 0? filteredMovies.map(movie => (
            <img
              key={movie.id}
              src={movie.img}
              alt={movie.title}
              className="row-poster"
              onClick={() => {
                setBanner(movie)
                window.scrollTo({top: 0, behavior: 'smooth'})
              }}
            />
          )) : <p style={{color: '#999'}}>No movies found bro 😅</p>}
        </div>
      </div>

      {/* Top Rated Row */}
      <div className="row">
        <h2>Top Rated</h2>
        <div className="row-posters">
          {movies.slice().reverse().map(movie => (
            <img
              key={movie.id}
              src={movie.img}
              alt={movie.title}
              className="row-poster"
              onClick={() => {
                setBanner(movie)
                window.scrollTo({top: 0, behavior: 'smooth'})
              }}
            />
          ))}
        </div>
      </div>

      {/* Movie Popup */}
      {selectedMovie && (
        <div className="popup" onClick={() => setSelectedMovie(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedMovie(null)}>✕</button>
            <img src={selectedMovie.bg} alt={selectedMovie.title} />
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.desc}</p>
            <button className="play" onClick={() => playTrailer(selectedMovie.trailer)}>
              ▶ Play Trailer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App