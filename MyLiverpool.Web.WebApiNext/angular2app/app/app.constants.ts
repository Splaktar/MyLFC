﻿import { Injectable } from "@angular/core";

@Injectable()
export class Configuration {
 //   public Server: string = "http://localhost:46940/";
    public Server: string = "http://localhost:1669/";
    public ApiUrl: string = "api/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}