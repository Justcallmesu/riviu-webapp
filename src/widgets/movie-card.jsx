import React from "react";


function MovieCard({ children }) {
  return (
    <div className=" gap-5 pt-5 sm:grid-cols-2 md:pl-5 md:pt-5">
      {children}
    </div>
  );
}

export default MovieCard;
