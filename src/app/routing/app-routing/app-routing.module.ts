import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }        from '../../components/home/home.component';
import { LandingpageComponent } from '../../components/landingpage/landingpage.component';
import { AuthGuard }            from '../../guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: '',  component: LandingpageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}