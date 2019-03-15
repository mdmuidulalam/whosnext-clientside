import { Component, OnInit } from "@angular/core";
import { TreatsService } from "../../../services/treats.service";
import {
  ResponseViewModelWithAdditionInformation,
  ResponseViewModel
} from "../../../ViewModels/response";
import { PagingViewModel } from "../../../ViewModels/pageViewModel";
import { TreatStage } from "../../../ViewModels/enums";
import { trigger, style, animate, transition } from "@angular/animations";
import { Helper } from "../../../helper/helper";

@Component({
  selector: "app-treatrequests",
  templateUrl: "./treatrequests.component.html",
  styleUrls: ["./treatrequests.component.css"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(50px)" }),
        animate(
          "400ms ease-in-out",
          style({ opacity: 1, transform: "translateY(0px)" })
        )
      ]),
      transition(":leave", [
        animate("400ms", style({ opacity: 0, height: "0px" }))
      ])
    ])
  ]
})
export class TreatrequestsComponent implements OnInit {
  userId: number;
  treatRequests: any[] = [];
  allpages: any;
  treatStage = TreatStage;
  pageNumber: number = 0;
  showShowMore: boolean;

  constructor(private treatsService: TreatsService) {}

  ngOnInit() {
    this.showShowMore = false;
    this.getTreatRequests();
  }

  onClickShowMore() {
    var startIndex: number =
      this.pageNumber * this.allpages.numberOfContentPerPage;

    this.showShowMore = true;
    for (
      var i: number = startIndex;
      i < this.allpages.contents.length &&
      i < startIndex + this.allpages.numberOfContentPerPage;
      i++
    ) {
      this.treatRequests.push(this.allpages.contents[i]);
      this.treatRequests[i].deadline = Helper.convertDateInCurrentTimeZone(
        this.treatRequests[i].deadline
      );
      this.treatRequests[i]["showNotification"] = true;
      if (this.treatRequests[i].askedTo == this.userId) {
        this.treatRequests[i]["showConfirmation"] = false;
      }
      if (i + 1 == this.allpages.totalCount) {
        this.showShowMore = false;
      }
    }
    this.pageNumber++;
  }

  getTreatRequests() {
    var pagingViewModel: PagingViewModel = new PagingViewModel();
    pagingViewModel.PageNumber = 0;
    pagingViewModel.NumberOfContentPerPage = 7;
    pagingViewModel.SortProperty = "CreateDate";
    pagingViewModel.OrderByDescending = true;

    console.log(pagingViewModel);

    this.treatsService
      .getTreatRequests(pagingViewModel)
      .subscribe((responce: ResponseViewModelWithAdditionInformation) => {
        if (responce.success) {
          this.userId = responce.additionalInformation;
          this.allpages = responce.entity;
          this.onClickShowMore();
        } else {
        }
      });
  }

  onConfirmationClick(treatId: number) {
    this.treatsService
      .confirmTreat(treatId)
      .subscribe((responce: ResponseViewModel) => {
        console.log(responce);
        if (responce.success) {
          for (var i: number = 0; i < this.treatRequests.length; i++) {
            if (this.treatRequests[i].id == treatId) {
              this.treatRequests[i].Confirmation = this.treatStage.Confirmed;
              this.treatRequests[i]["showNotification"] = true;
            }
          }
        } else {
        }
      });
  }

  onTreatMovetoTrashClick(treatId: number) {
    this.treatsService
      .moveToTrash(treatId)
      .subscribe((responce: ResponseViewModel) => {
        if (responce.success) {
          for (var i: number = 0; i < this.treatRequests.length; i++) {
            if (this.treatRequests[i].id == treatId) {
              this.treatRequests[i].Confirmation = this.treatStage.Trashed;
              this.treatRequests[i]["showNotification"] = true;
            }
          }
        } else {
        }
      });
  }
}
