import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-suggestion',
  templateUrl: './groups-suggestion.component.html',
  styleUrls: ['./groups-suggestion.component.css']
})
export class GroupsSuggestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showCreateCommunity = false;

  openCreateCommunity() {
    this.showCreateCommunity = true;
  }

  closeCreateCommunity() {
    this.showCreateCommunity = false;
  }
}
