import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Router } from "@angular/router";
import { MatInputModule } from "@angular/material/input";

import { TodoComponent } from "./todo/todo.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { InputFieldComponent } from "./input-field/input-field.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    InputFieldComponent,
    SidebarComponent,
    DropdownComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
  ],
})
export class TodosModule {}
