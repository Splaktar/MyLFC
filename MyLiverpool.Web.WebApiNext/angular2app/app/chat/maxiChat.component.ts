﻿import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { interval } from "rxjs/observable/interval";
import { map } from "rxjs/operators";
import { Configuration } from "../app.constants";
import { ChatMessage } from "./chatMessage.model";
import { ChatMessageType } from "./chatMessageType.enum";
import { ChatMessageService } from "./chatMessage.service";
import { RolesCheckedService, DeleteDialogComponent, StorageService } from "@app/shared";

@Component({
    selector: "maxi-chat",
    templateUrl: "./maxiChat.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaxiChatComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private updater$: Subscription;
    public messageForm: FormGroup;
    public chatMaxiTimerForm: FormGroup;
    public items: ChatMessage[] = new Array<ChatMessage>();
    public selectedEditIndex: number = null;
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
        private snackBar: MatSnackBar,
        private configuration: Configuration,
        private sanitizer: DomSanitizer,
        public roles: RolesCheckedService,
        private storage: StorageService,
        private dialog: MatDialog) {
    }

    public ngOnInit(): void {
        this.initForm();
        this.update();
    }

    public ngOnDestroy() {
        if(this.updater$) { this.updater$.unsubscribe(); }
    }

    public update(): void {
        const id: number = this.items.length > 0 ? this.items[0].id : 0;
        this.service
            .getAll(id, ChatMessageType.All)
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
        if (this.selectedEditIndex != null) {
            const message: ChatMessage = this.items[this.selectedEditIndex];
            message.message = this.messageForm.get("message").value;
            this.service.update(message.id, message).subscribe(data => {
                    this.cancelEdit();
                },
                e => console.log(e));
        } else {
            const message: ChatMessage = this.messageForm.value;
            message.type = ChatMessageType.All;
            this.service.create(message)
                .subscribe(data => {
                        this.items.unshift(data);
                        this.messageForm.get("message").patchValue("");
                    },
                    (e) => console.log(e));
        }
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
        this.storage.setChatUpdateTime(event.value, ChatMessageType.All);
    }

    private scheduleUpdate(selectedValue: number) {
        if (selectedValue === 0) {
            if (this.updater$) {
                this.updater$.unsubscribe();
            }
        } else {
            this.updater$ = interval(1000 * selectedValue).pipe(
                map(x => this.update()))
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
        const message: string = this.messageForm.get("message").value;
        const userName: string = this.items[index].authorUserName;
        const newMessage: string = `<i>${userName}</i>, ${message}`;
        this.messageForm.get("message").patchValue(newMessage);//todo add focus
    }

    public sanitizeByHtml(text: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(text);
    }

    public edit(index: number): void {
        this.selectedEditIndex = index;
        this.messageForm.get("message").patchValue(this.items[index].message);
    }

    public cancelEdit(): void {
        this.selectedEditIndex = null;
        this.messageForm.get("message").patchValue("");
    }

    private initForm(message: string = ""): void {
        this.messageForm = this.formBuilder.group({
            message: [message || "", Validators.compose([Validators.required, Validators.maxLength(this.configuration.maxChatMessageLength)])], //todo add visual warning
            type: [ChatMessageType.All, Validators.required]
        });
        this.messageForm.valueChanges.subscribe(() => {
            this.cd.markForCheck();
        });

        const timerValue: number = this.storage.getChatUpdateTime(ChatMessageType.All);
        if (timerValue) {
            this.scheduleUpdate(timerValue);
        }
        this.chatMaxiTimerForm = this.formBuilder.group({
            timerValue: [timerValue]
        });
    }
}