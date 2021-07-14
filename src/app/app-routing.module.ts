import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

const routes: Routes = [
  { path: '', component: ContactsListComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'add-contact',
    component: AddContactFormComponent,
  },
  { path: '**', component: ContactsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
