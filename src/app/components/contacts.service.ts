import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../contacts.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts: Contact[] = [];
   private contactsUpdated = new Subject<Contact[]>();

  constructor(private _http: HttpClient) {}

  addContct(contact: Contact) {
    return this._http.post('localhost:3000/contacts/', contact);
  }

  getContcts() {
    this._http.get('localhost:3000/contacts/');
  }
}
