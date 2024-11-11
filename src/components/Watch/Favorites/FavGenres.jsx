import React from "react";
import { useOutletContext } from "react-router-dom";
import GenreBox from "../GenreBox";

const FavGenres = () => {
  const { favoriteGenres } = useOutletContext();

  return (
    <div className=" favTemplateScroll favGenres">
      <div className="favGenresGrid">
        {favoriteGenres?.map((item) => (
          <GenreBox item={item} key={item.data.id} />
        ))}
      </div>
    </div>
  );
};

export default FavGenres;
