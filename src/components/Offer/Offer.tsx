"use client";
import { useAppSelector } from "@/store";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ArrData {
  description: string;
  promotional_code: string;
  statusOpt: boolean;
  title: string;
}

const Offer = () => {
  const { isAuth, mail: mailRedux } = useAppSelector((state) => state.auth);
  const [arrOffers, setArrOffers] = useState<ArrData[]>([]);
  const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

  const fetchDelete = async (nameProduct: string) => {
    //console.log(nameProduct);
    try {
      const fetch = await axios.delete(
        `${backendUrl}/offer/deleteOfferUser?email=${mailRedux}&title=${nameProduct}`
      );
      alert(`Codigo canjeado ${nameProduct}`);
      // Aquí es donde actualizas el estado
      setArrOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.title !== nameProduct)
      );

      //console.log(fetch.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOffer = async () => {
    try {
      const fetchData = await axios.get(
        `${backendUrl}/offer/allOfferTrue?email=${mailRedux}`
      );
      setArrOffers(fetchData.data.offers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOffer();
  }, [isAuth]);

  return (
    <div className="containerOffer">
      {arrOffers.map((offer, index) => (
        <div key={index}>
          <h1>{offer.promotional_code}</h1>
          <button className="" onClick={() => fetchDelete(offer.title)}>
            Canjear Código
          </button>
        </div>
      ))}
    </div>
  );
};

export default Offer;
