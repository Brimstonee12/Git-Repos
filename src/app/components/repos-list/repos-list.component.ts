import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css']
})
export class ReposListComponent implements OnInit {
  searchName: string;
  gitReposList = []
  constructor(private router: Router) { }

  getDataByUrlKey() {

  }

  handleSearchButton() {
    this.router.navigateByUrl(`ReposList/${this.searchName}`);
  }


  ngOnInit(): void {
  }

}
