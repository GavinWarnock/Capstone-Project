import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import ResultsList from "../../components/ResultsList/ResultsList";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const fetchGroups = async () => {
    try {
      let lowerCaseSearchTerm = searchTerm.toLowerCase();
      let response = await axios.get(
        `http://127.0.0.1:5000/api/groups_by_name?q=${lowerCaseSearchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log("Error in fetchGroups request", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`You searched for ${searchTerm}`);
    fetchGroups();
  };

  return (
    <div className="container search">
      <h1>Find A Group!</h1>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />
      <ResultsList searchResults={searchResults} />
    </div>
    
  );
};

export default SearchPage;