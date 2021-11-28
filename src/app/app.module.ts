import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { ReposListComponent } from './components/repos-list/repos-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OrderByValuePipe } from './pipes/order-value.pipe';
import { OrderByDatePipe } from '../app/pipes/order-date.pipe';
import { MatSelectModule } from '@angular/material/select'
@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    ReposListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [
    OrderByDatePipe,
    OrderByValuePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
