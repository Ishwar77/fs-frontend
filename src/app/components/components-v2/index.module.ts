import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './stats-card/stats-card.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material';
import { ChartsComponent } from './charts/charts-component';
import { WidgetsDashboardComponent } from './widgets/widget.component';
import { CardssComponent } from './card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoupanCardComponent } from './coupan-card/coupan-card/coupan-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { SmallCardWidgetComponent } from './small-widget-cards/small-widget-cards.component';

const assets = [
    StatsCardComponent,
    ChartsComponent, CoupanCardComponent,
    WidgetsDashboardComponent, CardssComponent, UserCardComponent, SmallCardWidgetComponent
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MatTooltipModule, SharedModule
    ],
    exports: [assets],
    declarations: [assets],
})
export class CustomModulev2 { }
