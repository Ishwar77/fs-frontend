import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainSectionComponent } from "./main-section/main-section.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatCardModule } from "@angular/material";
import { PromoSectionComponent } from "./promo-section/promo-section.component";
import { InvitePromoComponent } from "./invite-promo/invite-promo.component";
import { ProcessComponent } from "./process/process.component";
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderModule } from '../layouts/header/header.module';
import { RouterModule } from '@angular/router';
import { AdvertiseModule } from '../advertise/advertise.module';

@NgModule({
  declarations: [
    MainSectionComponent,
    PromoSectionComponent,
    InvitePromoComponent,
    ProcessComponent,
  ],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule,AdvertiseModule, MatCardModule, HeaderModule, RouterModule, SharedModule],

  exports: [MainSectionComponent, PromoSectionComponent, InvitePromoComponent, ProcessComponent,],
})
export class HomeNewPageModules { }
