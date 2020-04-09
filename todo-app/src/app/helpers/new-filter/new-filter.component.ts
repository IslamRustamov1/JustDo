import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { IUrgency } from "src/app/interfaces";
import { UrgencyService } from "src/app/services/urgency/urgency.service";

@Component({
  selector: "app-new-filter",
  templateUrl: "./new-filter.component.html",
  styleUrls: ["./new-filter.component.scss"],
})
export class NewFilterComponent implements OnInit {
  private filterName: string;
  private filterPriority: number = 1;
  private color: string = "#ff0000";

  constructor(
    public activeModal: NgbActiveModal,
    private urgencyService: UrgencyService
  ) {}

  ngOnInit(): void {}

  setName(name: string) {
    this.filterName = name;
  }

  setPriority(priority: number) {
    this.filterPriority = priority;
  }

  setColor(color: string) {
    this.color = color;
    console.log(this.color);
  }

  getPriority() {
    return this.filterPriority;
  }

  createNewFilter() {
    if (this.filterName === "") return;
    const newUrgency: IUrgency = {
      _id: "",
      name: this.filterName,
      color: this.color,
      level: this.filterPriority,
    };
    this.urgencyService.createUrgency(newUrgency);
  }
}
