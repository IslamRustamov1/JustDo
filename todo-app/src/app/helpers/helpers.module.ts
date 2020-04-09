import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AlarmComponent } from "./alarm/alarm.component";
import { NewFilterComponent } from "./new-filter/new-filter.component";

@NgModule({
  declarations: [AlarmComponent, NewFilterComponent],
  imports: [CommonModule, NgbModule, FormsModule, ReactiveFormsModule],
})
export class HelpersModule {}
