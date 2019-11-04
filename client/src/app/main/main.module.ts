import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../material.module';
import { AtletasComponent } from './atletas/atletas.component';
import { DetailAtletaComponent } from './atletas/detail-atleta/detail-atleta.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { DropzoneComponent } from './files/dropzone/dropzone.component';
import { UploadFilesComponent } from './files/upload-files/upload-files.component';
import { MyFilesComponent } from './files/my-files/my-files.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  declarations: [
    AtletasComponent,
    DetailAtletaComponent,
    DropzoneComponent,
    UploadFilesComponent,
    MyFilesComponent
  ]
})
export class MainModule { }
