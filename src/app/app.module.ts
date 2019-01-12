import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './routing/app-routing/app-routing.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AccountsService } from './services/accounts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function() {
          return localStorage.getItem('AuthorizationToken');
        },
        whitelistedDomains: ['localhost:5826']
      }
    }),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, JwtHelperService, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
