import { createContext, useState } from "react";
import { Reserva } from "../../types";
import { View } from "../Themed";

interface ReservasContext {
    reservas: Reserva[];
    addReserva: (reserva: Reserva) => {}
}

export const ReservasContext = createContext<ReservasContext>({
    reservas: [],
    addReserva: (reserva: Reserva) => reserva,
});

const ReservasProvider: React.FC = ({ children }) => {

    const [valor, setValor] = useState<Reserva>('');

    const value = {
        valor,
        setValor,
    };

    return (
        <View>
            {children}
        </View>
    )
}

export default ReservasProvider