import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  page: number;
  total: number = this.contacts.length;
  //search
  searchName: string;

  constructor(
    private _contacts: ContactService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

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

  //sort
  reverse: boolean = false;
  sort(key) {
    if (key === 'name') {
    }
  }
  // Get All Contacts + Pagination
  fetchAllContacts() {
    this._contacts.getContcts(1);
    this.contactsSub = this._contacts
      .getContactsUpdatedListener()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  onChange(currPage: number) {
    this.page = this.pageSize * (currPage - 1);
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
  onDelContact(id: string, name: string) {
    if (confirm('Are you sure to delete ' + name)) {
      this._contacts.delContact(id);
    }
  }

  //Unsubscribe the contacts subscribtion
  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
