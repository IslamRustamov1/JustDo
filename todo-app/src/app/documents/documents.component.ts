import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";

import { IRules } from "../interfaces";
import { conditions, privacy } from "../constants";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrls: ["./documents.component.scss"]
})
export class DocumentsComponent implements OnInit {
  @Input() route: string;
  @Input() data: IRules;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === "/terms-conditions") {
      this.route = "conditions";
      this.data = conditions;
    } else {
      this.route = "policy";
      this.data = privacy;
    }
  }
}
