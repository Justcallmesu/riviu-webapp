import Rating from "./Rating";
import { useState, useEffect } from "react";

function AddMovie() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
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
  return (
    <div className="">
      <div className="pt-5">
        <div className="w-full justify-around sm:flex">
          {/* <img
            className="h-full w-full rounded-lg md:h-2/4 md:w-1/4"
            src="../img/suzume.jpg"
          /> */}
          <input type="file" onChange={onSelectFile} hidden={selectedFile} />
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
                  type="email"
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
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
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
                  className="block h-24 max-h-32 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  type="text"
                  required
                />
              </div>
              <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
                Rating
              </label>
              <div className="flex">
                <Rating />
                <Rating />
                <Rating />
                <Rating />
                <Rating />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
