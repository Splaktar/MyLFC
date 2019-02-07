﻿import { Component, Input, Output, EventEmitter } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ImageService } from "../image.service";

@Component({
    selector: "image-crop-addition",
    templateUrl: "./image-crop-addition.component.html",
    styleUrls: ["./image-crop-addition.component.scss"]
})
export class ImageCropAdditionComponent {
    public uploadedFiles: string[];
    @Input()
    public controlName: string = "upload-crop-image";
    @Output()
    public loadedImage: EventEmitter<string> = new EventEmitter<string>();
    imageChangedEvent: any = "";
    croppedImage: any = "";


    constructor(private service: ImageService,
        private snackBar: MatSnackBar
    ) {
    }

    public onUploadImage(event: any) {
        this.imageChangedEvent = event;
    }

    imageCropped(image: string) {
        this.croppedImage = image;
        
    }

    crop() {
        this.service.uploadBase64Image(this.croppedImage.base64)
            .subscribe(result => {
                this.loadedImage.emit(result);
                this.snackBar.open("Изображение обрезано");
                this.imageChangedEvent = null;
                this.croppedImage = null;
                },
                error => {
                    this.snackBar.open("Ошибка при загрузке", null);
                });
    }
}