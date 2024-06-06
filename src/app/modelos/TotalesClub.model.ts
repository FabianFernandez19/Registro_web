export class TotalesClub {
  id?: number;
  club_id: number;
  club_nombre: string;
  total_acampantes: number;
  total_club: number;

  constructor(club_id: number, club_nombre: string, total_acampantes: number, total_club: number, id?: number) {
    this.id = id;
    this.club_id = club_id;
    this.club_nombre = club_nombre;
    this.total_acampantes = total_acampantes;
    this.total_club = total_club;
  }
}

  
  