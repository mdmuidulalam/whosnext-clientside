import { Injectable } from "@angular/core";
import { TreatViewModel } from "../ViewModels/treatViewModel";
import { PagingViewModel } from "../ViewModels/pageViewModel";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  ResponseViewModelWithAdditionInformation,
  ResponseViewModel
} from "../ViewModels/response";
import { Observable } from "rxjs";
import { Helper } from "../helper/helper";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TreatsService {
  constructor(private http: HttpClient) {}

  addtreat(treat: TreatViewModel) {
    const body = JSON.stringify(treat);
    return this.http.post<ResponseViewModel>(
      "/api/treats/addtreat",
      body,
      httpOptions
    );
  }

  getTreatRequests(
    pagingViewModel: PagingViewModel
  ): Observable<ResponseViewModelWithAdditionInformation> {
    return this.http.get<ResponseViewModelWithAdditionInformation>(
      "/api/treats/gettreatrequests" +
        Helper.queryStringBuilder(pagingViewModel)
    );
  }

  confirmTreat(treatId: number): Observable<ResponseViewModel> {
    const body = JSON.stringify({ treatId: treatId });
    console.log(body);
    return this.http.post<ResponseViewModel>(
      "/api/treats/confirmtreat",
      body,
      httpOptions
    );
  }

  moveToTrash(treatId: number): Observable<ResponseViewModel> {
    const body = JSON.stringify({ treatId: treatId });
    return this.http.post<ResponseViewModel>(
      "/api/treats/movetotrash",
      body,
      httpOptions
    );
  }

  getTrash(
    pagingViewModel: PagingViewModel
  ): Observable<ResponseViewModelWithAdditionInformation> {
    return this.http.get<ResponseViewModelWithAdditionInformation>(
      "/api/treats/gettrash" + Helper.queryStringBuilder(pagingViewModel)
    );
  }

  getTreats(
    pagingViewModel: PagingViewModel
  ): Observable<ResponseViewModelWithAdditionInformation> {
    return this.http.get<ResponseViewModelWithAdditionInformation>(
      "/api/treats/gettreats" + Helper.queryStringBuilder(pagingViewModel)
    );
  }

  completeTreat(treatId: number): Observable<ResponseViewModel> {
    const body = JSON.stringify({ treatId: treatId });
    return this.http.post<ResponseViewModel>(
      "/api/treats/completetreat",
      body,
      httpOptions
    );
  }

  getTreatHistory(
    pagingViewModel: PagingViewModel
  ): Observable<ResponseViewModelWithAdditionInformation> {
    return this.http.get<ResponseViewModelWithAdditionInformation>(
      "/api/treats/gettreathistory" + Helper.queryStringBuilder(pagingViewModel)
    );
  }
}
