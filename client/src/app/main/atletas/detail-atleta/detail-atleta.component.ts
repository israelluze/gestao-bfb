import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AtletasService } from '../../_services/atletas.service';
import { Atleta } from '../../_models/atleta';
import { MatSnackBar} from '@angular/material';
import { Listas } from '../../_models/listas';
import { FilesService } from '../../_services/files.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe, formatDate } from '@angular/common';
import { ConverteDataService } from 'src/app/utils/converteData.service';

@Component({
  selector: 'app-detail-atleta',
  templateUrl: './detail-atleta.component.html',
  styleUrls: ['./detail-atleta.component.css'],
  providers: [DatePipe]
})
export class DetailAtletaComponent implements OnInit {

  @ViewChild('nome', {static: true}) nome1: ElementRef;

  public phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public celPhoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cepMask = [/[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  tipoSelecionado: string;
  possuiAlergia = false;
  usaMedicamento = false;
  atleta: Atleta;
  possuiArquivos = false;
  atletaId: string = null;
  atleta$: Observable<Atleta>;
  data;
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
  paises: Listas[] = [
    { value: 'Brasil', viewValue: 'Brasil' }
  ];
  cidades: Listas[] = [
    { value: 'Blumenau', viewValue: 'Blumenau' },
    { value: 'Gaspar', viewValue: 'Gaspar' },
    { value: 'Pomerode', viewValue: 'Pomerode' }
  ];

  formAtleta = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    dataNascimento: [[this.datepipe.transform(new Date(), 'dd/MM/yyyy')], [Validators.required]],
    dataCarteira: [[this.datepipe.transform(new Date(), 'dd/MM/yyyy')], [Validators.required]],
    nomePai: [''],
    nomeMae: [''],
    rua: [''],
    bairro: [''],
    cidade: [''],
    pais: [''],
    cep: [''],
    telefone: [''],
    celular: [''],
    whatsapp: [''],
    tipoSanguineo: [''],
    alergia: [''],
    descricaoAlergia: [''],
    medicamento: [''],
    descricaoMedicamento: [''],
    urlCarteirinha: ['']
  });

  constructor(private fb: FormBuilder,
              private ats: AtletasService,
              private snackBar: MatSnackBar,
              private fileService: FilesService,
              private route: ActivatedRoute,
              private datepipe: DatePipe,
              private convert: ConverteDataService
              ) {}

  ngOnInit() {

    this.atletaId = this.route.snapshot.paramMap.get('id');
    if (this.atletaId) {
      this.ats.procuraPorId(this.atletaId).subscribe((ret) => {
        this.formAtleta.setValue(
          { id: ret.id,
            nome: ret.nome,
            dataNascimento: this.convert.converteData(ret.dataNascimento),
            dataCarteira: this.convert.converteData(ret.dataCarteira),
            nomePai: ret.nomePai,
            nomeMae: ret.nomeMae,
            rua: ret.rua,
            bairro: ret.bairro,
            cidade: ret.cidade,
            pais: ret.pais,
            cep: ret.cep,
            telefone: ret.telefone,
            celular: ret.celular,
            whatsapp: ret.whatsapp,
            tipoSanguineo: ret.tipoSanguineo,
            alergia: ret.alergia,
            descricaoAlergia: ret.descricaoAlergia,
            medicamento: ret.medicamento,
            descricaoMedicamento: ret.descricaoMedicamento,
            urlCarteirinha: ret.urlCarteirinha
          }
          );
        this.possuiAlergia = this.formAtleta.value.alergia;
        this.usaMedicamento = this.formAtleta.value.medicamento;

        console.log(this.formAtleta.value.dataCarteira);
        console.log(this.formAtleta.value.dataNascimento);
      });
    }
    // .subscribe((retorno: Atleta) => { this.atleta = retorno; console.log(this.atleta); });

    this.fileService.getFiles().subscribe(a => {
      if (a.length) {
         this.possuiArquivos = true;
      } else {
        this.possuiArquivos = false;
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    setTimeout(() => this.nome1.nativeElement.focus());
  }

  onChangeAlergia() {
    this.possuiAlergia = this.formAtleta.value.alergia;
  }
  onChangeMedicamento() {
    this.usaMedicamento = this.formAtleta.value.medicamento;
  }
  adicionar() {
    try {
      this.atleta = this.formAtleta.value;
      console.log(this.atleta);
      this.ats.addAtleta(this.atleta);
      this.atleta = new Atleta();
      this.formAtleta.reset();
      this.focus();
      this.snackBar.open(
        'Atleta gravado com sucesso !', 'OK', {duration: 2000}
      );
    } catch (error) {
      console.log(error);
      this.snackBar.open(
        'Erro ao gravar atleta: ' + error + '!', 'OK', {duration: 2000}
      );
    }
  }

  focus() {
    setTimeout(() => this.nome1.nativeElement.focus());
  }


}
