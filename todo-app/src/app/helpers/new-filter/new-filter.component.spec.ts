import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { NewFilterComponent } from "./new-filter.component";
import { Apollo } from "apollo-angular";

describe("NewFilterComponent", () => {
  let component: NewFilterComponent;
  let fixture: ComponentFixture<NewFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewFilterComponent],
      providers: [NgbActiveModal, Apollo],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
