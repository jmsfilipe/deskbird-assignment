import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { selectLoggedInUser } from "../state/auth.selectors";
import { Store } from "@ngrx/store";
import { AuthState } from "../state/auth.reducer";

@Directive({
  selector: "[isAdmin]",
  standalone: true
})
export class IsAdminDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.store.select(selectLoggedInUser).subscribe(user => {
      if (user && user.role === 'admin') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
