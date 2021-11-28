import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HandleReposService } from '../../services/handle-repos.service';
import { Repositories } from '../../types/Repositories';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderByValuePipe } from '../../pipes/order-value.pipe';
import { OrderByDatePipe } from '../../pipes/order-date.pipe';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.scss'],
})
export class ReposListComponent implements OnInit, OnDestroy {
  searchName: string;
  gitReposList: Repositories[] = [];
  @ViewChild(MatTable) table: MatTable<any>;
  availableFilters: string[] = [
    'Name',
    'Language',
    'Date Ascending',
    'Date Descending',
  ];
  displayedColumns: string[] = ['name', 'language', 'created_at'];
  userName: string;
  errorMessage: string;
  paramsSubscription: Subscription;

  constructor(
    private router: Router,
    private handleReposService: HandleReposService,
    private route: ActivatedRoute,
    private orderByValuePipe: OrderByValuePipe,
    private orderByDatePipe: OrderByDatePipe
  ) {}

  private getDataByUrlKey() {
    this.paramsSubscription = this.route.paramMap.subscribe((param) => {
      const parameter = param.get('id');
      if (param && this.userName !== parameter) {
        this.handleReposService.getGitHubRepos(parameter);
        this.handleReposService.reposList$.subscribe((res) => {
          (this.userName = parameter),
            (this.gitReposList = res),
            (err) => {
              this.errorMessage = this.handleReposService.handleErrorMessage(
                err.status
              );
            };
        });
      }
    });
  }

  handleSearchButton() {
    if (this.searchName) {
      this.handleReposService.getGitHubRepos(this.searchName);
      this.handleReposService.reposList$.subscribe(
        (res) => {
          (this.gitReposList = res),
            (this.userName = this.searchName),
            this.router.navigateByUrl(`ReposList/${this.searchName}`),
            (this.searchName = '');
        },
        (err) => {
          this.errorMessage = this.handleReposService.handleErrorMessage(
            err.status
          );
        }
      );
    } else {
      this.errorMessage = this.handleReposService.handleErrorMessage(0);
    }
  }

  filterReposList(filter: string) {
    if (filter === 'Name') {
      this.orderByValuePipe.transform(this.gitReposList, 'Name');
    } else if (filter === 'Language') {
      this.orderByValuePipe.transform(this.gitReposList, 'Language');
    } else if (filter === 'Date Ascending') {
      this.orderByDatePipe.transform(this.gitReposList, 'Ascending');
    } else if (filter === 'Date Descending') {
      this.orderByDatePipe.transform(this.gitReposList, 'Descending');
    }
    this.table.renderRows();
  }

  ngOnInit(): void {
    this.getDataByUrlKey();
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
