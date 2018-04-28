﻿import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Subscription } from "rxjs";
import { Pm } from "../pm.model";
import { PmService } from "../pm.service";

@Component({
    selector: "pm-reply",
    templateUrl: "./pm-reply.component.html"
})
export class PmReplyComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    public pmReplyEditForm: FormGroup;
    public id: number = 0;
    @Input() public userName: string;
    @Input() public userId: number;
    @Input() public title: string;
    @Output() public close = new EventEmitter();

    constructor(private service: PmService,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.pmReplyEditForm = this.formBuilder.group({
            title: [
                this.getTitle(), Validators.compose([
                    Validators.required,
                    Validators.maxLength(50)
                ])
            ],
            message: [
                "", Validators.compose([
                    Validators.required,
                    Validators.maxLength(2500)
                ])
            ]
        });
    }

    public ngOnDestroy(): void {
    }

    public onSubmit(): void {
        const model: Pm = this.pmReplyEditForm.value;
        model.receiverId = this.userId;

        this.sub = this.service.create(model).subscribe(data => {
                if (data) {
                    this.closeWindow();
                    this.snackBar.open("Сообщение отправлено.", null, { duration: 5000 });
                }
            },
            e => console.log(e));
    }

    public closeWindow(): void {
        this.close.emit({});
    }

    private getTitle(): string {
        if (!this.title) {
            return "";
        }
        const match = this.title.match(/\[.*]/);
        if (match) {
            let newValue = parseInt(match[0].substring(1, match[0].length - 1));
            return this.title.replace(/\[.*]/, `[${++newValue}]`);
        } else {
            return `Re[1]: ${this.title}`;
        }
    }
}