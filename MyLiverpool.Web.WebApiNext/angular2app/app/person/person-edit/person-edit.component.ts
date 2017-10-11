﻿import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { PersonService } from "../person.service";
import { Person } from "../person.model";
import { PersonType } from "../personType.model";

@Component({
    selector: "person-edit",
    templateUrl: "./person-edit.component.html"
})

export class PersonEditComponent implements OnInit {
    private id: number;
    public editPersonForm: FormGroup;
    public photo: string;
    public types: PersonType[];
    @Input() public isFull: boolean = true;
    @Output() public done = new EventEmitter();

    constructor(private service: PersonService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private formBuilder: FormBuilder) {
    }

    public ngOnInit(): void {
        this.initForm();
        if (this.isFull) {
            this.id = +this.route.snapshot.params["id"] || 0;
            if (this.id > 0) {
                this.service.getSingle(this.id)
                    .subscribe(data => this.parse(data),
                        e => console.log(e));
            }
        }

        this.updateTypes();
    }

    public onUpload(event: any): void {
        const file = event.currentTarget.files[0];
        const fullname = this.editPersonForm.controls["firstName"].value + " " + this.editPersonForm.controls["lastName"].value;
        if (file) {
            this.service.updatePhoto(fullname, file)
                .subscribe((result: any) => {
                    this.editPersonForm.controls["photo"].patchValue(result.path);
                    this.photo = `${result.path}?${Math.random()}`;
                    this.snackBar.open("Фото успешно загружено", null, { duration: 5000 });
                },
                e => {
                    console.log(e);
                    this.snackBar.open("Ошибка при загрузке фото", null, { duration: 5000 });
                });
        }
    }
    public onSubmit(): void {
        const person: Person = this.parseForm();
        if (person.birthday) {
            person.birthday = new Date(person.birthday);
            person.birthday = new Date(person.birthday.setHours(person.birthday.getHours() +
                (-1) * person.birthday.getTimezoneOffset() / 60));
        }
        if (this.id > 0) {
            this.service.update(this.id, person)
                .subscribe(data => {
                    this.snackBar.open("Профиль успешно обновлен", null, { duration: 5000 });
                    this.router.navigate(["/persons"]);
                },
                e => {
                    console.log(e);
                    this.snackBar.open("Ошибка при обновлении профиля", null, { duration: 5000 });
                });
        } else {
            this.service.create(person)
                .subscribe(data => {
                    this.snackBar.open("Профиль успешно создан", null, { duration: 5000 });
                    if (this.isFull) {
                        this.router.navigate(["/persons"]);
                    } else {
                        this.done.emit();
                    }
                    },
                e => {
                    console.log(e);
                    this.snackBar.open("Ошибка при создании профиля", null, { duration: 5000 });
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
        data.birthday = new Date(data.birthday);
        this.editPersonForm.patchValue(data);
        this.photo = `${data.photo}?${Math.random()}`;
    }

    private parseForm(): Person {
        const item: Person = this.editPersonForm.value;
        item.id = this.id;
        return item;
    }

    private initForm(): void {
        this.editPersonForm = this.formBuilder.group({
            firstName: ["", Validators.maxLength(30)],
            firstRussianName: [
                "", Validators.compose([
                    Validators.required, Validators.maxLength(30)
                ])
            ],
            lastName: ["", Validators.maxLength(30)],
            lastRussianName: [
                "", Validators.compose([
                    Validators.required, Validators.maxLength(30)
                ])
            ],
            position: [null],
            country: [null],
            birthday: [null],
            number: [null],
            photo: [null],
            type: ["", Validators.required]
        });
    }
}