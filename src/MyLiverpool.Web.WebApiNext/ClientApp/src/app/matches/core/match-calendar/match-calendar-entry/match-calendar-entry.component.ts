﻿import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Match } from '@domain/models';
import { RolesCheckedService } from '@app/+auth';

@Component({
    selector: 'match-calendar-entry',
    templateUrl: './match-calendar-entry.component.html',
    styleUrls: ['./match-calendar-entry.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchCalendarEntryComponent {
    @Input() public match: Match;
    @Input() public name: string;
    @Input() public next: boolean;

    constructor(
        public roles: RolesCheckedService) {}
}
