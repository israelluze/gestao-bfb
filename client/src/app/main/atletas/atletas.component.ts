import { Component, OnInit, ViewChild } from '@angular/core';
import { Atleta } from '../_models/atleta';
import * as faker from 'faker';
import { Observable, pipe } from 'rxjs';
import { AtletasService } from '../_services/atletas.service';
import { MatTableDataSource, MatPaginator, MatSort,  MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConverteDataService } from 'src/app/utils/converteData.service';
import { FilesService } from '../_services/files.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements OnInit {
  ELEMENT_DATA: Atleta[] = [];
  atletas$: Observable<Atleta[]>;
  step = 0;
  atleta: Atleta = new Atleta();
  public emdia = 0;
  public vencendo = 0;
  public vencidas = 0;

  displayedColumns: string[] = [
    'nome',
    'dataNascimento',
    'idade',
    'dataCarteira',
    'diasVencto',
    'acao'
  ];
  dataSource = new MatTableDataSource<Atleta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private atletasService: AtletasService,
              private filesService: FilesService,
              private router: Router,
              private convert: ConverteDataService,
              public dialog: MatDialog) {
    this.atletas$ = this.atletasService.getAtletas();
    this.atletas$.subscribe(a => (this.ELEMENT_DATA = a));
  }

  ngOnInit() {
    this.refresh();
  }

  addOne() {
    const a: Atleta = {
      nome: faker.name.findName(),
      dataNascimento: faker.date.between('2000-01-01', '2012-12-31'),
      nomeMae: faker.name.findName(),
      nomePai: faker.name.findName(),
      dataCarteira: faker.date.between('2019-01-01', '2021-12-31'),
      alergia: false,
      descricaoAlergia: 'Não Possui',
      medicamento: true,
      descricaoMedicamento: 'Ibuprofeno',
      tipoSanguineo: 'O+',
      celular: '47 - 994455660',
      telefone: '47 - 33556655',
      whatsapp: '47 9988771223',
      rua: faker.address.streetName(),
      bairro: 'Centro',
      cidade: faker.address.city(),
      cep: faker.address.zipCode('99-9999'),
      pais: 'Brasil',
      urlCarteirinha: '',
      numeroRegistroFCB: '',
      numeroRegistroCBB: '',
      identidade: ''
    };
    this.atletasService.addAtleta(a);
  }

  generate() {
    for (let i = 0; i < 5; i++) {
      this.addOne();
    }
    this.refresh();
  }

  randomDate(start, end) {
    return new Date(+start + Math.random() * (end - start));
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  pesquisar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: 'Você deseja deletar este registro ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filesService.getFilesbyIdAtleta(id).subscribe((files) => {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < files.length; i++) {
            setTimeout(() => {
              this.filesService.deleteFile(files[i]);
            }, 500);
          }
        });
        this.atletasService.deleteAtleta(id);
        this.refresh();
      }
    });
  }

  update(id: string) {
    this.router.navigateByUrl(`/main/atletas/add/${id}`);
  }

  consulta(id: string) {
    this.router.navigateByUrl(`/main/atletas/consulta/${id}`);
  }

  refresh() {
    setTimeout(() => {

      this.vencendo = 0;
      this.vencidas = 0;
      this.emdia = 0;

      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.ELEMENT_DATA.length; index++) {

        this.ELEMENT_DATA[index].idade = this.calculaIdade(this.convert.converteDataTimeStampUtc(this.ELEMENT_DATA[index].dataNascimento));

        this.ELEMENT_DATA[index].diasValidade = this.calculaValidade(this.convert
            .converteDataTimeStampUtc(this.ELEMENT_DATA[index].dataCarteira));

        if (this.ELEMENT_DATA[index].diasValidade >= 0 && this.ELEMENT_DATA[index].diasValidade < 60) {
          this.ELEMENT_DATA[index].color = 'purple';
          this.ELEMENT_DATA[index].font = 'normal';
          this.ELEMENT_DATA[index].status = 'vencendo';
          this.vencendo += 1;
        } else if (this.ELEMENT_DATA[index].diasValidade < 0) {
          this.vencidas += 1;
          this.ELEMENT_DATA[index].color = 'red';
          this.ELEMENT_DATA[index].font = 'normal';
          this.ELEMENT_DATA[index].status = 'vencida';
        } else {
          this.ELEMENT_DATA[index].status = 'em dia';
          this.emdia += 1;
        }
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000);
  }
  calculaIdade(data: string) {
    const timeDiff = Math.abs(Date.now() - Date.parse(data));
    const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }
  calculaValidade(data: string) {
    const dataAtual = new Date(Date.now());
    const dataValidade = new Date(data);
    const timeDiff = Math.ceil(dataValidade.getTime() - dataAtual.getTime());
    const validade = Math.ceil((timeDiff / (1000 * 3600 * 24)));
    return validade;
  }

  filtroStatus(status: string) {
    this.dataSource.filterPredicate = (data: Atleta, filter: string) => {
      return data.status === filter;
   };
    this.dataSource.filter = status.trim().toLowerCase();
  }

  limpa(){
    this.refresh();
  }

}
