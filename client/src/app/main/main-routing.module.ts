import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletasComponent } from './atletas/atletas.component';
import { DetailAtletaComponent } from './atletas/detail-atleta/detail-atleta.component';
import { ConsultaAtletaComponent } from './atletas/consulta-atleta/consulta-atleta.component';
import { DropzoneComponent } from './files/dropzone/dropzone.component';
import { MyFilesComponent } from './files/my-files/my-files.component';
import { UploadFilesComponent } from './files/upload-files/upload-files.component';
const routes: Routes = [
  {path: '', redirectTo: 'atletas'},
  {path: 'atletas', component: AtletasComponent},
  {path: 'atletas/add', component: DetailAtletaComponent},  
  {path: 'atletas/add/:id', component: DetailAtletaComponent},
  {path: 'atletas/consulta/:id', component: ConsultaAtletaComponent}
  // {path: 'atletas', component: AtletasComponent,
  //   children: [
  //     {path: 'atletas/add', component: DetailAtletaComponent}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }