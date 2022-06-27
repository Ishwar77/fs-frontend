import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { TrainerGuard } from "src/app/util/guards/trainerguard";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EventmanageComponent } from './eventmanage/eventmanage.component';
import { EventmanageModule } from './eventmanage/eventmanage.module';

const routes: Routes = [
    {
        path: "",
        component: EventmanageComponent,
        children: [
            {
                path: "summarys",
                canActivate: [TrainerGuard],
                loadChildren: () =>
                    import("./summary/index").then((m) => m.SummaryDashboardModule),
            },
            { path: "**", redirectTo: "myevents" },
        ],
    },
    { path: "**", redirectTo: "home" },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        EventmanageModule,
        FlexLayoutModule,
        RouterModule.forChild(routes),
    ],
    exports: [],
})
export class EventDashboardModule { }
