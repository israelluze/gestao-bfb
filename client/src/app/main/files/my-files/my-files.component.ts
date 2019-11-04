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

  _upload = false;
  public files: Observable<Myfile[]>;

  constructor(private fileService: FilesService) { }

  ngOnInit() {
    this.files = this.fileService.getFiles();
  }

  getDate(n) {
    return new Date(n);
  }

  delete(f: Myfile) {
    this.fileService.deleteFile(f);
  }
  
  upload() {
    this._upload = true;
  }

}
