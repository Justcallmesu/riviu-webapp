import { useAxiosDelete } from "@/hooks/DeleteAxios";
import { GetUser } from "@/utils/LocalStorage";
import { Pagination } from "flowbite-react";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  axiosDeleteMovie,
  axiosGetMoviesForMe,
} from "../../config/axios/movies/movies";
import useGetAxios from "../../hooks/GetAxios";
import { movieQueryKeys } from "../../queryKeys/movies";
import MovieCard from "../../widgets/movie-card";

export function MyMovies() {
  const [moviesQuery, setMoviesQuery] = useState({
    page: 1,
    limit: 10,
  });

  const { data: movieData, isFetching: isMovieFetching } = useGetAxios({
    config: axiosGetMoviesForMe(),
    queryKey: movieQueryKeys.lists(moviesQuery).queryKey,
    queryParams: moviesQuery,
  });

  const { mutate: mutateDeleteMovie } = useAxiosDelete({
    config: (id) => axiosDeleteMovie(id),
    invalidateQueryKey: movieQueryKeys._def,
    invalidateType: "all",
  });

  const handleMoviesSearch = debounce((value) => {
    setMoviesQuery((prev) => ({
      ...prev,
      search: value,
    }));
  }, 500);

  const navigate = useNavigate();

  const handleDeleteMovie = (id) => {
    if (confirm("Yakin menghapus film ini ?")) {
      mutateDeleteMovie({
        id,
      });
    }
  };

  const handlePageSize = (data) => {
    setMoviesQuery((prev) => ({
      ...prev,
      page: data,
    }));
  };

  useEffect(() => {
    if (!GetUser()) {
      navigate("/dashboard/home", { replace: true });
    }
  }, []);

  return (
    <div className="mt-12">
      <input
        placeholder="Search Movies"
        className="w-full p-5"
        onChange={(e) => handleMoviesSearch(e.target.value)}
      />
      <div className="pt-5">
        {isMovieFetching ? (
          <div role="status" className="flex w-full justify-center">
            <svg
              aria-hidden="true"
              class="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {movieData?.items?.length ? (
              <>
                <div className="grid grid-cols-1 justify-center lg:grid-cols-3 xl:grid-cols-3">
                  {movieData?.items?.map((movie) => (
                    <MovieCard>
                      <div className=" overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                        <div className="">
                          <img
                            className="rounded-t-lg object-cover transition hover:scale-110 "
                            src={`https://riviu-server-production.up.railway.app/api/v1/files/${movie.image}`}
                          />
                        </div>
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

                          <div className="flex w-full flex-wrap justify-between">
                            <div className="grid-cols-1 grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-1">
                              <Link to={`/dashboard/moviePage/${movie.id}`}>
                                <div className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white transition hover:animate-bounce hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                  Detail FIlm
                                </div>
                              </Link>
                              <div
                                className="inline-flex items-center rounded-lg bg-red-700 px-3 py-2 text-center text-sm font-medium text-white transition hover:animate-bounce hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={() => handleDeleteMovie(movie.id)}
                              >
                                Hapus Film
                              </div>
                              <Link to={`/dashboard/edit/${movie.id}`}>
                                <div className="inline-flex items-center rounded-lg bg-orange-500 px-3 py-2 text-center text-sm font-medium text-white transition hover:animate-bounce hover:bg-orange-800 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                                  Edit Film
                                </div>
                              </Link>
                            </div>
                            <div class="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                                />
                              </svg>
                              <p class="cursorPo ms-2 text-sm font-bold text-gray-900 dark:text-white">
                                {movie?.likeCount}
                              </p>
                              <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
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
                <Pagination
                  className="w-full justify-center"
                  currentPage={movieData?.meta?.currentPage}
                  totalPages={movieData?.meta?.totalPages}
                  onPageChange={(page) => handlePageSize(page)}
                />
              </>
            ) : (
              <div className="flex w-full items-center justify-center">
                <h1 className="text-center">Tidak Ada Film Ditemukan</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyMovies;
