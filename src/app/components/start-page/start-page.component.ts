import { Component, OnInit } from '@angular/core';
import { HandleReposService } from '../../services/handle-repos.service';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  searchName: string;
  errorMessage: string;
  constructor(public handleReposService: HandleReposService) {}

  handleUserData(data) {
    console.log('object :>> ',data);
  }

  private handleErrorMessage(errorType: number) {
    switch (errorType) {
      case 404:
        this.errorMessage = 'User Not Found';
        break;
      case 0:
        this.errorMessage = 'Field cannot be empty';
        break;
      case 500:
        this.errorMessage = 'Something went wrong :(';
        break;
    }
  }

  handleSearchButton() {
    if (this.searchName) {
      this.handleReposService.getGitHubRepos(this.searchName);
      this.handleReposService.reposList$.subscribe(
        (res) => this.handleUserData(res),
        (err) => this.handleErrorMessage(err.status)
      );
    } else {
      this.handleErrorMessage(0);
    }
  }
  ngOnInit(): void {}
}
