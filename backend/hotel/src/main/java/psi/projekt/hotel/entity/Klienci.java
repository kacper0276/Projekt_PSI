package psi.projekt.hotel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum RodzajKlienta {KlientIndywidualny, KlientBizesowy};
enum RolaUzytkownika {Administrator, Recepcjonista, Klient};

@Entity
@Table(name = "Klienci")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Klienci {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String email;
    private String imie;
    private String nazwisko;
    private String nip;
    private String nazwaFirmy;
    @Enumerated(EnumType.STRING)
    private RodzajKlienta rodzaj;
    private String haslo;
    @Enumerated(EnumType.STRING)
    private RolaUzytkownika rola;
}