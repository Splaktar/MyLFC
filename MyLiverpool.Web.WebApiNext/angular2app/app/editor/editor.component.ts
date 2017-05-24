﻿// from https://www.npmjs.com/package/ng2-tinymce
import { Component, EventEmitter, forwardRef, Input, Output, NgZone } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

import "tinymce";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/code";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/image";
import "tinymce/plugins/hr";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/themes/modern";
import "tinymce/plugins/paste";
import "tinymce/plugins/preview";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
declare let tinymce: any;

@Component({
    selector: "bbeditor",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditorComponent),
            multi: true
        }
    ],
    template: `<textarea class="form-control" id="{{elementId}}">{{_value}}</textarea>`
})
export class EditorComponent implements ControlValueAccessor {
    @Output() public change = new EventEmitter();
    @Output() public ready = new EventEmitter();
    @Output() public blur = new EventEmitter();
    @Input("value") public _value: string = "";
    @Input() public type: number = 1;
    public elementId: string = Math.random().toString(36).substring(2);
    public zone: NgZone;
    public editor: any;

    public ngAfterViewInit(): void {
           this.initTiny();
    }

    constructor(zone: NgZone) {
        this.zone = zone;
    }

    public get value(): string {
        return this._value;
    };
    public set value(value: string) {
        if (value !== this._value) {
            this._value = value;
            this.onChange(value);
            this.onTouched();
        }
    }

    public updateValue(value: any): void {
        this.zone.run(() => {
            this.value = value;
            this.onChange(value);
            this.onTouched();
            this.change.emit(value);
        });
    }

    public ngOnDestroy(): void {
        if (tinymce && this.editor) {
            tinymce.remove(this.editor);
        }
    }

    public writeValue(value: any): void {
        this.value = value;
        if (!tinymce) {
            this.initTiny();
        }
        if (tinymce.editors && tinymce.editors[this.elementId]) {
            tinymce.editors[this.elementId].setContent((value) ? value : "");
        }
    }

    public onChange(_: any): void { }
    public onTouched(): void { }
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private getPlugins(): string {
        const common: string = `anchor autolink autoresize lists link anchor image preview fullscreen
        visualblocks code media table paste code emoticons`;
        if (this.type === 1) {
            return `advlist contextmenu ${common}`;
        }
        if (this.type === 2) {
            return `advlist contextmenu ${common}`;
        }
        if (this.type === 3) {
            return `${common}`;
        }
        return "";
    }

    private getToolbar(): string {
        const common: string =
            `| styleselect | bold italic underline strikethrough | link image emoticons hr`;//poiler-add spoiler-remove`;
        const type1: string = `insert | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen ${
            common}`;
        const type2: string = `undo redo ${type1}` ;
        if (this.type === 1) {
            return type1;
        }
        if (this.type === 2) {
            return type2;
        }
        if (this.type === 3) {
            return common;
        }
        return "";
    }

    private initTiny(): void {
        tinymce.init({
            // autoresize_overflow_padding: 0,
            selector: `#${this.elementId}`,
            schema: "html5",
            //forced_root_block: "",
            // height: 500,        
            forced_root_block: false,
            autoresize_max_height: 500,
            menubar: false,
            language: "ru",
            // inline: true,
            plugins: [
                this.getPlugins()
            ],
            toolbar: this.getToolbar(),
            //external_plugins: {
            //    spoiler: "/js/extPlugins/spoiler/plugin.js"
            //},
            skin_url: "/src/lightgray",
            setup: (editor: any) => {
                this.editor = editor;
                editor.on("change", () => {
                    const content: any = editor.getContent();
                    this.updateValue(content);
                });
                editor.on("keyup", () => {
                    const content: any = editor.getContent();
                    this.updateValue(content);
                });
            }
        });
    }
}