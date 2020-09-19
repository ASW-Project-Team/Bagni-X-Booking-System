import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {ApiService} from "../../../core/api/api.service";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {
  customers: Customer[];

  constructor(private api: ApiService,
              private matUtils: MatUtilsService) { }

  ngOnInit(): void {
    this.api.getCustomers().subscribe(data => {
      this.customers = data.map(model => new Customer(model));
    });
  }

  generateDeleteCustomerAction(customer: Customer): Function {
    return () => {
      this.matUtils.createAlertDialog({
        content: "Sei sicuro di voler eliminare il cliente? L'azione interesserà le future prenotazioni, ma non quelle già effettuate.",
        positiveAction: { text: "Sì, elimina", execute: () => {
          this.api.deleteUnregisteredCustomer(customer.id).subscribe(() => {
            this.matUtils.createSnackBar('Cliente eliminato.');
            this.updateContacts();
          });
        }},
        negativeAction: { text: "No", execute: () => {} }
      });
    }
  }

  updateContacts(): void {
    this.api.getCustomers().subscribe(data => {
      this.customers = data.map(model => new Customer(model));
    });
  }
}
