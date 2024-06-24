import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  total: number = 0;
  totalSumado: number = 0;
  valorFamilia: number = 1;
  selectedOption: any;
  promotionalPriceEnabled: boolean = false;

  constructor() {}

  botonesServicios: { etiqueta: string, value: number, selected: boolean }[] = [
    { etiqueta: 'Especialidades Medicas', value: 4500, selected: false },
    { etiqueta: '50% Descuento en Farmacias', value: 3000, selected: false },
    { etiqueta: 'Telemedicina', value: 2500, selected: false },
    { etiqueta: 'Análisis Clinicos', value: 3500, selected: false },
    { etiqueta: 'Análisis por Imágenes', value: 3500, selected: false },
    { etiqueta: 'Odontología', value: 4000, selected: false },
    { etiqueta: 'Urgencias', value: 2500, selected: false },
    { etiqueta: 'Asistencia', value: 1500, selected: false },
  ];

  opcionesTitulares = [
    { label: 'Titular', valor: 1, selected: true, precioPromocional: 4990 },
    { label: 'Matrimonio', valor: 1.7, selected: false, precioPromocional: 8483 },
    { label: 'Familia Tipo', valor: 2.7, selected: false, precioPromocional: 12483 },
    { label: 'Familia Numerosa', valor: 3.7, selected: false, precioPromocional: 16483 },
  ];

  botonesEspecial: { etiqueta: string, value: number, selected: boolean }[] = [
    { etiqueta: 'Acceder al precio Promocional', value: 20, selected: false },
    { etiqueta: 'Borrar', value: 0, selected: false },
  ];

  ngOnInit() {
    // Encuentra y establece la opción seleccionada en el inicio
    this.selectedOption = this.opcionesTitulares.find(option => option.selected);
    this.valorFamilia = this.selectedOption?.valor || 1;
    this.calculaTotal();
  }

  selectButton(button: any) {
    if (button.etiqueta === 'Borrar') {
      this.resetSelections();
    } else if (button.etiqueta === 'Acceder al precio Promocional') {
      this.applyPromotionalPrices();
    } else {
      button.selected = !button.selected;
      this.calculaTotal();
    }
    this.totalSumado = this.total;
  }

  handleRadioChange(event: any) {
    const selectedOption = this.opcionesTitulares.find(option => option.label === event.detail.value.label);
    this.selectedOption = selectedOption;
    this.valorFamilia = selectedOption?.valor || 1;
    this.calculaTotal();
  }

  resetSelections() {
    this.total = 0;
    this.botonesServicios.forEach(button => button.selected = false);
    this.opcionesTitulares.forEach(option => option.selected = false);
    this.selectedOption = this.opcionesTitulares[0]; // Restablece a la opción "Titular"
    this.selectedOption.selected = true;
    this.valorFamilia = this.selectedOption.valor;
    this.calculaTotal();
  }

  applyPromotionalPrices() {
    this.promotionalPriceEnabled = !this.promotionalPriceEnabled;
    if (this.promotionalPriceEnabled) {
      this.opcionesTitulares.forEach(option => {
        switch (option.label) {
          case 'Titular':
            option.valor = 4990;
            break;
          case 'Matrimonio':
            option.valor = 8483;
            break;
          case 'Familia Tipo':
            option.valor = 12483;
            break;
          case 'Familia Numerosa':
            option.valor = 16483;
            break;
          default:
            break;
        }
      });
    } else {
      this.opcionesTitulares.forEach(option => {
        switch (option.label) {
          case 'Titular':
            option.valor = 1;
            break;
          case 'Matrimonio':
            option.valor = 1.7;
            break;
          case 'Familia Tipo':
            option.valor = 2.7;
            break;
          case 'Familia Numerosa':
            option.valor = 3.7;
            break;
          default:
            break;
        }
      });
    }
    this.valorFamilia = this.selectedOption?.valor || 1;
    this.calculaTotal();
  }

  calculaTotal() {
    this.total = 0; // Reinicia el total a 0
    this.botonesServicios.forEach(button => {
      if (button.selected) {
        this.total += button.value; // Suma el valor del botón si está seleccionado
      }
    });
    this.total = this.total * this.valorFamilia;
  }
}