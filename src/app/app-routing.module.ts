import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartPageComponent } from "./components/start-page/start-page.component"
import { ReposListComponent } from "./components/repos-list/repos-list.component"


const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'ReposList/:id', component: ReposListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }