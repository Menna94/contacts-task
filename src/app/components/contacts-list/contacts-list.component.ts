import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts.model';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  // contacts: Contact[] = [];
  // private contactsSub: Subscription;

  constructor(private _contacts: ContactService) {}

  ngOnInit(): void {
    
  }

  fetchAllContacts(){
    this._contacts.getContcts().subscribe((resData) => {
      console.log(resData);
    });
  }
}
