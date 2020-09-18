import { Component, OnInit } from '@angular/core';
import {Customer} from "../../../shared/models/customer.model";
import {Booking} from "../../../shared/models/booking.model";
import {ApiService} from "../../../core/api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppbarAction} from "../../../shared/components/appbars/appbars.model";
import {AlertDialogComponent} from "../../../shared/components/alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-contact-details',
  templateUrl: './admin-contact-details.component.html',
  styleUrls: ['./admin-contact-details.component.scss']
})
export class AdminContactDetailsComponent implements OnInit {
  customerFullName: string = ''
  customer: Customer;
  bookings: Booking[];
  actions: AppbarAction[] = [];

  private deleteAction: AppbarAction = {
    id: "1",
    name: "Elimina cliente",
    mdiIcon: 'trash-can-outline',
    isMdi: true,
    execute: () =>
      this.dialog.open(AlertDialogComponent, { data: {
          content: "Sei sicuro di voler eliminare il cliente? L'azione interesserà le future prenotazioni, ma non quelle già effettuate.",
          positiveAction: { text: "Sì, elimina", execute: () => this.deleteCustomer() },
          negativeAction: { text: "No", execute: () => {} }
      }})
  };

  private modifyAction: AppbarAction = {
    id: "0",
    name: "Modifica cliente",
    mdiIcon: 'pencil-outline',
    isMdi: true,
    execute: () => this.modifyCustomer()
  }


  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
              private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.customerFullName) {
        this.customerFullName = params.fullName;
      }

      this.api.getCustomer(params.id).subscribe(data => {
        this.customer = new Customer(data);
        this.customerFullName = this.customer.getFullName();

        if (!this.customer.registered) {
          this.actions.push(this.deleteAction, this.modifyAction);
        }

        this.api.getCustomerBookings(this.customer.id).subscribe(data => {
          this.bookings = data.map(model => new Booking(model));
        });
      });
    });
  }


  updateBookings(): void {
    this.api.getCustomerBookings(this.customer.id).subscribe(data => {
      this.bookings = data.map(model => new Booking(model));
    });
  }

  deleteCustomer() {
    this.api.deleteUnregisteredCustomer(this.customer.id)
      .subscribe(() => this.router.navigate(['/admin/contacts'])
        .then(() => this.snackbar.open("Cliente eliminato.", null, { duration: 4000 }))
      )
  }

  modifyCustomer() {
    this.router.navigate(
      ['/admin/contacts/edit', this.customer.id,
      { backRoute: '/admin/contacts/' + this.customer.id, backRouteName: 'Informazioni di ' + this.customerFullName}])
  }
}
