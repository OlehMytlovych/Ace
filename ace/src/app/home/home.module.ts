import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NewJobDialogComponent } from './new-job-dialog/new-job-dialog.component';
@NgModule({
  declarations: [HomePageComponent, NewJobDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports: [
    HomePageComponent,
  ],
})
export class HomeModule { }
