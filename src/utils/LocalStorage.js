export function GetLikedMovies() {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies"));

  return likedMoviesList;
}

export function checkLikedMovies(id) {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies"));

  if (!likedMoviesList) return false;

  if (!!GetUser())
    return !!likedMoviesList.find(
      (item) => item.id === id && item.userId === GetUser().id
    );

  return !!likedMoviesList.find((item) => item === id);
}

export function dislikedLikedMovies(id) {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies"));

  if (!likedMoviesList) return;

  if (!!GetUser()) {
    const processedLikedMoviesList = likedMoviesList.filter(
      (item) => item.id !== id || item.userId !== GetUser().id
    );
    return localStorage.setItem(
      "likedMovies",
      JSON.stringify(processedLikedMoviesList)
    );
  }
  const processedLikedMoviesList = likedMoviesList.filter(
    (item) => item !== id
  );

  localStorage.setItem("likedMovies", JSON.stringify(processedLikedMoviesList));
}

export function SetLikedMovies(id) {
  const likedMoviesList = JSON.parse(localStorage.getItem("likedMovies")) ?? [];
  if (!!GetUser())
    return localStorage.setItem(
      "likedMovies",
      JSON.stringify([...likedMoviesList, { id, userId: GetUser().id }])
    );
  localStorage.setItem("likedMovies", JSON.stringify([...likedMoviesList, id]));
}

export function SetUser(data) {
  localStorage.setItem("user", JSON.stringify(data));
}

export function removeUser() {
  localStorage.removeItem("user");
}

export function GetUser() {
  return JSON.parse(localStorage.getItem("user"));
}
