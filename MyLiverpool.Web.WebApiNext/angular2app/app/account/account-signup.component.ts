﻿import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { Signup } from "./signup.model";
import { AccountService } from "./account.service";
import { GlobalValidators } from "../shared/index";

@Component({
    selector: "account-signup",
    template: require("./account-signup.component.html")
})

export class AccountSignupComponent implements OnInit {
    registerForm: FormGroup;
    id: number;
    result: boolean = false;

    constructor(private accountService: AccountService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'userName': ["", Validators.compose([
                Validators.required, Validators.minLength(3)])],
            'email': ["", Validators.compose([
                Validators.required, Validators.minLength(6), GlobalValidators.mailFormat])],
            'password': ["", Validators.compose([
                Validators.required, Validators.minLength(6)])],
            'confirmPassword': ["", Validators.compose([
                Validators.required, Validators.minLength(6)])],
            // 'fullName': ["123", Validators.compose([
            //    Validators.required,])],
           // 'birthday': ["10/10/2015", Validators.compose([
           //     Validators.required,])]
        });
    }

    onSubmit(): void {
        let signup = new Signup();
        signup.userName = this.registerForm.controls["userName"].value;
        signup.email = this.registerForm.controls["email"].value;
        signup.password = this.registerForm.controls["password"].value;
        signup.confirmPassword = this.registerForm.controls["confirmPassword"].value;
     //   signup.fullName = this.registerForm.controls["fullName"].value;
     //   signup.birthday = this.registerForm.controls["birthday"].value;

        this.accountService
            .create(signup)
            .subscribe(data => {
                    if (data) {
                        this.result = true;
                    }
                },
            error => console.log(error),
            () => {});
    }
}