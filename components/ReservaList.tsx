import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";
import { Reserva } from "../types";
import ReservaCard from "./ReservaCard";
import { ReservasContext, useReservas } from "./context/ReservasContext";

interface Props {
  selectedDate: Date;
}


const ReservaList = ({ selectedDate }: Props) => {
  const { reservas, guardarReserva, poblarLista } = useReservas();

  const dia = selectedDate.getDate();
  const mes = selectedDate.getMonth() + 1;
  const anio = selectedDate.getFullYear();

  // Formateamos los valores en el formato "dd/mm/yyyy"
  const fecha = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${anio}`;

  useEffect( () => {
    console.log(reservas)
    console.log(fecha)
    poblarLista(reservas, fecha)
  }, [selectedDate])


  return (
    <FlatList
      data={reservas}
      renderItem={({ item }) => <ReservaCard reserva={item} />}
      keyExtractor={item => item.id.toString()}
    />
  )
}


export default ReservaList;