﻿import { Component, EventEmitter, forwardRef, Input, Output, NgZone } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { Settings, EditorManager, Editor, WindowManager } from "tinymce";

declare let tinymce: any;
//declare let document: any;
import "tinymce"; //todo should be moved
/*import "tinymce/themes/modern"
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/code";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/image";
import "tinymce/plugins/hr";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/paste";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/preview";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";*/


@Component({
    selector: "bbeditor",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditorComponent),
            multi: true
        }],
    
    template: `<textarea class="form-control" id="{{elementId}}">{{_value}}</textarea>`
})
/*export class EditorComponent {
    @Output() public change = new EventEmitter();
    @Output() public ready = new EventEmitter();
    @Output() public blur = new EventEmitter();
    @Input("value") public _value: string = "";
    @Input() public type: number = 1;
    @Input() public height: number = 200;
    public elementId: string = Math.random().toString(36).substring(2);
    
}*/
export class EditorComponent implements ControlValueAccessor {
    @Output() public change = new EventEmitter();
    @Output() public ready = new EventEmitter();
    @Output() public blur = new EventEmitter();
    @Input("value") public _value: string = "";
    @Input() public type: number = 1;
    @Input() public height: number = 200;
    public elementId: string = Math.random().toString(36).substring(2);
    public zone: NgZone;
    ClientSide: boolean;
 //   public tinymce: EditorManager = new EditorManager();
    public editor: Editor;

    public ngAfterViewInit(): void {
        this.initTiny();
   //     if (this.ClientSide) {
   //         require.resolve(['tinymce'
   //         ], require => require("tinymce"))
  //      } //todo should be moved
    }

    constructor(zone: NgZone) {
        this.ClientSide = typeof window !== 'undefined'
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
      //  if (this.tinymce && this.editor) {
      //      this.tinymce.remove(this.editor);
        if (tinymce && this.editor) {
            tinymce.remove(this.editor);
        }
    }

    public writeValue(value: any): void {
        this.value = value;
      //  if (!this.tinymce) {
        if (tinymce) {
            this.initTiny();
        }
      //  if (this.tinymce.editors && this.tinymce.editors[this.elementId]) {
      //      this.tinymce.editors[this.elementId].setContent((value) ? value : "");
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
        const common: string = ` autolink lists link anchor image preview fullscreen hr
        visualblocks code media table paste textcolor colorpicker autolink CustomEmoticons`;
        if (this.type === 1) {
            return `advlist ${common}`;
        }
        if (this.type === 2) {
            return `advlist ${common}`;
        }
        if (this.type === 3) {
            return `${common}`;
        }
        return "";
    }

    private getToolbar(): string {
        const common: string =
            `bold italic underline strikethrough | CustomEmoticons |`;//poiler-add spoiler-remove`;
        const type1: string = `styleselect | link image media | alignleft aligncenter alignright alignjustify |
                                 | bullist numlist | outdent indent | forecolor backcolor | ${common} | fontsizeselect`;
        const type2: string = `undo redo | fullscreen | colorpicker ${type1}` ;
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
        let settings1: Settings = {
            // autoresize_overflow_padding: 0,
            
            selector: `#${this.elementId}`,
            schema: "html5",
            fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt",
            forced_root_block: "",
            min_height: this.height,
            browser_spellcheck: true,
            gecko_spellcheck: true,
            remove_trailing_brs: true,
            menubar: false,
            language: "ru",
            // inline: true,
            plugins: [
                this.getPlugins()
            ],
            relative_urls: true,
            document_base_url: "/",
            toolbar: this.getToolbar(),
            //visualblocks_default_state: true,
            external_plugins: {
                customEmoticons: "/src/plugins/customEmoticons/plugin.js"
            },
            skin_url: "/src/lightgray",
            setup: (editor: Editor) => {
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
        }

        tinymce.init(settings1);
    }
}