import { Component, OnInit, Output } from '@angular/core';
import { Atleta } from '../../_models/atleta';
import { Observable } from 'rxjs';
import { Listas } from '../../_models/listas';
import { AtletasService } from '../../_services/atletas.service';
import { MatSnackBar, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';
import { FilesService } from '../../_services/files.service';
import { ActivatedRoute } from '@angular/router';
import { ConverteDataService } from 'src/app/utils/converteData.service';

@Component({
  selector: 'app-consulta-atleta',
  templateUrl: './consulta-atleta.component.html',
  styleUrls: ['./consulta-atleta.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' }
    }
  ]
})
export class ConsultaAtletaComponent implements OnInit {

  @Output() idAtleta: string;
  public phoneMask = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  public celPhoneMask = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  public cepMask = [
    /[1-9]/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/
  ];

  tipoSelecionado: string;
  atleta: Atleta;
  possuiArquivos = false;
  atletaId: string = null;
  dataNascimento;
  dataCarteira;
  tipos: Listas[] = [
    { value: 'A+', viewValue: 'A+' },
    { value: 'A-', viewValue: 'A-' },
    { value: 'B+', viewValue: 'B+' },
    { value: 'B-', viewValue: 'B-' },
    { value: 'AB+', viewValue: 'AB+' },
    { value: 'AB-', viewValue: 'AB-' },
    { value: 'O+', viewValue: 'O+' },
    { value: 'O-', viewValue: 'O-' }
  ];
  paises: Listas[] = [{ value: 'Brasil', viewValue: 'Brasil' }];
  cidades: Listas[] = [
    { value: 'Blumenau', viewValue: 'Blumenau' },
    { value: 'Gaspar', viewValue: 'Gaspar' },
    { value: 'Pomerode', viewValue: 'Pomerode' }
  ];

  constructor(
    private ats: AtletasService,
    private snackBar: MatSnackBar,
    private fileService: FilesService,
    private route: ActivatedRoute,
    private convert: ConverteDataService
  ) {}

  ngOnInit() {
    this.atletaId = this.route.snapshot.paramMap.get('id');
    this.idAtleta = this.atletaId;
    if (this.atletaId) {
      setTimeout(() => {
        this.ats.procuraPorId(this.atletaId).subscribe(a => {
          this.atleta = a;
          this.dataCarteira = this.convert.converteDataTimeStampUtc(
            this.atleta.dataCarteira
          );
          this.dataNascimento = this.convert.converteDataTimeStampUtc(
            this.atleta.dataNascimento
          );
          this.atleta.dataCarteira = new Date(this.dataCarteira);
          this.atleta.dataNascimento = new Date(this.dataNascimento);
        });
        console.log(this.atleta);
      }, 300);
      setTimeout(() => {
        this.fileService.getFilesbyIdAtleta(this.atletaId).subscribe(a => {
          if (a.length) {
            this.possuiArquivos = true;
          } else {
            this.possuiArquivos = false;
          }
        });
      }, 200);
    }
  }
}
