import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleReposService {
  reposList$: Observable<any>;

  constructor(private http: HttpClient) {}

  private githubReposApiUrl(username: string) {
    return `https://api.github.com/users/${username}/repos`;
  }

  getGitHubRepos(username: string) {
    this.reposList$ = this.http.get(this.githubReposApiUrl(username));
  }
}
