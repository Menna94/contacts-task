import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts.model';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  isEdit: boolean = false;
  private contactsSub: Subscription;
  //pagination
  pageSize = 5;
  page: number = 1;
  //search
  searchName: string;
  searchPhone: number;

  constructor(private _contacts: ContactService) {}

  ngOnInit(): void {
    this.fetchAllContacts();
  }

  //Search
  onSearchName() {
    if (this.searchName == '') {
      this.ngOnInit();
    }
    this.contacts = this.contacts.filter((contact) => {
      return contact.name
        .toLocaleLowerCase()
        .match(this.searchName.toLocaleLowerCase());
    });
  }
  onSearchPhone() {
    if (this.searchPhone == null) {
      this.ngOnInit();
    }
    this.contacts = this.contacts.filter((contact) => {
      return contact.phone == this.searchPhone;
    });
  }

  // Get All Contacts + Pagination
  fetchAllContacts() {
    this._contacts.getContcts(this.page);
    this.contactsSub = this._contacts
      .getContactsUpdatedListener()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  onChange() {
    this.page = this.page + 1;
    this._contacts.getContcts(this.page);
  }

  // When EditMode
  onClose(data) {
    this.isEdit = false;
  }

  onUpdateContact(contact) {
    const { _id, name, phone, address, notes } = contact;
    this.isEdit = false;
    this._contacts.updateContact(_id, name, phone, address, notes);
  }

  // Shared Between Update & Delete
  onGetContact(id: string) {
    this.isEdit = true;
    this._contacts.getSingleContact(id);
  }

  // When Deleting
  onDelContact(id: string) {}

  //Unsubscribe the contacts subscribtion
  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
