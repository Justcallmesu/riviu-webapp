import { axiosPostMovie } from "@/config/axios/movies/movies";
import { useAxiosPostPatch } from "@/hooks/PostPatchAxios";
import { movieQueryKeys } from "@/queryKeys/movies";
import { GetUser } from "@/utils/LocalStorage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

function AddMovie() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [rating, setRating] = useState(1);

  const [name, setname] = useState();
  const [releaseDate, setreleaseDate] = useState();
  const [synopsis, setsynopsis] = useState();
  const [reviewAuthor, setreviewAuthor] = useState();
  const [youtubeLink, setyoutubeLink] = useState();

  const { mutate: mutateCreateMovie } = useAxiosPostPatch({
    config: () => axiosPostMovie(),
    redirect: "/dashboard/home",
    invalidateQueryKey: movieQueryKeys._def,
    invalidateType: "all",
  });

  const renderRatingElement = () => {
    const components = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        components.push(
          <Rating
            isRating={true}
            onClick={() => {
              setRating(i + 1);
            }}
          />
        );
      } else {
        components.push(
          <Rating
            onClick={() => {
              console.log(i);
              setRating(i + 1);
            }}
          />
        );
      }
    }

    return components;
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleFormSubmit = () => {
    if (
      !name ||
      !releaseDate ||
      !synopsis ||
      !reviewAuthor ||
      !selectedFile ||
      !youtubeLink
    ) {
      return alert("Mohon isi semua field");
    }

    const formData = new FormData();

    const imagefile = document.querySelector("#fileImage");

    formData.append("file", imagefile.files[0]);
    formData.append(
      "moviesData",
      JSON.stringify({
        name,
        synopsis,
        releaseDate,
        authorReview: reviewAuthor,
        rating,
        youtubeLink,
      })
    );

    mutateCreateMovie({
      data: formData,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!GetUser()) {
      navigate("/dashboard/home", { replace: true });
    }
  }, []);

  return (
    <div className="">
      <div className="pt-5">
        <div className="w-full justify-around sm:flex">
          {/* <img
            className="h-full w-full rounded-lg md:h-2/4 md:w-1/4"
            src="../img/suzume.jpg"
          /> */}
          <input
            type="file"
            id="fileImage"
            accept="image/*"
            onChange={onSelectFile}
            hidden={selectedFile}
          />
          {selectedFile && (
            <img
              src={preview}
              className="h-full w-full rounded-lg md:h-2/4 md:w-1/4"
            />
          )}
          <div></div>
          <div className="mt-5 w-full md:w-2/4">
            <form className="w-full">
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Film Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  id="email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Release Date
                </label>
                <input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setreleaseDate(e.target.value)}
                  id="email"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Synopsis
                </label>
                <textarea
                  type="text"
                  value={synopsis}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  onChange={(e) => setsynopsis(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Link Youtube Trailer Film
                </label>
                <input
                  type="text"
                  value={youtubeLink}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                  onChange={(e) => setyoutubeLink(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Review Author
                </label>
                <textarea
                  onChange={(e) => setreviewAuthor(e.target.value)}
                  value={reviewAuthor}
                  className="block h-24 max-h-32 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  type="text"
                  required
                />
              </div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Rating
              </label>
              <div className="flex">{renderRatingElement()}</div>
              <div
                onClick={handleFormSubmit}
                className="mt-5 inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white transition hover:animate-bounce hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Simpan Film
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
