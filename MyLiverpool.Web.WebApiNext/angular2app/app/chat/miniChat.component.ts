﻿import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MdDialog, MdSnackBar } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { Configuration } from "../app.constants";
import { ChatMessage } from "./chatMessage.model";
import { ChatMessageService } from "./chatMessage.service";
import { RolesCheckedService, IRoles, DeleteDialogComponent, LocalStorageService } from "../shared/index";

@Component({
    selector: "mini-chat",
    templateUrl: "./miniChat.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniChatComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private updater$: Subscription;
    public messageForm: FormGroup;
    public chatTimerForm: FormGroup;
    public items: ChatMessage[] = new Array<ChatMessage>();
    public page: number = 1;
    public roles: IRoles;
    public intervalArray: { key: string, value: number }[]
 = [{ key: "---", value: 0 },
 { key: "15 сек", value: 15 },
 { key: "30 сек", value: 30 },
 { key: "1 мин", value: 60 },
 { key: "2 мин", value: 120 }];

    constructor(private service: ChatMessageService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private snackBar: MdSnackBar,
        private configuration: Configuration,
        private sanitizer: DomSanitizer,
        private rolesChecked: RolesCheckedService,
private localStorage: LocalStorageService,
        private dialog: MdDialog) {
    }

    public ngOnInit(): void {
        this.roles = this.rolesChecked.checkRoles();
        this.initForm();
        this.update();
    }

    public ngOnDestroy() {
        if(this.updater$) { this.updater$.unsubscribe(); }
    }

    public update(): void {
        const id: number = this.items.length > 0 ? this.items[0].id : 0;
        this.service
            .getAll(id)
            .subscribe((data: ChatMessage[]) => {
                    this.items = data.concat(this.items);
                },
                error => console.log(error),
                () => {
                    this.cd.markForCheck();
                });
    }

    public onSubmit(): void {
        this.messageForm.markAsPending();
        this.service.create(this.messageForm.value)
            .subscribe(data => {
                this.items.unshift(data);
                this.messageForm.get("message").patchValue("");
                },
            (error) => console.log(error));
    }

    public showDeleteModal(index: number): void {
        let dialogRef = this.dialog.open(DeleteDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.delete(index);
                }
            },
            e => console.log(e));
    }

    public updateSchedule(event: any): void {
        this.scheduleUpdate(event.value);
        this.localStorage.setChatUpdateTime(event.value);
    }

    private scheduleUpdate(selectedValue: number) {
        if (selectedValue === 0) {
            if (this.updater$) {
                this.updater$.unsubscribe();
            }
        } else {
            this.updater$ = Observable.interval(1000 * selectedValue)
                .map(x => this.update())
                .subscribe();
        }
    }

    private delete(index: number): void {
        this.service.delete(this.items[index].id).subscribe(data => {
                if (data) {
                    this.items.slice(index, 1);
                    this.items = this.items.concat([]);
                    this.snackBar.open("Комментарий успешно удален", null, { duration: 5000 });
                }
            },
            e => {
                console.log(e);
                this.snackBar.open("Комментарий НЕ удален", null, { duration: 5000 });
            }, () => {
                this.cd.markForCheck();
            });
    }

    public addReply(index: number): void {
        let message: string = this.messageForm.get("message").value;
        let userName: string = this.items[index].authorUserName;
        let newMessage: string = `<i>${userName}</i>, ${message}`;
        this.messageForm.get("message").patchValue(newMessage);
    }

    public sanitizeByHtml(text: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    private initForm(message: string = ""): void {
        this.messageForm = this.formBuilder.group({
            'message': [message || "", Validators.compose([Validators.required, Validators.maxLength(this.configuration.maxChatMessageLength)])] //todo add visual warning
        });
        this.messageForm.valueChanges.subscribe(() => {
            this.cd.markForCheck();
        });

        let timerValue: number = this.localStorage.getChatUpdateTime();
        if (timerValue) {
            this.scheduleUpdate(timerValue);
        }
        this.chatTimerForm = this.formBuilder.group({
            'timerValue': [timerValue]
        });
    }
}