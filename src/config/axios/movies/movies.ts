import { AxiosRequestConfig } from "axios";

export function axiosGetMovies(): AxiosRequestConfig {
  return {
    method: "GET",
    url: "/movies",
  };
}

export function axiosGetMovie(id: number): AxiosRequestConfig {
  return {
    method: "GET",
    url: `/movies/${id}`,
  };
}

export function axiosGetMoviesForMe(): AxiosRequestConfig {
  return {
    method: "GET",
    url: "/movies/me",
  };
}

export function axiosPostMovie(): AxiosRequestConfig {
  return {
    method: "POST",
    url: "/movies",
  };
}

export function axiosPatchMovie(id: number): AxiosRequestConfig {
  return {
    method: "PATCH",
    url: `/movies/${id}`,
  };
}

export function axiosDeleteMovie(id: number): AxiosRequestConfig {
  return {
    method: "DELETE",
    url: `/movies/${id}`,
  };
}
