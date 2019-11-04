import { Component, OnInit, Output } from '@angular/core';
import { FileEntry } from '../../_models/fileEntry';
import { FilesService } from '../../_services/files.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Output() finalizado: boolean;
  private files: FileEntry[] = [];

  constructor(private filesService: FilesService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onDropFiles(files: FileList) {
    this.files.splice(0, this.files.length);
    for (let index = 0; index < files.length; index++) {
         // this.filesService.uploadFile(files.item(index));
         this.files.push({
           file: files.item(index),
           percentage: null,
            bytesuploaded: null,
            canceled: null,
            error: null,
            finished: null,
            paused: null,
            state: null,
            task: null,
            uploading: null
         });
    }
  }

  removeFileFromList(i: number) {
    this.files.splice(i, 1);
  }

  uploadAll() {

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.files.length; i++) {

        this.filesService.upload(this.files[i]);
        this.files[i].finished.subscribe(a => {
          this.snackbar.open('Upload efetuado com sucesso!', 'OK', {duration: 2000});
        }, erro => {this.snackbar.open('Ocorreu um erro ao enviar arquivo' + erro, 'OK', {duration: 2000})});
      }

      this.finalizado = true;

  }

}
