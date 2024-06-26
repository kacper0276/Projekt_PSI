import "./EditUserReservations.css";
import useWebsiteTitle from "../../../hooks/useWebsiteTitle";
import { useContext, useEffect, useState } from "react";
import MainContext from "../../../context/MainContext";
import cutTimeInDateTime from "../../../helpers/cutTimeInDateTime";
import ReservationService from "../../../services/Reservation.service";

export default function EditUserReservations() {
  useWebsiteTitle("Zarządzaj swoimi rezerwacjami");
  const context = useContext(MainContext);
  const [userReservations, setUserReservations] = useState([]);

  const fetchUserReservations = async () => {
    setUserReservations(
      await ReservationService.fetchUserReservations(context.state.username)
    );
  };

  const deleteReservations = (e, id) => {
    e.preventDefault();

    ReservationService.deleteReservation(id).then(() => {
      fetchUserReservations();
    });
  };

  useEffect(() => {
    fetchUserReservations();
  }, []);

  return (
    <div className={`main_container`}>
      <h2>Zarządzaj rezerwacjami</h2>
      <table className={`user_data_table`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Rezerwacji</th>
            <th>Data Zameldowania</th>
            <th>Data Wymeldowania</th>
            <th>Cena</th>
            <th>Forma Zapłaty</th>
            <th>Status płatności</th>
            <th>Nazwisko Klienta</th>
            <th>Numer tel kontaktowy</th>
          </tr>
        </thead>
        <tbody>
          {userReservations.map((reservation, key) => {
            return (
              <tr key={key}>
                <td>{reservation.id}</td>
                <td>
                  {reservation.dataRezerwacji != null
                    ? cutTimeInDateTime(reservation.dataRezerwacji)
                    : "BRAK"}
                </td>
                <td>
                  {reservation.dataZameldowania != null
                    ? cutTimeInDateTime(reservation.dataZameldowania)
                    : "BRAK"}
                </td>

                <td>
                  {reservation.dataWymeldowania != null
                    ? cutTimeInDateTime(reservation.dataWymeldowania)
                    : "BRAK"}
                </td>
                <td>{reservation.cena}</td>
                <td>{reservation.formaZaplaty}</td>
                <td>{reservation.status}</td>
                <td>{reservation.nazwiskoKlienta}</td>
                <td>{reservation.nrTelKontaktowy}</td>
                <td>
                  <button
                    onClick={(e) => deleteReservations(e, reservation.id)}
                  >
                    Anuluj Rezerwację
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
