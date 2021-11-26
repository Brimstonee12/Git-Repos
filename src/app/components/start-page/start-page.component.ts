import { Component, OnInit } from '@angular/core';
import { HandleReposService } from '../../services/handle-repos.service';
import { Repositories } from '../../types/Repositories';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  searchName: string;
  errorMessage: string;
  constructor(
    private handleReposService: HandleReposService,
    private router: Router
  ) {}

  private handleUserData(data: Repositories[]) {
    this.errorMessage = '';
    if (data) {
      this.router.navigateByUrl(`ReposList/${this.searchName}`);
    }
  }

  handleSearchButton() {
    if (this.searchName) {
      this.handleReposService.getGitHubRepos(this.searchName);
      this.handleReposService.reposList$.subscribe(
        (res: Repositories[]) => this.handleUserData(res),
        (err) => this.errorMessage = this.handleReposService.handleErrorMessage(err.status)
      );
    } else {
      this.errorMessage = this.handleReposService.handleErrorMessage(0);
    }
  }
  ngOnInit(): void {}
}
