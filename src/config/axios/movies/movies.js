export function axiosGetMovies() {
  return {
    method: "GET",
    url: "/movies",
  };
}

export function axiosGetMovie(id) {
  return {
    method: "GET",
    url: `/movies/${id}`,
  };
}

export function axiosGetMoviesForMe() {
  return {
    method: "GET",
    url: "/movies/me",
  };
}

export function axiosPostMovie() {
  return {
    method: "POST",
    url: "/movies",
  };
}

export function axiosPatchMovie(id) {
  return {
    method: "PUT",
    url: `/movies/${id}`,
  };
}

export function axiosLikeMovie(id) {
  return {
    method: "POST",
    url: `/movies/${id}/like`,
  };
}

export function axiosDeleteMovie(id) {
  return {
    method: "DELETE",
    url: `/movies/${id}`,
  };
}
