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
  limit = 5;
  currentPage: number = 1;

  constructor(private _contacts: ContactService) {}

  ngOnInit(): void {
    this.fetchAllContacts();
  }

  fetchAllContacts() {
    this._contacts.getContcts(this.currentPage);
    this.contactsSub = this._contacts
      .getContactsUpdatedListener()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  onClose(data) {
    this.isEdit = false;
  }

  onGetContact(id: string) {
    this.isEdit = true;
    this._contacts.getSingleContact(id);
  }

  onUpdateContact(contact) {
    const { _id, name, phone, address, notes } = contact;
    this.isEdit = false;
    this._contacts.updateContact(_id, name, phone, address, notes);
  }

  onDelContact(id: string) {}

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
