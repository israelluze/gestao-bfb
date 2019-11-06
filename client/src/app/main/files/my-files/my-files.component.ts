import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Myfile } from '../../_models/myfile';
import { FilesService } from '../../_services/files.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {
  @Input() finalizado;
  @Input() idAtleta: string;
  
  _upload = false;
  public files: Observable<Myfile[]>;

  constructor(private fileService: FilesService) { }

  ngOnInit() {
    this.files = this.fileService.getFilesbyIdAtleta(this.idAtleta);
  }

  getDate(n) {
    return new Date(n);
  }

  delete(f: Myfile) {
    console.log(f);
    this.fileService.deleteFile(f);
  }
  
  upload() {
    this._upload = true;
  }

}
