import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { HomeComponent }          from '../../components/home/home.component';
import { TreatsComponent }        from '../../components/home/treats/treats.component';
import { TreatComponent }        from '../../components/home/treat/treat.component';
import { AsktreatComponent }      from '../../components/home/asktreat/asktreat.component';
import { TreatrequestsComponent } from '../../components/home/treatrequests/treatrequests.component';
import { TreathistoryComponent }  from '../../components/home/treathistory/treathistory.component';
import { LandingpageComponent }   from '../../components/landingpage/landingpage.component';
import { AuthGuard }              from '../../guards/auth.guard';
import { LandingpageGuard }       from '../../guards/landingpage.guard';
import { TrashComponent }         from '../../components/home/trash/trash.component';
import { ProfileComponent } from '../../components/home/profile/profile.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home/treats', pathMatch: 'full'},
      { path: 'treats', component: TreatsComponent },
      { path: 'treat', component: TreatComponent },
      { path: 'asktreat', component: AsktreatComponent },
      { path: 'treatrequests', component: TreatrequestsComponent },
      { path: 'treathistory', component: TreathistoryComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '', component: LandingpageComponent, canActivate: [LandingpageGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}