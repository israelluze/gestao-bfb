import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AtletasService } from '../../_services/atletas.service';
import { Atleta } from '../../_models/atleta';
import { MatSnackBar } from '@angular/material';
import { Listas } from '../../_models/listas';
import { FilesService } from '../../_services/files.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConverteDataService } from 'src/app/utils/converteData.service';

@Component({
  selector: 'app-detail-atleta',
  templateUrl: './detail-atleta.component.html',
  styleUrls: ['./detail-atleta.component.css'],
  providers: [DatePipe]
})
export class DetailAtletaComponent implements OnInit {
  @ViewChild('nome', { static: true }) nome1: ElementRef;
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
  possuiAlergia = false;
  usaMedicamento = false;
  atleta: Atleta;
  possuiArquivos = false;
  atletaId: string = null;
  atleta$: Observable<Atleta>;
  dataNascimento;
  dataCarteira;
  botao = 'Adicionar';
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
    { value: 'Pomerode', viewValue: 'Pomerode' },
    { value: 'Itajaí', viewValue: 'Itajaí' }
  ];

  formAtleta = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    dataNascimento: [new Date(), [Validators.required]],
    dataCarteira: [new Date(), [Validators.required]],
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
    urlCarteirinha: [''],
    numeroRegistroFCB: [''],
    numeroRegistroCBB: [''],
    identidade: ['']
  });

  constructor(
    private fb: FormBuilder,
    private ats: AtletasService,
    private snackBar: MatSnackBar,
    private fileService: FilesService,
    private route: ActivatedRoute,
    private convert: ConverteDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.atletaId = this.route.snapshot.paramMap.get('id');

    if (this.atletaId) {
      this.idAtleta = this.atletaId;
      this.botao = 'Gravar';
      this.ats.procuraPorId(this.atletaId).subscribe(ret => {
        this.dataCarteira = this.convert.converteDataTimeStampUtc(
          ret.dataCarteira
        );
        this.dataNascimento = this.convert.converteDataTimeStampUtc(
          ret.dataNascimento
        );
        this.formAtleta.setValue({
          id: ret.id,
          nome: ret.nome,
          dataNascimento: new Date(this.dataNascimento),
          dataCarteira: new Date(this.dataCarteira),
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
          urlCarteirinha: ret.urlCarteirinha,
          numeroRegistroFCB: ret.numeroRegistroFCB ? ret.numeroRegistroFCB : '',
          numeroRegistroCBB: ret.numeroRegistroCBB ? ret.numeroRegistroCBB : '',
          identidade: ret.identidade ? ret.identidade : ''
        });
        this.possuiAlergia = this.formAtleta.value.alergia;
        this.usaMedicamento = this.formAtleta.value.medicamento;

        setTimeout(() => {
          console.log(this.idAtleta);
          this.fileService.getFilesbyIdAtleta(this.idAtleta).subscribe(a => {
            if (a.length) {
              this.possuiArquivos = true;
            } else {
              this.possuiArquivos = false;
            }
          });
        }, 1000);
      });
    } else {
      this.idAtleta = this.ats.geraIdAtleta();
      this.botao = 'Adicionar';
    }
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

      if (this.atletaId) {
        this.ats.updateAtleta(this.atleta).then(
          retorno => {
            this.snackBar.open('Atleta alterado com sucesso !', 'OK', {
              duration: 2000
            });
          },
          erro => {
            this.snackBar.open(
              'Erro ao registrar alteração do atleta: ' + erro + '!',
              'OK',
              { duration: 2000 }
            );
          }
        );
        this.router.navigateByUrl('/main/atletas');
      } else {
        this.ats.addAtleta(this.atleta).then(
          retorno => {
            this.snackBar.open('Atleta gravado com sucesso !', 'OK', {
              duration: 2000
            });
          },
          erro => {
            this.snackBar.open('Erro ao gravar atleta: ' + erro + '!', 'OK', {
              duration: 2000
            });
          }
        );
      }
      this.atleta = new Atleta();
      this.formAtleta.reset();
      this.focus();
    } catch (error) {
      console.log(error);
      this.snackBar.open('Erro ao gravar atleta: ' + error + '!', 'OK', {
        duration: 2000
      });
    }
  }

  focus() {
    setTimeout(() => this.nome1.nativeElement.focus());
  }

}
