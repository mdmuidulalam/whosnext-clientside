import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import {
  ResponseViewModel,
  ResponseViewModelWithEntity
} from "../../ViewModels/response";
import { LogInViewModel } from "../../ViewModels/logInViewModel";
import { SignUpViewModel } from "../../ViewModels/signUpViewModel";
import { AccountsService } from "../../services/accounts.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Helper } from "../../helper/helper";
import { GernderType } from "../../ViewModels/enums";

@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.css"]
})
export class LandingpageComponent implements OnInit {
  signUpForm: FormGroup;
  showAlter: boolean;
  showSignSuccessAlter: boolean;
  showLogInLoader: boolean;
  showSignUpLoader: boolean;
  dates = [];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  years = [];
  submitted: boolean;
  signUpDuplicateEmail: boolean;
  invalidBirthDate: boolean;
  gernderType = GernderType;
  logInViewModel: LogInViewModel;

  get getSignUpFormControls() {
    return this.signUpForm.controls;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.logInViewModel = new LogInViewModel();
    this.route.queryParams.subscribe(params => {
      this.logInViewModel.Email = params["email"];
      this.logInViewModel.Password = params["password"];
    });
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      signupfullname: [
        "",
        [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]*")]
      ],
      signupemail: ["", [Validators.required, Validators.email]],
      signuppassword: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.showAlter = false;
    this.showSignSuccessAlter = false;
    this.showLogInLoader = false;
    this.showSignUpLoader = false;
    this.submitted = false;
    this.signUpDuplicateEmail = false;
    this.invalidBirthDate = false;
    for (var i = 1; i <= 31; i++) {
      this.dates.push(i);
    }

    var curretntYear = new Date().getFullYear();
    for (var i = curretntYear; i >= 1919; i--) {
      this.years.push(i);
    }
  }

  scroll(el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onBirthDateChange(birthDate: number, birthMonth: number, birthYear: number) {
    this.invalidBirthDate = !Helper.isValidDate(
      birthDate,
      birthMonth,
      birthYear
    );
  }

  @ViewChild("closelogInModal") closeAddExpenseModal: ElementRef;
  logInUser(event) {
    event.preventDefault();
    this.showLogInLoader = true;

    this.auth
      .logIn(this.logInViewModel)
      .subscribe((responce: ResponseViewModelWithEntity) => {
        if (responce.success) {
          localStorage.setItem("AuthorizationToken", responce.entity.token);
          this.closeAddExpenseModal.nativeElement.click();
          this.router.navigate(["/home/treats"]);
        } else {
          this.showAlter = true;
        }
        this.showLogInLoader = false;
      });
  }

  signUpUser(event) {
    event.preventDefault();

    this.signUpDuplicateEmail = false;
    this.submitted = true;
    if (this.signUpForm.invalid || this.invalidBirthDate) {
      return;
    }

    this.showSignUpLoader = true;
    var signUpViewModel: SignUpViewModel = new SignUpViewModel();
    signUpViewModel.Name = event.target.querySelector("#fullname").value;
    signUpViewModel.Email = event.target.querySelector("#signupemailId").value;
    signUpViewModel.Password = event.target.querySelector(
      "#signuppasswordId"
    ).value;
    signUpViewModel.BirthDate = event.target.querySelector("#birthdate").value;
    signUpViewModel.BirthMonth = event.target.querySelector(
      "#birthmonth"
    ).value;
    signUpViewModel.BirthYear = event.target.querySelector("#birthyear").value;
    signUpViewModel.Gender = event.target.querySelector("#gender").value;

    this.accountsService
      .signUp(signUpViewModel)
      .subscribe((responce: ResponseViewModel) => {
        if (responce.success) {
          this.showSignSuccessAlter = true;
        } else {
          if (responce.errorDescriptions[0] === "DuplicateEmail") {
            this.signUpDuplicateEmail = true;
          }
        }
        this.showSignUpLoader = false;
        this.submitted = false;
      });
  }
}
