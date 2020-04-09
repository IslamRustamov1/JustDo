import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

import { months } from "../../constants";
import { asapScheduler } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormatterService {
  constructor() {}
  private days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  formatDate(date: string) {
    const d = new Date(date);

    const month = new Intl.DateTimeFormat("en", {
      month: "long",
    }).format(d);
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    let wday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(d);

    this.days.forEach((d, index) => {
      if (d === wday) {
        wday = this.days[index - 1];
      }
    });

    if (wday === undefined) {
      wday = "Friday";
    }

    const result = wday + ", " + month + " " + (parseInt(day) - 1);

    return result;
  }

  formatAlarm(alarm: number) {
    switch (alarm) {
      case 5:
        return "5 min.";
      case 10:
        return "10 min.";
      case 30:
        return "30 min.";
      case 60:
        return "1 hour";
      case 180:
        return "3 hours";
      case 1440:
        return "1 day";
      case 10080:
        return "1 week";

      default:
        break;
    }
  }

  formatTime(time: number) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return hours + ":" + minutes;
  }

  formatUrgencyColor(urgency: string) {
    switch (urgency) {
      case "urgent":
        return "red";
      case "important":
        return "orange";
      case "normal":
        return "blue";
      case "neutral":
        return "grey";
      default:
        break;
    }
  }
}
