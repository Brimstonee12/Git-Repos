import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HandleReposService {
  //TUTAJ NA KONCU JESZCZE TRZEBA DAC "/${username}/repos"


  private githubReposApiUrl(username: string){
    return `https://api.github.com/users/${username}/repos`;
  }
    
  constructor() {}
}
