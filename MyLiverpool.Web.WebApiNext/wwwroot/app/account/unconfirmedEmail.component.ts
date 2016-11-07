﻿import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { AccountService } from "./account.service";
import { GlobalValidators } from "../shared/index";

@Component({
    selector: "unconfirmedEmail",
    templateUrl: "app/account/unconfirmedEmail.component.html"
})

export class UnconfirmedEmailComponent implements OnInit {
    unconfirmedForm: FormGroup; 
    finish: boolean;

    constructor(private service: AccountService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.unconfirmedForm = this.formBuilder.group({
            'email': ["", Validators.compose([
                Validators.required, GlobalValidators.mailFormat])]
        });
    }

    onSubmit(): void {
        console.log(1211);
        let email = this.unconfirmedForm.controls["email"].value;
        this.service.resendConfirmEmail(email).subscribe(data => {
                if (data) {
                    this.finish = true;
                }
            },
            error => console.log(error),
            () => { }
        );
    }
}