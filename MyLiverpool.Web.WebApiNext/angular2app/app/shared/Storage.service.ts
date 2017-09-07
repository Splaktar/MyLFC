﻿import { Injectable, Inject } from "@angular/core";
import { LocalStorage } from "./local-storage";
import { IAuthTokenModel } from "../auth/models/auth-tokens-model";

@Injectable()
export class StorageService {
    constructor(
        @Inject(LocalStorage) private localStorage: any) {
    }

    public retrieveTokens(): IAuthTokenModel {
        const tokensString = this.get("auth-tokens");
        return tokensString ? JSON.parse(tokensString) : null;
    }

    public getRoles(): string[] {
        return this.getObject("roles");
    }

    public getUserId(): number {
        return +this.get("userId");
    }

    public setChatUpdateTime(value: number, type: number = null): void {
        this.set(`chatTimer${type}`, value.toString());
    }

    public getChatUpdateTime(type: number = null): number {
        return +this.get(`chatTimer${type}`);
    }

    public removeAuthTokens(): void {
        this.remove("roles");
        this.remove("userId");
        this.remove("auth-tokens");
    }

    public setAuthTokens(item: any): boolean {
        this.set("auth-tokens", JSON.stringify(item));
        return true;
    }

    public setRoles(roles: string[]): void {
        if (!this.localStorage) return;
        this.setObject("roles", roles);
    }

    public setUserId(id: number): void {
        if (!this.localStorage) return;
        this.setObject("userId", id);
    }

    public tryAddViewForMaterial(id: number): boolean {
        if (!this.localStorage) return false;
        if (!this.get(`material${id}`)) {
            this.set(`material${id}`, "1");
            return true;
        }
        return false;
    }
    
    private setExpiredDate(seconds: number): string {
        let date = new Date();
        date.setSeconds(date.getSeconds() + seconds);
        return date.toUTCString();
    };

    private set(key: string, value: string): void {
        if (!this.localStorage) return;
        localStorage[key] = value;
    }

    private get(key: string): string {
        if (!this.localStorage) return "";
        return localStorage[key] || false;
    }

    private setObject(key: string, value: any): void {
        if (!this.localStorage) return;
        localStorage[key] = JSON.stringify(value);
    }

    private getObject(key: string): any {
        if (!this.localStorage) return null;
        if (localStorage[key]) {
            return JSON.parse(localStorage[key]);
        }
        return null;
    }

    private remove(key: string): void {
        if (!this.localStorage) return;
        this.localStorage.removeItem(key);
    }
}