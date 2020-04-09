import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownComponent } from "./dropdown.component";
import { Router, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("DropdownComponent", () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
