import { Component, OnInit } from '@angular/core';
import { TreatViewModel } from '../../../ViewModels/treatViewModel';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { AccountsService } from '../../../services/accounts.service';
import { TreatsService } from '../../../services/treats.service';
import { ResponseViewModelWithEntity, ResponseViewModel } from '../../../ViewModels/response';
import { Router } from "@angular/router";

const reasons = ['BirthDay','Anniversary'];

@Component({
  selector: 'app-asktreat',
  templateUrl: './asktreat.component.html',
  styleUrls: ['./asktreat.component.css']
})
export class AsktreatComponent implements OnInit {
  
  selectedFriend: any;
  deadlineDate: any;
  treat: TreatViewModel;
  submitted: boolean;
  showFutureDateError: boolean;
  invalidDeadlineDate: boolean;
  showAskLoader: boolean;

  constructor(private accountsService: AccountsService,
              private router: Router, 
              private treatsService: TreatsService) { }

  ngOnInit() {
    this.treat = new TreatViewModel();
    this.treat.Reason = "";
    this.submitted = false;
    this.showFutureDateError = false;
    this.invalidDeadlineDate = true;
    this.showAskLoader = false;

    this.accountsService.searchFriendsBySearchText("").subscribe((responce: ResponseViewModelWithEntity) => {
      if(responce.success){
        this.serachedFriends = responce.entity.slice(0, 7);
      }
      else{
      }
    });
  }
  
  search = (text$: Observable<string>) =>
    text$.pipe(
      map(term => term.length < 1 ? reasons
        : reasons.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  serachedFriends: any = [];
  friendSearch(event) {
    this.accountsService.searchFriendsBySearchText(event.target.value).subscribe((responce: ResponseViewModelWithEntity) => {
      if(responce.success){
        this.serachedFriends = responce.entity.slice(0, 7);
      }
      else{
      }
    });
  }

  selectFriend(friend){
    this.selectedFriend = friend;
  }

  deallineOnChange()
  {
    if(this.deadlineDate.year == null || this.deadlineDate.month == null || this.deadlineDate.day == null)
    {
      this.invalidDeadlineDate = true;
      return;
    }
    this.invalidDeadlineDate = false;

    this.treat.Deadline = new Date(this.deadlineDate.year, this.deadlineDate.month-1, this.deadlineDate.day, 23 , 59 , 59);
    if(this.treat.Deadline < new Date(Date.now())) {
      this.showFutureDateError = true;
    }
    else {
      this.showFutureDateError = false;
    }
  }

  askTreat() {
    this.submitted = true;
    
    if(this.selectedFriend == null || this.treat.Reason.length == null || this.invalidDeadlineDate || this.showFutureDateError) {
      return;
    }
    
    this.showFutureDateError = false;
    this.treat.AskedTo = this.selectedFriend.id;

    this.showAskLoader = true;
    this.treatsService.addtreat(this.treat).subscribe((responce: ResponseViewModel) => {
      if(responce.success){
        this.router.navigate(['/home/treats']); 
      }
      else{
      }
      this.showAskLoader = false;
      this.submitted = false;
    });
  }
}
