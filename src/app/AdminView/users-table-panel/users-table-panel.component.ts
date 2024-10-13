import { Component, OnInit } from '@angular/core';
import {UserServiceService} from "../../Services/user-service.service";

@Component({
  selector: 'app-users-table-panel',
  templateUrl: './users-table-panel.component.html',
  styleUrls: ['./users-table-panel.component.css']
})
export class UsersTablePanelComponent implements OnInit {
  private alluser: any =[];

  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
      this.userService.getAllUsers().subscribe((data) => {
        this.alluser = data;
        console.log(this.alluser);
      });
  }

}
