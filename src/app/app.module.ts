import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core Imports
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { FormComponent } from './components/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddContactFormComponent } from './components/add-contact-form/add-contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactsListComponent,
    FormComponent,
    AddContactFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
