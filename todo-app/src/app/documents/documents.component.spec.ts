import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { GraphQLModule } from "../graphql.module";
import { DocumentsComponent } from "./documents.component";

describe("DocumentsComponent", () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsComponent],
      imports: [RouterTestingModule, GraphQLModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
