import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../components/url";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowGallery(false);
      try {
        const route = "/movies/getAll";
        const response = await axios.get(apiUrl + route);
        setMovies(response.data.data);
        setLoading(false);
        setShowGallery(true);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filteredMoviesByName = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMovies = () => {
    switch (sortBy) {
      case "year":
        return filteredMoviesByName.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.releaseYear - b.releaseYear;
          } else {
            return b.releaseYear - a.releaseYear;
          }
        });
      case "revenue":
        return filteredMoviesByName.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.boxOfficeRevenue - b.boxOfficeRevenue;
          } else {
            return b.boxOfficeRevenue - a.boxOfficeRevenue;
          }
        });
      default:
        return filteredMoviesByName;
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies().slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  return (
    <section>
      {loading && (
        <div className="loader">
          <img src="../../../img/loading.gif" alt="loader" />
          <img src="../../../img/loadingtext.gif" alt="loader text" />
        </div>
      )}
      {showGallery && (
        <div className="gallery">
          <div className="searchBar">
            <div className="searchBlock">
              <label htmlFor="inputSearch">Filter by movie name</label>
              <input
                id="inputSearch"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name"
              />
            </div>
            <div className="searchBlock">
              <label htmlFor="selectSortBy">Sort by</label>
              <select
                id="selectSortBy"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="">Default</option>
                <option value="year">Year</option>
                <option value="revenue">Revenue</option>
              </select>
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
          <div className="card-gallery">
            {currentMovies.map((movie, index) => (
              <div className="card-movies" key={index}>
                <img src={movie.poster} alt={movie.title} />
                <div className="card-movie-content">
                  <h2 className="movieAndYear">
                    {movie.title} - {movie.releaseYear}{" "}
                  </h2>
                  <h3 className="title">Director: {movie.director}</h3>
                  <h3 className="title">
                    Total revenue: {movie.boxOfficeRevenue} Mill $
                  </h3>
                  <h3 className="title">Overview:</h3>
                  <p className="description">{movie.description}</p>
                  <h3 className="title">Cast:</h3>
                  <div className="cast">
                    {movie.cast &&
                      movie.cast.map((castedActor, index) => (
                        <p key={index}>
                          {castedActor.name} as {castedActor.role}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="button-container">
            {currentPage > 1 && (
              <button className="button-style-pushable" onClick={prevPage}>
                <span className="button-style-shadow"></span>
                <span className="button-style-edge"></span>
                <span className="button-style-front text">&lt; prev </span>
              </button>
            )}
            {currentMovies.length === moviesPerPage && (
              <button className="button-style-pushable" onClick={nextPage}>
                <span className="button-style-shadow"></span>
                <span className="button-style-edge"></span>
                <span className="button-style-front text">next &gt;</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Movies;
