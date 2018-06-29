﻿import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { MaterialService } from "../../core";
import { Material } from "../../model";
import { MaterialCategoryService, MaterialCategory, MaterialType } from "@app/materialCategory";
import { RolesCheckedService } from "@app/+auth";

@Component({
    selector: "material-edit",
    templateUrl: "./material-edit.component.html"
})

export class MaterialEditComponent implements OnInit {
    private id: number;
    public editForm: FormGroup;        
    public categories: MaterialCategory[];
    public item: Material;
    public type: MaterialType;
    public additional: string = "additional";

    constructor(private service: MaterialService,
        private materialCategoryService: MaterialCategoryService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        public roles: RolesCheckedService,
        private formBuilder: FormBuilder) {
            if (this.router.url.startsWith("/news")) {
                this.type = MaterialType.News;
            } else if (this.router.url.startsWith("/blogs")) {
                this.type = MaterialType.Blogs;
            }
    }

    public ngOnInit(): void {
        this.initForm();
        if(+this.route.snapshot.params["id"]){
            this.service.getSingle(+this.route.snapshot.params["id"])
                    .subscribe(data => this.parse(data),
                        error => console.log(error));
            } else {
            this.item = new Material();
            };
        this.materialCategoryService.getAll(this.type)
            .subscribe(data => this.parseCategories(data),
                error => console.log(error));

    }

    public onSubmit(): void {
        const newsItem: Material = this.parseForm();
        if (this.id > 0) {
            this.service.update(this.id, newsItem)
                .subscribe(data => {
                        if (!this.editForm.get("stayOnPage").value) {
                            this.router.navigate([`/${MaterialType[this.type].toLowerCase()}`, data.id]);
                    }
                        this.id = data.id;
                        this.snackBar.open("Материал успешно обновлен", null);
                    },
                e => {
                    console.log(e);
                    this.snackBar.open("Материал не был обновлен", null);
                });
        } else {
            this.service.create(newsItem, this.type)
                .subscribe(data => {
                        if (!this.editForm.get("stayOnPage").value) {
                            this.router.navigate([`/${MaterialType[this.type].toLowerCase()}`, data.id]);
                    }
                        this.id = data.id;
                        this.snackBar.open("Материал успешно создан", null);
                    },
                e => {
                    console.log(e);
                    this.snackBar.open("Материал не был создан", null);
                });
        }
    }

    public updateImage(path: string): void {
        this.editForm.patchValue({ photo: path });
    }

    public updatePreviewImage(path: string): void {
        console.log(path);
        this.editForm.patchValue({ photoPreview: path });
    }

    public copyPhoto(): void {
        const url = this.editForm.get("source").value;
        let imgTags: string = "";
        this.service.extractPhoto(url).subscribe(result => {
                if (result) {
                    for (let src of result) {
                        imgTags += `<img src="${src}" alt="" /><br/>`;
                    }
                }
            },
            e => console.log(e), () => {
                const oldValue = this.editForm.get("message").value;
                this.editForm.get("message").patchValue(oldValue + imgTags);
            });
    }

    private parse(data: Material): void {
        this.id = data.id;
        this.editForm.patchValue(data);
        this.item = data;
    }

    private parseForm(): Material {
        const item: Material = this.editForm.value;
        console.warn(this.editForm.value);
        console.warn(item);
        item.id = this.id;
        item.userId = this.item.userId;//todo should move to input
        return item;
    }

    private initForm(): void {
        this.editForm = this.formBuilder.group({
            categoryId: ["", Validators.required],
            title: ["", Validators.required],
            brief: ["", Validators.required],
            message: ["", Validators.required],
            source: [""],
            photoPreview: [{ value: null, readonly: true}, Validators.required],
            photo: [null, Validators.required],
            canCommentary: [true],
            onTop: [false],
            pending: [true],
            stayOnPage: [true],
            usePhotoInBody: [true]
    });
    }

    private parseCategories(items: MaterialCategory[]) {
        this.categories = items;
    }
}