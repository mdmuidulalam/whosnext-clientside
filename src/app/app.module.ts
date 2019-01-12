import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './routing/app-routing/app-routing.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { AuthService } from './services/auth.service';
import { AccountsService } from './services/accounts.service';
import { TreatsComponent } from './components/home/treats/treats.component';
import { AsktreatComponent } from './components/home/asktreat/asktreat.component';
import { TreathistoryComponent } from './components/home/treathistory/treathistory.component';
import { TrashComponent } from './components/home/trash/trash.component';
import { TreatrequestsComponent } from './components/home/treatrequests/treatrequests.component';
import { TreatComponent } from './components/home/treat/treat.component';
import { ProfileComponent } from './components/home/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingpageComponent,
    TreatsComponent,
    AsktreatComponent,
    TreathistoryComponent,
    TrashComponent,
    TreatrequestsComponent,
    TreatComponent,
    ProfileComponent
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
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, JwtHelperService, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
