import React from "react";
import { IconTicket, IconTicketOff } from "@tabler/icons-react";
import Modal from "../widgets/modal";
import Seat from "../widgets/seat";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useGlobalState } from "./dashboard/state";
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function MoviePage() {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  //   const initialState = { price: 0 };
  //   const { useGlobalState } = createGlobalState(initialState);
  //   const [price, setPrice] = useGlobalState("price");
  const price = useGlobalState("price");

  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);
  const http = "http://localhost:8080/api";

  useEffect(() => {
    async function getMovieDetail() {
      setLoading(true);
      try {
        const { data } = await axios(`${http}/trans`);
        console.log(data);
      } catch (error) {
        console.log("Data Error Boi");
        console.log(error);
        setLoading(false);
      }
    }
    getMovieDetail().then((r) => r);
  }, []);

  const currentId = movieDetail.id;
  const user = localStorage.getItem("user");
  const intPrice = parseInt(price);
  const qty = intPrice / 50000;
  const date = moment();
  const currentDate = date.format("YYYY/MM/DD");
  const tanggalTayang = date.add(10, "days").format("YYYY/MM/DD");

  async function buyTicket() {
    const mySwal = withReactContent(Swal);
    try {
      let formData = new FormData();

      //insert FormData
      //formData.append("id", currentId + 1);
      formData.append("atas_nama", user);
      formData.append("no_handphone", "081239400931");
      formData.append("tanggal_pesan", currentDate);
      formData.append("tanggal_tayang", tanggalTayang);
      formData.append("id_movies", currentId);
      formData.append("kuantitas", qty);
      formData.append("grand_total", intPrice);
      formData.append("keterangan", "Random Item...");

      const datas = await axios.post(
        "http://localhost:8000/api/traensaksi/store",
        formData
      );
      if (datas.data.message == "success") {
        mySwal.fire({
          title: <p>Success Buy Ticket</p>,
          html: <i>Check Notification Now</i>,
          icon: "success",
        });
        localStorage.setItem("isBuy", true);
        localStorage.setItem("dateBuy", currentDate);
      }
    } catch (error) {}
  }

  //   const seat = [
  //     {
  //       id: 0,
  //       seat: "A1",
  //     },
  //     {
  //       id: 1,
  //       seat: "A2",
  //     },
  //     {
  //       id: 2,
  //       seat: "A3",
  //     },
  //     {
  //       id: 3,
  //       seat: "B1",
  //     },
  //     {
  //       id: 4,
  //       seat: "B2",
  //     },
  //     {
  //       id: 5,
  //       seat: "B3",
  //     },
  //     {
  //       id: 6,
  //       seat: "C1",
  //     },
  //     {
  //       id: 7,
  //       seat: "C2",
  //     },
  //     {
  //       id: 8,
  //       seat: "C3",
  //     },
  //   ];

  return (
    <div className="py-5">
      <a className="text-2xl font-bold">Suzume</a>
      <div className="md:grid md:grid-cols-3 md:gap-5">
        <div className="pl-5 pt-5 ">
          <img
            src={`/img/suzume.jpg`}
            className="rounded-lg object-cover md:h-96 md:w-72"
          />
        </div>
        <div className="md:col-span-2">
          <a className="flex pt-5 text-2xl font-bold md:pt-0">Description</a>
          <p className="max-w-2xl pb-5 pt-5 text-justify indent-8 font-normal tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            nemo exercitationem, ea nulla debitis porro dolor, iste natus
            distinctio vero tempora nostrum eius recusandae sit praesentium est
            ab inventore officia.
          </p>
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
                4.95
              </p>
              <span class="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
              <a
                href="#"
                class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
              >
                1,000 Reviews
              </a>
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
