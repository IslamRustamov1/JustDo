import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

import { TodoListService } from "src/app/services/todo-list-service/todo-list.service";
import { IUrgency } from "../../interfaces";
import { NewFilterComponent } from "../../helpers/new-filter/new-filter.component";
import { UrgencyService } from "src/app/services/urgency/urgency.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  urgencies: IUrgency[];
  subscription: Subscription;

  constructor(
    private todoListService: TodoListService,
    private modalService: NgbModal,
    private urgencyService: UrgencyService
  ) {}

  ngOnInit(): void {
    this.subscription = this.urgencyService.urgenciesBehavior$.subscribe(
      (urgencies) => {
        this.urgencies = urgencies;
      }
    );
  }

  onChangeFilter(type: string) {
    this.todoListService.setFilter(type);
  }

  deleteUrgency(urgency: IUrgency) {
    this.urgencyService.deleteUrgency(urgency);
  }

  open() {
    const modalRef = this.modalService.open(NewFilterComponent);
  }

  createNewFilter() {
    this.open();
  }
}
