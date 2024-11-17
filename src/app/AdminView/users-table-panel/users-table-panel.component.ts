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
    randomUsers:User[] = [];
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
