﻿import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { InjuryService } from "../injury.service";
import { Injury } from "../injury.model";
import { PersonService, Person } from "@app/person";
import { Configuration } from "@app/app.constants";

@Component({
    selector: "injury-edit",
    templateUrl: "./injury-edit.component.html"
})

export class InjuryEditComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private sub2: Subscription;
    private id: number;
    public editInjuryForm: FormGroup;
    public imagePath: string;
    public persons$: Observable<Person[]>;

    constructor(private injuryService: InjuryService,
        private personService: PersonService,
        private route: ActivatedRoute,
        private router: Router,
        private config: Configuration,
        private formBuilder: FormBuilder) {
    }
    
    public ngOnInit(): void {
        this.initForm();
        this.sub = this.route.params.subscribe(params => {
            this.id = +params["id"];
            if (this.id > 0) {
                this.sub2 = this.injuryService.getSingle(this.id)
                    .subscribe(data => this.parse(data),
                        e => console.log(e));
            }
        });
    }

    public ngOnDestroy(): void {
        if (this.sub) { this.sub.unsubscribe(); }
        if (this.sub2) { this.sub2.unsubscribe(); }
    }

    public onSubmit(): void {
        const injury: Injury = this.parseForm();
        if (this.id > 0) {
            this.injuryService.update(this.id, injury)
                .subscribe(data => this.router.navigate(["/injuries"]),
                    e => console.log(e));
        } else {
            this.injuryService.create(injury)
                .subscribe(data => this.router.navigate(["/injuries"]),
                    e => console.log(e));
        }
    }

    public selectPerson(id: number) {
        this.editInjuryForm.get("personId").patchValue(id);
    }


    private getRandomNumber(): number {
        return Math.random();
    }

    private parse(data: Injury): void {
        this.id = data.id;
        data.startTime = new Date(data.startTime);
        if (data.endTime) {
            data.endTime = new Date(data.endTime);
        }
        this.editInjuryForm.patchValue(data);
    }

    private parseForm(): Injury {
        const item: Injury = this.editInjuryForm.value;
        item.startTime = this.normalizeDate(item.startTime);
        item.endTime = this.normalizeDate(item.endTime);
        item.id = this.id;
        return item;
    }

    private initForm(): void {
        this.editInjuryForm = this.formBuilder.group({
            personId: ["", Validators.required],
            personName: ["", Validators.required],
            startTime: [null, Validators.required],
            endTime: [null],
            description: ["", Validators.required],
            id: [0, Validators.required]
        });

        this.persons$ = this.editInjuryForm.controls["personName"].valueChanges.pipe(
            debounceTime(this.config.debounceTime),
            distinctUntilChanged(),
            switchMap((value: string) => this.personService.getListByName(value)));
    }

    private normalizeDate(date: Date): Date {
        if (date) {
            date = new Date(date);
            date = new Date(date.setHours(date.getHours() +
                (-1) * date.getTimezoneOffset() / 60));
        }
        return date;
    }
}