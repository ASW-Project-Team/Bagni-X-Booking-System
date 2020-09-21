import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {ApiService} from "../../../core/api/api.service";
import {MatUtilsService} from "../../../core/mat-utils/mat-utils.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.scss']
})
export class AdminContactsComponent implements OnInit {
  customers: Customer[];
  totalItems: number = 100;
  currentPageId = 0;


  constructor(private api: ApiService,
              private matUtils: MatUtilsService) { }


  ngOnInit(): void {
   this.updateContactsPage()
  }


  generateDeleteCustomerAction(customer: Customer): Function {
    return () => {
      this.matUtils.createAlertDialog({
        content: "Sei sicuro di voler eliminare il cliente? L'azione interesserà le future prenotazioni, ma non quelle già effettuate.",
        positiveAction: { text: "Sì, elimina", execute: () => {
          this.api.deleteUnregisteredCustomer(customer.id).subscribe(() => {
            this.matUtils.createSnackBar('Cliente eliminato.');
            this.updateContactsPage(this.currentPageId);
          });
        }},
        negativeAction: { text: "No", execute: () => {} }
      });
    }
  }


  changePage($event: PageEvent) {
    this.currentPageId = $event.pageIndex - 1;
    this.updateContactsPage(this.currentPageId);
  }


  updateContactsPage(page: number = 0): void {
    this.customers = undefined;
    this.api.getCustomers(page).subscribe(data => {
      this.customers = data.map(model => new Customer(model));

      if (this.customers.length < 10) {
        this.totalItems = (page) * 10 + this.customers.length;
      }
    });
  }
}
