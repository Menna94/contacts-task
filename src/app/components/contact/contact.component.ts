import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  constructor(private _contacts: ContactService) {}

  ngOnInit(): void {}
}
