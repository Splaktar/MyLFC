﻿import { Component, OnInit} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Configuration } from "../app.constants";
import { ChatMessage } from "./chatMessage.model";
import { ChatMessageService } from "./chatMessage.service";
import { RolesCheckedService, IRoles } from "../shared/index";

@Component({
    selector: "mini-chat",
    templateUrl: "./miniChat.component.html"
})
export class MiniChatComponent implements OnInit {
    messageForm: FormGroup;
    items: ChatMessage[];
    page: number = 1;
    itemsPerPage: number = 15;
    totalItems: number;
    roles: IRoles;

    constructor(private service: ChatMessageService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private configuration: Configuration,
        private rolesChecked: RolesCheckedService) {
    }

    ngOnInit() {
        this.roles = this.rolesChecked.checkRoles();
        this.initForm();
        this.update();
    }

    update(): void {
        this.service
            .getAll()
            .subscribe(data => this.items = data,
                error => console.log(error));
    }

    onSubmit(): void {
        this.service.create(this.messageForm.value)
            .subscribe(data => {
                this.items.unshift(data);
                this.messageForm.reset();
                },
            (error) => console.log(error));
    }

    private initForm(): void {
        this.messageForm = this.formBuilder.group({
            'message': ["", Validators.compose([Validators.required, Validators.maxLength(this.configuration.maxChatMessageLength)])] //todo add visual warning
        });
    }
}