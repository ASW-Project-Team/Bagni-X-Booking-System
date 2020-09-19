import {Component, OnInit, ViewChild} from '@angular/core';
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {UnregCustomerFormComponent} from "../../../shared/components/unreg-customer-form/unreg-customer-form.component";

@Component({
  selector: 'app-admin-contact-create',
  templateUrl: './admin-contact-create.component.html',
  styleUrls: ['./admin-contact-create.component.scss']
})
export class AdminContactCreateComponent implements OnInit {
  activeActions: AppbarAction[] = [];
  @ViewChild('editor') editor: UnregCustomerFormComponent;

  private createAction: AppbarAction = {
    id: "0",
    name: "Crea cliente",
    mdiIcon: 'content-save-outline',
    isMdi: true,
    execute: () => this.editor.submitProgrammatically()
  }

  constructor() { }

  ngOnInit(): void {
    this.activeActions.push(this.createAction)
  }
}
