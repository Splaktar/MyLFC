﻿import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MdSnackBar } from "@angular/material";
import { Subscription } from "rxjs/Subscription";
import { PersonService } from "./person.service";
import { Person } from "./person.model";
import { PersonType } from "./personType.model";

@Component({
    selector: "person-edit",
    templateUrl: "./person-edit.component.html"
})

export class PersonEditComponent implements OnInit {
    private id: number;
    private sub: Subscription;
    public editForm: FormGroup;
    public item: Person;
    public types: PersonType[];
    public opened: boolean = false;

    constructor(private service: PersonService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MdSnackBar,
        private formBuilder: FormBuilder) {
        this.item = new Person();
    }

    public ngOnInit(): void {
        this.initForm();
        this.id = +this.route.snapshot.params["id"] || 0;
        if (this.id > 0) {
            this.sub = this.service.getSingle(this.id)
                .subscribe(data => this.parse(data),
                    error => console.log(error));
        }

        this.updateTypes();
    }

    public onUpload(event: any): void {
        let file = event.currentTarget.files[0];
        let fullname = this.editForm.controls["firstName"].value + " " + this.editForm.controls["lastName"].value;
        if (file) {
            this.service.updatePhoto(fullname, file)
                .subscribe(result => {
                    this.editForm.controls["photo"].patchValue(result);
                    this.item.photo = `${result}#${Math.random()}`;
                        this.snackBar.open("Фото успешно загружено", null, {duration: 5000});
                    },
                error => {
                    console.log(error);
                    this.snackBar.open("Ошибка при загрузке фото", null, { duration: 5000 });
                });
        }
    }
    public onSubmit(): void {
        let person = this.parseForm();
        if (this.id > 0) {
            this.service.update(this.id, person)
                .subscribe(data => this.snackBar.open("Профиль успешно создан", null, { duration: 5000 }),
                error => {
                    console.log(error);
                    this.snackBar.open("Ошибка при создании профиля", null, { duration: 5000 });
                });
        } else {
            this.service.create(person)
                .subscribe(data => this.snackBar.open("Профиль успешно обновлен", null, { duration: 5000 }),
                error => {
                    console.log(error);
                    this.snackBar.open("Ошибка при обновлении профиля", null, { duration: 5000 });
                });
        }
    }

    public getRandomNumber(): number {
        return Math.random();
    }

    private updateTypes(): void {
        this.service
            .getTypes()
            .subscribe(data => this.types = data);
    }

    private parse(data: Person): void {
        this.id = data.id;
        this.editForm.patchValue(data);
        this.item = data;
    }

    private parseForm(): Person {
        let item: Person = this.editForm.value;
        item.id = this.id;
        return item;
    }

    private initForm(): void {
        this.editForm = this.formBuilder.group({
            'firstName': ["", Validators.compose([
                Validators.required, Validators.maxLength(30)])],
            'firstRussianName': ["", Validators.compose([
                Validators.required, Validators.maxLength(30)])],
            'lastName': ["", Validators.compose([
                Validators.required, Validators.maxLength(30)])],
            'lastRussianName': ["", Validators.compose([
                Validators.required, Validators.maxLength(30)])],
            'birthday': ["", Validators.required],
            'photo': [""],
            'type': ["", Validators.required]
        });
    }
}