import React from "react";
import { Link } from "react-router-dom";

const ResultsList = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((group) => (
        <div key={group.id}>
          <Link to={`/details/${group.id}`}>
            <div>
              <h3>{group?.name}</h3>
              <h3>Group Bio: {group.bio} </h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ResultsList;
