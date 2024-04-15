import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../components/url";

const Abilities = () => {
  const [abilities, setAbilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [abilitiesPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedType, setSelectedType] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowGallery(false);
      try {
        const route = "/abilities/getAll";
        const response = await axios.get(apiUrl + route);
        setAbilities(response.data.data);
        setLoading(false);
        setShowGallery(true);
      } catch (error) {
        console.error("Error fetching abilities:", error);
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

  const types = Array.from(new Set(abilities.map((ability) => ability.type)));

  const filteredAbilitiesByType = abilities.filter(
    (ability) => selectedType === "" || ability.type === selectedType
  );

  const filteredAbilitiesByName = filteredAbilitiesByType.filter((ability) =>
    ability.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastAbility = currentPage * abilitiesPerPage;
  const indexOfFirstAbility = indexOfLastAbility - abilitiesPerPage;
  const currentAbilities = filteredAbilitiesByName.slice(
    indexOfFirstAbility,
    indexOfLastAbility
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
              <label htmlFor="selectType">Filter by type</label>
              <select
                id="selectType"
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                <option value="">All types</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="searchBlock">
              <label htmlFor="inputSearch">Filter by name</label>
              <input
                id="inputSearch"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name"
              />
            </div>
          </div>
          <div className="card-gallery">
            {currentAbilities.map((ability, index) => (
              <div className="card-ability" key={index}>
                <div className="card-content">
                  <h2>{ability.name}</h2>
                  <h3 className="title">TYPE:</h3>
                  <p className="abilityType">{ability.type}</p>
                  <h3 className="title">CHARACTERS:</h3>
                  <ul className="characters">
                    {ability.characters.map((character, index) => (
                      <li key={index}>{character}</li>
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
            {currentAbilities.length === abilitiesPerPage && (
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

export default Abilities;
