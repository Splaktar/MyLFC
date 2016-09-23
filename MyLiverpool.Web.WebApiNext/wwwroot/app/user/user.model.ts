﻿export class User {
    id: number;
    private email: string;
    userName: string;
    private emailConfirmed: boolean;
    private gender: boolean;
    private registrationDate: Date;
    private lastModifiedOn: Date;
    private birthday: Date;
    private roleGroupName: string;
    private fullName: string;
    private roleGroupId: number;
    private lockoutEndDateUtc: Date;
    private photo: string;
    private newsCount: number;
    private blogsCount : number;
}