import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOutProfileMenu', [
      transition(':enter', [   
        style({opacity:0, height: '0px'}),
        animate(400, style({opacity:1, height: '96px'})),
      ]),
      transition(':leave', [   
        animate(400, style({opacity:0, height: '0px'})) 
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [   
        style({opacity:0}),
        animate(400, style({opacity:1})),
      ]),
      transition(':leave', [   
        animate(400, style({opacity:0})) 
      ])
    ]),
    trigger('sideBarIconanimation', [
      state('true', style({
        'font-size': '100%'
      })),
      state('false', style({
        'font-size': '170%'
      })),
      transition('true => false', animate(400)),
      transition('false => true', animate(400))
    ]),
    trigger('sideBarWidth', [
      state('true', style({
        width: '230px'
      })),
      state('false', style({
        width: '60px'
      })),
      transition('true => false', animate(400)),
      transition('false => true', animate(400))
    ]),
    trigger('paddingWidth', [
      state('true', style({
        'margin-left': '230px'
      })),
      state('false', style({
        'margin-left': '60px'
      })),
      transition('true => false', animate(400)),
      transition('false => true', animate(400))
    ])
  ]
})
export class HomeComponent implements OnInit {

  treatsActive: boolean;
  askTreatActive: boolean;
  treatrequestsActive: boolean;
  treatHistoryActive: boolean;
  trashActive: boolean;
  showProfileMenu: boolean;
  sideBarCollopse: boolean;
  profileActive: boolean;
  logo: string;

  constructor(private router: Router) { 
    this.router.events.pipe(
      //filter((event:Event) => event instanceof NavigationEnd)
    ).subscribe(event => 
    {
      this.onSidebarItemClick(event['urlAfterRedirects'].slice(6, event['urlAfterRedirects'].length));
    });
  }

  ngOnInit() {
    this.showProfileMenu = false;
    if(window.innerWidth < 768) {
      this.sideBarCollopse = false;
      this.logo = "WN";
    } else {
      this.sideBarCollopse = true;
      this.logo = "Who's Next";
    }
  }

  onSidebarItemClick(sideBarItem: string){
    this.treatsActive = false;
    this.askTreatActive = false;
    this.treatrequestsActive = false;
    this.treatHistoryActive = false;
    this.trashActive = false;
    this.profileActive = false;

    if (sideBarItem === 'treats'){
      this.treatsActive = true;
    }
    else if (sideBarItem === 'asktreat') {
      this.askTreatActive = true;
    }
    else if (sideBarItem === 'treatrequests') {
      this.treatrequestsActive = true;
    }
    else if (sideBarItem === 'treathistory') {
      this.treatHistoryActive = true;
    }
    else if (sideBarItem === 'trash') {
      this.trashActive = true;
    }
    else if (sideBarItem === 'profile') {
      this.profileActive = true;
    }
  }

  logOutUser() {
    localStorage.removeItem("AuthorizationToken");
    this.router.navigate(['']);
  }

  menuBarClicked() {
    this.sideBarCollopse = !this.sideBarCollopse;

    if(this.sideBarCollopse) {
      this.logo = "Who's Next";
    } else {
      this.logo = "WN";
    }
  }
  onResize(event) {
    if(event.target.innerWidth < 768) {
      this.sideBarCollopse = false;
      this.logo = "WN";  
    } else {
      this.sideBarCollopse = true;
      this.logo = "Who's Next";
    }
  }
}
