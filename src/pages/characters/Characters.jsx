import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../components/url";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedAbility, setSelectedAbility] = useState(""); 
  const [abilities, setAbilities] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowGallery(false);
      try {
        const route = "/characters";
        const response = await axios.get(apiUrl + route);
        setCharacters(response.data.data);
        console.log(response.data.data);
        setLoading(false);
        setShowGallery(true);
        const uniqueAbilities = response.data.data.reduce((acc, curr) => {
          curr.abilities.forEach((ability) => {
            if (!acc.includes(ability)) {
              acc.push(ability);
            }
          });
          return acc;
        }, []);
        setAbilities(uniqueAbilities);
      } catch (error) {
        console.error("Error fetching characters:", error);
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

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedAbility === "" || character.abilities.includes(selectedAbility))
  );

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = filteredCharacters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
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
            <label htmlFor="inputName">Filter characters by name</label>
            <input
              id="inputName"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search name"
            />
          </div>
          <div className="searchBlock">
            <label htmlFor="selectAbility">Selecct ability</label>
            <select
              id="selectAbility"
              value={selectedAbility}
              onChange={(event) => setSelectedAbility(event.target.value)}
            >
              <option value="">All the abilities</option>
              {abilities.map((ability, index) => (
                <option key={index} value={ability}>
                  {ability}
                </option>
              ))}
            </select>
          </div>
          </div>
          <div className="card-gallery">
            {currentCharacters.map((character, index) => (
              <div className="card-characters" key={index}>
                <img src={character.img} alt={character.name} />
                <div className="card-characters-content">
                  <h2>{character.name} </h2>
                  {character.realName && <h3>{character.realName}</h3>}
                  <h3 className="title">DESCRIPTION:</h3>
                  <p className="description">{character.description}</p>
                  <h3 className="title">ABILITIES:</h3>
                  <p className="abilities">{character.abilities.join(", ")}</p>
                  <h3 className="title">AFFILIATION:</h3>
                  <ul className="affiliation">
                    {character.team &&
                      character.team.map((team, index) => (
                        <li key={index}>{team}</li>
                      ))}
                  </ul>
                  <h3 className="title">APPEARANCES:</h3>
                  <ul className="appearances">
                    {character.appearances &&
                      character.appearances.map((appearance, index) => (
                        <li key={index}>{appearance}</li>
                      ))}
                  </ul>
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
            {currentCharacters.length === charactersPerPage && (
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

export default Characters;
