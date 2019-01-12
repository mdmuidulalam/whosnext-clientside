import { Component, OnInit } from '@angular/core';
import { TreatsService } from '../../../services/treats.service';
import { ResponseViewModelWithAdditionInformation, ResponseViewModel } from '../../../ViewModels/response';
import { TreatStage } from '../../../ViewModels/enums';
import { trigger, style, animate, transition } from '@angular/animations';
import { Helper } from '../../../helper/helper';
import { PagingViewModel } from '../../../ViewModels/pageViewModel';

@Component({
  selector: 'app-treats',
  templateUrl: './treats.component.html',
  styleUrls: ['./treats.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   
        style({opacity:0, transform: 'translateY(50px)'}),
        animate('400ms ease-in-out', style({opacity:1, transform: 'translateY(0px)'})),
      ]),
      transition(':leave', [   
        animate('400ms', style({opacity:0, height: '0px'})) 
      ])
    ])
  ]
})
export class TreatsComponent implements OnInit {
  userId: number;
  treats: any[] = [];
  allpages: any;
  treatStage = TreatStage;
  pageNumber: number = 0;
  showShowMore: boolean;

  constructor(private treatsService: TreatsService) { }

  ngOnInit() {
    this.pageNumber = 0;
    this.showShowMore = false;
    this.getTreats();
  }

  onClickShowMore()
  {
    var startIndex : number = this.pageNumber * this.allpages.numberOfContentPerPage;
    this.showShowMore = true;
    for(var i: number = startIndex ; i < this.allpages.contents.length && i < startIndex + this.allpages.numberOfContentPerPage ; i++) {
      this.treats.push(this.allpages.contents[i]);
      this.treats[i].deadline = Helper.convertDateInCurrentTimeZone(this.treats[i].deadline);
      this.treats[i]["showNotification"] = true;
      if(this.treats[i].askedTo == this.userId) {
         this.treats[i]["showConpleteSpinner"] = false;
      }
      if(i+1 == this.allpages.totalCount)
      {
        this.showShowMore = false;
      }            
    }
    this.pageNumber++;
  }

  getTreats() {
    var pagingViewModel : PagingViewModel = new PagingViewModel();
    pagingViewModel.PageNumber = 0;
    pagingViewModel.NumberOfContentPerPage = 7;
    pagingViewModel.SortProperty = 'Deadline';
    pagingViewModel.OrderByDescending = true;
    
    this.treatsService.getTreats(pagingViewModel).subscribe((responce: ResponseViewModelWithAdditionInformation) => {
      if(responce.success){
        this.userId = responce.additionalInformation;
        this.allpages = responce.entity;
        this.onClickShowMore();
      }
      else{

      }
    });
  }

  onCompleteTrashClick(treatId: number)
  {
    this.treatsService.completeTreat(treatId).subscribe((responce: ResponseViewModel) => {
      if(responce.success) {
        for(var i: number = 0 ; i < this.treats.length ; i++) {
          if(this.treats[i].id == treatId){
            this.treats[i].confirmation = this.treatStage.Completed;
            this.treats[i].showConpleteSpinner = false;
          }
        }
      }
      else {

      }
    });
  }

  onTreatMovetoTrashClick(treatId: number)
  {
    this.treatsService.moveToTrash(treatId).subscribe((responce: ResponseViewModel) => {
      if(responce.success){
        for(var i: number = 0 ; i < this.treats.length ; i++) {
          if(this.treats[i].id == treatId) {
            this.treats[i].confirmation = this.treatStage.Trashed;
            this.treats[i].showConpleteSpinner = false;
          }
        }
      }
      else{

      }
    });
  }
}
