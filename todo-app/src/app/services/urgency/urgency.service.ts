import { Apollo } from "apollo-angular";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { defaultUrgencies } from "../../constants";
import { IUrgency } from "src/app/interfaces";
import { IGetUrgencies, getUrgencies } from "src/app/graphql/getUrgenciesQuery";
import {
  createUrgency,
  ICreateUrgency,
} from "../../graphql/createUrgencyMutation";
import {
  IDeleteUrgency,
  deleteUrgency,
} from "src/app/graphql/deleteUrgencyMutation";

@Injectable({
  providedIn: "root",
})
export class UrgencyService {
  private urgencies: IUrgency[] = defaultUrgencies;

  private urgenciesBehavior: BehaviorSubject<IUrgency[]> = new BehaviorSubject<
    IUrgency[]
  >(this.urgencies);

  urgenciesBehavior$: Observable<
    IUrgency[]
  > = this.urgenciesBehavior.asObservable();

  constructor(private apollo: Apollo) {
    this.apollo
      .query<IGetUrgencies>({ query: getUrgencies })
      .subscribe((response) => {
        this.urgencies = this.urgencies.concat(response.data.getUrgencies);
        this.urgenciesBehavior.next(this.urgencies);
      });
  }

  createUrgency(urgency: IUrgency) {
    this.apollo
      .mutate<ICreateUrgency>({
        mutation: createUrgency,
        variables: {
          name: urgency.name,
          color: urgency.color,
          level: urgency.level,
        },
      })
      .subscribe(
        (response) => {
          urgency._id = response.data.createUrgency._id;
          this.urgencies.push(urgency);
          this.urgenciesBehavior.next(this.urgencies);
          console.log(this.urgencies);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteUrgency(urgency: IUrgency) {
    this.apollo
      .mutate<IDeleteUrgency>({
        mutation: deleteUrgency,
        variables: {
          urgencyId: urgency._id,
        },
      })
      .subscribe(
        (response) => {
          this.urgencies = this.urgencies.filter(
            (elem) => elem._id !== urgency._id
          );
          this.urgenciesBehavior.next(this.urgencies);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
