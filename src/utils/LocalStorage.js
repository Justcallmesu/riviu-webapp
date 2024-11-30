export function GetLikedMovies() {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies"));

  return likedMoviesList;
}

export function checkLikedMovies(id) {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies"));

  if (!likedMoviesList) return false;

  return !!likedMoviesList.find((item) => item === id);
}

export function dislikedLikedMovies(id) {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies"));

  if (!likedMoviesList) return;

  const processedLikedMoviesList = likedMoviesList.filter(
    (item) => item !== id
  );

  localStorage.setItem("likedMovies", JSON.stringify(processedLikedMoviesList));
}

export function SetLikedMovies(id) {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies")) ?? [];

  localStorage.setItem("likedMovies", JSON.stringify([...likedMoviesList, id]));
}
