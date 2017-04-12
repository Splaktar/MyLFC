﻿export class Match {
    id: number;
    isHome: boolean;
    clubId: number;
    clubName: string;
    homeClubId: number;
    homeClubName: string;
    homeClubLogo: string;
    awayClubId: number;
    awayClubName: string;
    awayClubLogo: string;
    dateTime: Date;
    typeId: number;
    typeName: string;
    stadium: string;
    seasonId: number;
    scoreHome: string;
    scoreAway: string;
    reportUrl: string;
    photoUrl: string;
    videoUrl: string;
}