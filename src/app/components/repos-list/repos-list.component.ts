import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HandleReposService } from '../../services/handle-repos.service';
import { Repositories } from '../../types/Repositories';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss'],
})
export class ReposListComponent implements OnInit, OnDestroy {
  searchName: string;
  gitReposList: Repositories[] = [];
  displayedColumns: string[] = ['name', 'language', 'created_at'];
  userName: string;
  paramsSubscription: Subscription;
  constructor(
    private router: Router,
    private handleReposService: HandleReposService,
    private route: ActivatedRoute
  ) {}

  private getDataByUrlKey() {
    if (this.gitReposList.length === 0) {
      this.paramsSubscription = this.route.paramMap.subscribe((param) => {
        if (param) {
          console.log('param.get[] :>> ', param.get('id'));
          const parameter = param.get('id');
          this.handleReposService.getGitHubRepos(parameter);
          this.handleReposService.reposList$.subscribe((res) => {
            (this.userName = parameter),
              (this.gitReposList = res),
              (err) => {
                console.log('err1 :>> ', err);
              };
          });
        }
      });
    }
  }

  handleSearchButton() {
    console.log('this.gitReposList :>> ', this.gitReposList);
    if (this.searchName) {
      this.handleReposService.getGitHubRepos(this.searchName);
      this.handleReposService.reposList$.subscribe(
        (res) => {
          (this.gitReposList = res),
            this.router.navigateByUrl(`ReposList/${this.searchName}`),
            (this.userName = this.searchName),
            (this.searchName = '');
        },
        (err) => {
          console.log('err2 :>> ', err);
        }
      );
    }
  }

  ngOnInit(): void {
    console.log('init :>> ');
    this.getDataByUrlKey();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
