import { Component, OnInit } from '@angular/core';
import { TreatsService } from '../../../services/treats.service';
import { ResponseViewModelWithAdditionInformation } from '../../../ViewModels/response';
import { trigger, style, animate, transition } from '@angular/animations';
import { PagingViewModel } from '../../../ViewModels/pageViewModel';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css'],
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
export class TrashComponent implements OnInit {
  treats: any[] = []; 
  userId: number;
  totalPage: number;
  numbers: number[] = [];
  pagingViewModel : PagingViewModel;
  showPagingPrevious: boolean;
  showPagingNext: boolean;

  constructor(private treatsService: TreatsService) { }

  ngOnInit() {
    this.pagingViewModel = new PagingViewModel();
    this.pagingViewModel.NumberOfContentPerPage = 10;
    this.pagingViewModel.SortProperty = 'CompleteDate';
    this.pagingViewModel.OrderByDescending = true;
    this.showPagingPrevious = false;
    this.showPagingNext = false;

    this.getTrash(1);
  }

  getTrash(pageNumber: number) {
    this.pagingViewModel.PageNumber = pageNumber;

    this.treatsService.getTrash(this.pagingViewModel).subscribe((responce: ResponseViewModelWithAdditionInformation) => {
      if(responce.success){
        this.treats = responce.entity.contents;
        this.userId = responce.additionalInformation;
        this.totalPage = Math.ceil(responce.entity.totalCount / this.pagingViewModel.NumberOfContentPerPage);
        this.pageHandler();
      }
      else{

      }
    });
  }

  pageHandler(){
    if(this.pagingViewModel.PageNumber > this.totalPage){
      this.getTrash(1);
      return;
    }

    var startNumber = this.pagingViewModel.PageNumber % 10 != 0  ? (Math.floor(this.pagingViewModel.PageNumber/10))*10 + 1 : this.pagingViewModel.PageNumber-9;
    
    this.showPagingNext = this.totalPage > 10 + (Math.floor(this.pagingViewModel.PageNumber/10))*10;
    this.showPagingPrevious = startNumber != 1; 
    this.numbers = [];
    for( var i = startNumber; i < startNumber + 10 && i <= this.totalPage && this.totalPage != 1; i++ ){
      this.numbers.push(i);
    }
  }

  onPageNextClick(){
    this.getTrash(this.numbers[9] + 1);
  }

  onPagePreviousClick(){
    this.getTrash(this.numbers[0] - 1);
  }

  onPageNumberClick(pageNumber: number) {
    this.getTrash(pageNumber);
  }

  onSearchKeydown(event) {
    if (event.key === "Enter") {
      this.getTrash(1);
    }
  }
}
