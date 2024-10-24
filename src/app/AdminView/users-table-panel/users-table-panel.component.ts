import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";
import {User} from "../../Models/User";

@Component({
  selector: 'app-users-table-panel',
  templateUrl: './users-table-panel.component.html',
  styleUrls: ['./users-table-panel.component.css']
})
export class UsersTablePanelComponent implements OnInit {
    index=1;
    randomUsers = [
    new User(1, "Dupont", "Jean", "jdupont", "jdupont@example.com", new Date(1995, 4, 15), "student", "Active"),
    new User(2, "Martin", "Sophie", "smartin", "smartin@example.com", new Date(1997, 10, 25), "student", "Banned"),
    new User(3, "Leclerc", "Paul", "pleclerc", "pleclerc@example.com", new Date(1988, 2, 30), "admin", "Active"),
    new User(4, "Durand", "Marie", "mdurand", "mdurand@example.com", new Date(2000, 7, 5), "student", "Banned"),
    new User(5, "Bernard", "Luc", "lbernard", "lbernard@example.com", new Date(1992, 11, 10), "admin", "Active"),
    new User(6, "Petit", "Claire", "cpetit", "cpetit@example.com", new Date(1999, 3, 17), "student", "Active"),
    new User(7, "Moreau", "David", "dmoreau", "dmoreau@example.com", new Date(1994, 6, 22), "student", "Banned"),
    new User(8, "Roux", "Emma", "eroux", "eroux@example.com", new Date(1991, 1, 19), "admin", "Active"),
    new User(9, "Fournier", "Alice", "afournier", "afournier@example.com", new Date(2002, 9, 28), "student", "Active"),
    new User(10, "Girard", "Louis", "lgirard", "lgirard@example.com", new Date(1996, 0, 12), "student", "Banned"),
    new User(11, "Lambert", "Julie", "jlambert", "jlambert@example.com", new Date(1998, 5, 2), "student", "Active"),
    new User(12, "Bonnet", "Pierre", "pbonnet", "pbonnet@example.com", new Date(1993, 7, 30), "admin", "Banned"),
    new User(13, "François", "Nathalie", "nfrancois", "nfrancois@example.com", new Date(1990, 3, 5), "admin", "Active"),
    new User(14, "Mercier", "Charles", "cmercier", "cmercier@example.com", new Date(1987, 2, 14), "admin", "Banned"),
    new User(15, "Muller", "Céline", "cmuller", "cmuller@example.com", new Date(1997, 8, 6), "student", "Active"),
    new User(16, "Leroy", "Hugo", "hleroy", "hleroy@example.com", new Date(2001, 11, 20), "student", "Banned"),
    new User(17, "Gautier", "Victor", "vgautier", "vgautier@example.com", new Date(1989, 5, 7), "admin", "Active"),
    new User(18, "Perrin", "Camille", "cperrin", "cperrin@example.com", new Date(1996, 9, 29), "student", "Active"),
    new User(19, "Renard", "Marc", "mrenard", "mrenard@example.com", new Date(1995, 2, 13), "student", "Banned"),
    new User(20, "Bertrand", "Laura", "lbertrand", "lbertrand@example.com", new Date(1999, 10, 11), "student", "Active"),
    new User(21, "Morel", "Antoine", "amorel", "amorel@example.com", new Date(1990, 7, 23), "admin", "Active"),
    new User(22, "Clément", "Isabelle", "iclement", "iclement@example.com", new Date(1986, 9, 30), "admin", "Banned"),
    new User(23, "Giraud", "Thomas", "tgiraud", "tgiraud@example.com", new Date(1998, 11, 9), "student", "Active"),
    new User(24, "Barbier", "Elodie", "ebarbier", "ebarbier@example.com", new Date(2000, 4, 18), "student", "Banned"),
    new User(25, "Renaud", "Quentin", "qrenaud", "qrenaud@example.com", new Date(1993, 3, 27), "admin", "Active"),
    new User(26, "Poirier", "Mathieu", "mpoirier", "mpoirier@example.com", new Date(1995, 8, 16), "student", "Active"),
    new User(27, "Gonzalez", "Aurélie", "agonzalez", "agonzalez@example.com", new Date(1997, 7, 21), "student", "Banned"),
    new User(28, "Andre", "Léa", "landre", "landre@example.com", new Date(1992, 11, 4), "admin", "Active"),
    new User(29, "Rolland", "Romain", "rrolland", "rrolland@example.com", new Date(1988, 5, 9), "admin", "Banned"),
    new User(30, "Brun", "Julie", "jbrun", "jbrun@example.com", new Date(1991, 1, 1), "admin", "Active"),
    new User(31, "Blanc", "Sarah", "sblanc", "sblanc@example.com", new Date(1998, 6, 12), "student", "Active"),
    new User(32, "Dufour", "Maxime", "mdufour", "mdufour@example.com", new Date(1996, 10, 15), "student", "Banned"),
    new User(33, "Pires", "Alexandre", "apires", "apires@example.com", new Date(1985, 9, 3), "admin", "Active")
  ];
  showNum: number = 10;

  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    // this.userService.getAllUsers().subscribe((data) => {
    //   this.alluser = data;
    //   console.log(this.alluser);
    // });
  }
  numViews(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.showNum = Number(target.value);
    this.IndexChange(1);
  }
  getTotIndex(): number[] {
    const totalPages = Math.ceil(this.randomUsers.length / this.showNum);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  nextIndex(){
    const totalPages = Math.ceil(this.randomUsers.length / this.showNum);
    if(totalPages==this.index){
      this.index=1;
    }else{
      this.index++;
    }
  }
  previousIndex(){
    const totalPages = Math.ceil(this.randomUsers.length / this.showNum);
    if(this.index==1){
      this.index=totalPages;
    }else{
      this.index--;
    }
  }
  IndexChange(i:number):void{
    this.index=i;
  }
  tableViews():any[]{
    if(this.index==1){
     return  this.randomUsers.slice(this.index-1,this.index*this.showNum)
    }
    return this.randomUsers.slice((this.index-1)*this.showNum,this.index*this.showNum);
  }
  deleteUser(id: number): void {
    let index = this.randomUsers.findIndex(user => user.id === id);
    if (index > -1) {
      this.randomUsers.splice(index, 1);
    }
  }

}
