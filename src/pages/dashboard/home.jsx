import { IconArrowForward } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosGetMovies } from "../../config/axios/movies/movies";
import useGetAxios from "../../hooks/GetAxios";
import { movieQueryKeys } from "../../queryKeys/movies";
import CarouselHome from "../../widgets/layout/carousel";
import MovieCard from "../../widgets/movie-card";

export function Home() {
  const [moviesQuery, setMoviesQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data: movieData } = useGetAxios({
    config: axiosGetMovies(),
    queryKey: movieQueryKeys.lists(moviesQuery).queryKey,
    queryParams: moviesQuery,
  });

  return (
    <div className="mt-12">
      <CarouselHome />
      <div className="pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3">
          {movieData?.items?.map((movie) => (
            <MovieCard>
              <div className=" overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                <div className="">
                  <img
                    className="rounded-t-lg object-cover transition hover:scale-110 "
                    src={`http://localhost:3000/api/v1/files/${movie.image}`}
                  />
                </div><iframe width="560" height="315" src="https://www.youtube.com/embed/FQ7UCX-haRk?si=M7QkkvmHQVn4Ie7P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div className="px-5 py-8">
                  <a href="#">
                    <h5 className="mb-2 truncate text-2xl font-bold tracking-wide text-gray-900 ">
                      {movie.name}
                    </h5>
                  </a>

                  <div className="max-h-32">
                    <p className="mb-3 line-clamp-3 text-justify font-normal tracking-tight text-gray-700 dark:text-gray-400">
                      {movie.synopsis}
                    </p>
                  </div>

                  <div className="flex w-full justify-between">
                    <Link to={`/dashboard/moviePage/${movie.id}`}>
                      <div className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white transition hover:animate-bounce hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Detail
                        <svg
                          aria-hidden="true"
                          className="-mr-1 ml-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                        <IconArrowForward></IconArrowForward>
                      </div>
                    </Link>
                    <div class="flex items-center">
                      <svg
                        class="me-1 h-4 w-4 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                        {movie.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MovieCard>
          ))}

          {/* {movies.length ? (
            <>
              {movies.map((movie) => (

              ))}
            </>
          ) : (
            <div className="justify-center text-2xl font-bold">Loading...</div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
