﻿import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { AppModule } from "./app.module";

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === "build") {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);