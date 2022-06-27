import { SharedModule } from "./../../shared/shared.module";
import { AboutusModule } from "../../components/others/aboutus/aboutus.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageComponent } from "./home-page.component";
import { EventCardModule } from "src/app/components/cards/event-card/event-card.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderModule } from 'src/app/components/layouts/header/header.module';
import { HomeNewPageModules } from 'src/app/components/home-page/home-page.module';
import { SlideModule } from '../../../app/components/slider-module/slider-module';


@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    HeaderModule,
    EventCardModule,
    AboutusModule,
    HomeNewPageModules,
    SlideModule
  ],
  exports: [HomePageComponent],
})
export class HomePageModule { }
