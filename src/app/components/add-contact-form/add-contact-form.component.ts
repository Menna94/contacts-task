import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css'],
})
export class AddContactFormComponent implements OnInit {
  constructor(private _contacts: ContactService) {}

  ngOnInit(): void {}

  onCreateContact(form: NgForm) {
    console.log(form.value);

    // if (form.invalid) {
    //   return;
    // }
    this._contacts.addContct(
      form.value.name,
      form.value.phone,
      form.value.address,
      form.value.notes
    );
    console.log(`Created`);

    form.resetForm();
  }
}
