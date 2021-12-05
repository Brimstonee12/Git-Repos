import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repositories } from "../types/Repositories";
@Injectable({
  providedIn: 'root',
})
export class HandleReposService {
  reposList$: Observable<Repositories[]>;
  isListLoading: boolean = false
  constructor(private http: HttpClient) {}

  private gitHubReposApiUrl(username: string) {
    return `https://api.github.com/users/${username}/repos`;
  }

  getGitHubRepos(username: string) {
    this.reposList$ = this.http.get<Repositories[]>(this.gitHubReposApiUrl(username));
    this.isListLoading = true
  }

  handleErrorMessage(errorType: number) {
    switch (errorType) {
      case 404:
        return 'User Not Found';
      case 0:
        return 'Field cannot be empty';
      case 500:
        return 'Something went wrong :(';
    }
  }
}
