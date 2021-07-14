import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.css'],
})
export class AddContactFormComponent implements OnInit {
  constructor(
    private _contacts: ContactService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.onCreateContact(form);
    form.resetForm();
    this._router.navigate(['/'], { relativeTo: this._route });
  }

  onCreateContact(form: NgForm) {
    console.log(form.value);

    if (form.invalid) {
      return;
    }
    this._contacts.addContct(
      form.value.name,
      form.value.phone,
      form.value.address,
      form.value.notes
    );
    console.log(`Created`);
  }
}
