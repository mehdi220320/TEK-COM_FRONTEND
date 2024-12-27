import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";
import {User} from "../../Models/User";
import {File2} from "../../Models/Post";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-users-table-panel',
  templateUrl: './users-table-panel.component.html',
  styleUrls: ['./users-table-panel.component.css']
})
export class UsersTablePanelComponent implements OnInit {
    index=1;
    randomUsers:User[] = [];
  showNum: number = 10;
  constructor(private userService:UserServiceService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe((response)=>{
      this.randomUsers=response;
      console.log("aw users : "+response)
    },(error)=>{
      console.error("can t fetch all users")
    })
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
  tableViews():User[]{
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
  getImageURL(image:any):any{
    if(image===null)
      if(this.index++%2==1)
        return  'assets/images/background/img.png'
      else
        return 'assets/images/users/user-1.jpg'
    else {
      const file: File2 = image;
      return this.sanitizer.bypassSecurityTrustUrl(`data:${file.fileType};base64,${file.data}`);
    }
  }


}
