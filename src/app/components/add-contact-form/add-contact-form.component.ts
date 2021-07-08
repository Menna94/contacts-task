import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css'],
})
export class AddContactFormComponent implements OnInit {
  constructor(private _contacts: ContactService) {}

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this._contacts.currContact = {
      _id: '',
      name: '',
      phone: null,
      address: '',
      notes: '',
    };
  }

  onSubmit(form: NgForm) {
    console.log('form submitted' + form.value);

    if (!form.invalid) {
      return;
    }
    this._contacts.addContct(form.value).subscribe((resData) => {
      console.log(resData);
      this.resetForm(form);
    });
  }
}
