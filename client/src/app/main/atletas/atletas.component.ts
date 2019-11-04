import { Component, OnInit, ViewChild } from '@angular/core';
import { Atleta } from '../_models/atleta';
import * as faker from 'faker';
import { Observable, pipe } from 'rxjs';
import { AtletasService } from '../_services/atletas.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

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

  displayedColumns: string[] = [
    'nome',
    'dataNascimento',
    'dataCarteira',
    'acao'
  ];
  dataSource = new MatTableDataSource<Atleta>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private atletasService: AtletasService, private router: Router) {
    this.atletas$ = this.atletasService.getAtletas();
    this.atletas$.subscribe(a => (this.ELEMENT_DATA = a));
  }

  ngOnInit() {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
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

      urlCarteirinha: ''
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

  delete(id: string) {
    this.atletasService.deleteAtleta(id);
    this.refresh();
  }

  update(id: string) {
    this.router.navigateByUrl(`/main/atletas/add/${id}`);
  }

  refresh() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }
}
