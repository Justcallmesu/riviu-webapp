import { axiosGetMovie, axiosLikeMovie } from "@/config/axios/movies/movies";
import useGetAxios from "@/hooks/GetAxios";
import { useAxiosPostPatch } from "@/hooks/PostPatchAxios";
import { movieQueryKeys } from "@/queryKeys/movies";
import {
  checkLikedMovies,
  dislikedLikedMovies,
  SetLikedMovies,
} from "@/utils/LocalStorage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviePage() {
  //   const initialState = { price: 0 };
  //   const { useGlobalState } = createGlobalState(initialState);
  //   const [price, setPrice] = useGlobalState("price");

  const [movieYoutubeLink, setmovieYoutubeLink] = useState();

  const { id } = useParams();

  const { data: movieData } = useGetAxios({
    config: axiosGetMovie(id),
    queryKey: movieQueryKeys.byId(id).queryKey,
  });

  const { mutate: mutateLikeMovieReview } = useAxiosPostPatch({
    config: (id) => {
      if (id) return axiosLikeMovie(id);
    },
    invalidateQueryKey: movieQueryKeys.byId(id).queryKey,
    invalidateType: "all",
  });

  useEffect(() => {
    if (movieData && movieData?.data?.youtubeLink) {
      let link = movieData?.data?.youtubeLink?.split("?v=")[1];

      if (!link)
        link = movieData?.data?.youtubeLink.split("/")[3].split("?")[0];

      setmovieYoutubeLink(link);
    }
  }, [movieData]);

  const handleMovieLike = async (isLiked) => {
    if (isLiked) {
      dislikedLikedMovies(id);
    } else {
      SetLikedMovies(id);
    }
    console.log("running");

    await mutateLikeMovieReview({
      id: id,
      data: {
        action: isLiked ? "dislike" : "like",
      },
    });
  };

  return (
    <div className="py-5">
      <a className="text-2xl font-bold">{movieData?.data?.name}</a>
      <div className="md:grid md:grid-cols-3 md:gap-5">
        <div className="pl-5 pt-5 ">
          <img
            src={`https://riviu-server-production.up.railway.app/api/v1/api/v1/files/${movieData?.data?.image}`}
            className="rounded-lg object-cover md:h-96 md:w-72"
          />
        </div>
        <div className="md:col-span-2">
          {movieYoutubeLink && (
            <>
              <a className="flex pt-5 text-2xl font-bold md:pt-0">
                Trailer Film
              </a>
              <iframe
                width="100%"
                height="315"
                src={
                  movieYoutubeLink
                    ? `https://www.youtube.com/embed/${movieYoutubeLink}?si=M7QkkvmHQVn4Ie7P`
                    : ""
                }
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </>
          )}
          <div className="my-4">
            <a className="flex  text-2xl font-bold md:pt-0">Sinopsis Film</a>
            <p className="max-w-2xl pb-5  text-justify font-normal tracking-wider">
              {movieData?.data?.synopsis}
            </p>
          </div>
          <div className="my-4">
            <a className="flex text-2xl font-bold md:pt-0">Review Author</a>
            <p className="max-w-2xl text-justify font-normal tracking-wider">
              {movieData?.data?.authorReview}
            </p>
          </div>
          <div className="flex content-center justify-center md:justify-start">
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
                {movieData?.data?.rating}
              </p>
              <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
            </div>
            <div
              class="flex cursor-pointer items-center"
              onClick={() => handleMovieLike(checkLikedMovies(id))}
            >
              {!checkLikedMovies(id) ? (
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
              )}
              <p class="cursorPo ms-2 text-sm font-bold text-gray-900 dark:text-white">
                {movieData?.data?.likeCount}
              </p>
              <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
            </div>

            {/* <button
              onClick={() => setOpen(true)}
              className="flex w-full justify-center whitespace-nowrap rounded-lg bg-blue-700 py-3 tracking-wide text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-500 md:w-36 md:px-3"
            >
              <a className="font-semibold">Something Here</a>
            </button> */}
            {/* <Modal open={open} onClose={() => setOpen(false)}>
              <div className="flex">
                <a className="py-5 text-xl font-bold">Select Seat</a>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {seat.map((seats) => (
                  <Seat key={seats.id}>
                    <a>{seats.seat}</a>
                  </Seat>
                ))}
                <a className="col-span-2">Total Price :{price}</a>
                <div className="">
                  <button
                    onClick={buyTicket}
                    className="flex w-full justify-center whitespace-nowrap rounded-lg bg-blue-700 py-3 tracking-wide text-white transition duration-300 ease-in-out hover:scale-110 hover:bg-blue-500 md:w-36 md:px-3"
                  >
                    <IconTicket />
                    <a className="pl-3 font-semibold">Buy Now</a>
                  </button>
                </div>
              </div>
            </Modal> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
