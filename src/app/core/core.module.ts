import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BsFooterComponent } from './components/bs-footer/bs-footer.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    BsFooterComponent,
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
