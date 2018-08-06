﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Poll, PollAnswer } from "../../models";
import { PollService } from "../../core";

@Component({
    selector: "poll-edit",
    templateUrl: "./poll-edit.component.html",
    styleUrls: ["./poll-edit.component.scss"]
})
export class PollEditComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    public editPollForm: FormGroup;
    public item: Poll = new Poll();

    constructor(private service: PollService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {
    }

    public ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            if (+params["id"] !== 0) {  
                this.sub2 = this.service.getSingle(+params["id"])
                    .subscribe(data => {
                        this.item = data;
                        this.editPollForm.patchValue(data);
                    },
                        e => console.log(e));
            }
        });
        this.initForm();
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
    }

    public onSubmit(): void {
        this.item.question = this.editPollForm.get("question").value;
        this.item.answers = this.item.answers.filter(x => x.text);

        if (this.item.id === 0) {
            this.sub = this.service.create(this.item).subscribe(data => {
                    this.editPollForm.patchValue({ message: "" });
                    this.snackBar.open("Создан");
                },
                e => console.log(e));
        } else {
            this.sub = this.service.update(this.item.id, this.item).subscribe(data => {
                    this.editPollForm.patchValue({ message: "" });
                    this.snackBar.open("Обновлен");
                },
                e => console.log(e));
        }
    }

    public addAnswer(): void {
        const poll = new PollAnswer();
        poll.pollId = this.item.id;
        this.item.answers.push(poll);
    }

    private initForm(): void {
        this.editPollForm = this.formBuilder.group({
            question: ["", Validators.compose([
                Validators.required,
                Validators.maxLength(100)
            ])],
            startTime: [""],
        });
    }
}