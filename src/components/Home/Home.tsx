"use client";
import { useAppSelector } from "@/store";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiImageOff } from "react-icons/ci";
import {
  MdOutlineAddShoppingCart,
  MdOutlineRemoveShoppingCart,
} from "react-icons/md";

interface ArrData {
  description: string;
  promotional_code: string;
  statusOpt: boolean;
  title: string;
}

const HomePage = () => {
  const [arrOffers, setArrOffers] = useState<ArrData[]>([]);
  const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;
  const [userMail, setUserMail] = useState<string | null>("");
  const email = localStorage.getItem("userEmail");
  const { isAuth, mail: mailRedux } = useAppSelector((state) => state.auth);

  const router = useRouter();
  //console.log(backendUrl);

  const fetchAddOffer = async (title: string, email: string | null) => {
    if (!mailRedux) {
      router.push("/login");
    }
    try {
      const fetchData = await axios.post(`${backendUrl}/user/add`, {
        mail: email,
        title: title,
      });

      setArrOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.title === title ? { ...offer, statusOpt: false } : offer
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOffers = async () => {
    try {
      // const email = localStorage.getItem("userEmail");
      console.log("sd");
      if (!mailRedux) {
        const fetchData = await axios.get(`${backendUrl}/offer/allOffer`);

        console.log(fetchData.data.offers);
        setArrOffers(fetchData.data.offers);
        return;
      }
      //setUserMail(email);
      const fetchData = await axios.get(
        `${backendUrl}/offer/allOfferUser?email=${mailRedux}`
      );
      console.log(fetchData.data.offers);
      setArrOffers(fetchData.data.offers);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOffers();
  }, [isAuth]);
  //console.log(arrOffers);

  return (
    <main>
      {arrOffers?.map((offer, index) => (
        <div key={index}>
          <h1>{offer.title}</h1>
          <CiImageOff size={50} />
          <button disabled={!offer.statusOpt}>
            <p>Agregar Oferta</p>
            {!offer.statusOpt ? (
              <MdOutlineRemoveShoppingCart size={20} />
            ) : (
              <MdOutlineAddShoppingCart
                onClick={() => fetchAddOffer(offer.title, mailRedux)}
                size={20}
              />
            )}
          </button>
        </div>
      ))}
    </main>
  );
};

export default HomePage;
