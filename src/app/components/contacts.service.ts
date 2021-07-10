import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from '../contacts.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts: Contact[] = [];
  private contactsUpdated = new Subject<Contact[]>();

  constructor(private _http: HttpClient) {}

  getContactsUpdatedListener() {
    return this.contactsUpdated.asObservable();
  }

  addContct(name: string, phone: number, address: string, notes: string) {
    const contact: Contact = { _id: null, name, phone, address, notes };

    return this._http
      .post('http://localhost:5000/contacts/', contact)
      .subscribe((resData) => {
        console.log(resData);
        this.contacts.push(contact);
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getContcts(page: number) {
    const queryParams = `?page=${page}`;
    this._http
      .get<{ data: any }>('http://localhost:5000/contacts' + queryParams)
      .subscribe((res) => {
        this.contacts = res.data;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  getSingleContact(id: string) {
    this._http.get(`http://localhost:5000/contacts/${id}`).subscribe((res) => {
      console.log(res);
    });
  }

  getContactsSort(key: string, reverse: boolean) {
    const queryParams = `?sort=${key}`;
    this._http
      .get<{ data: any }>('http://localhost:5000/contacts' + queryParams)
      .subscribe((res) => {
        this.contacts = res.data;
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  updateContact(
    _id: string,
    name: string,
    phone: number,
    address: string,
    notes: string
  ) {
    const contact: Contact = { _id, name, phone, address, notes };

    this._http
      .put(`http://localhost:5000/contacts/${_id}`, contact)
      .subscribe((res) => {
        console.log(res);
        this.contacts.push(contact);
        this.contactsUpdated.next([...this.contacts]);
      });
  }

  delContact(_id: string) {
    this._http
      .delete(`http://localhost:5000/contacts/${_id}`)
      .subscribe((res) => {
        console.log(res);
        this.contactsUpdated.next([...this.contacts]);
      });
  }
}
