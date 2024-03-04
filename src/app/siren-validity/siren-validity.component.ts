import { Component } from '@angular/core';
import {SirenValidator} from "./services/siren-validator";
import {SirenValidatorImpl} from "./services/siren-validator.impl";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";

interface ValidationList {
  siren: string;
  isValid: boolean;
}

@Component({
  selector: 'app-siren-validity',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIcon,
    ReactiveFormsModule,
    MatInput,
    MatButtonModule,
    MatListModule
  ],
  providers: [
    { provide: SirenValidator, useClass: SirenValidatorImpl },
  ],
  templateUrl: './siren-validity.component.html',
  styleUrl: './siren-validity.component.scss'
})
export class SirenValidityComponent {
  sirenList: ValidationList[] = [];
  siren = new FormControl('732829320', { nonNullable: true });

  constructor(private sirenValidator: SirenValidator) {}

  generateSiren() {
    if (this.siren.value && this.siren.value.length === 8) {
      const _siren = this.sirenValidator.computeFullSiren(this.siren.value);
      this.sirenList.push({ siren: _siren, isValid: true })
    }
  }

  checkSiren() {
    const _value = this.siren.value || this.siren.defaultValue;
    const _check = this.sirenValidator.checkSirenValidity(_value);
    this.sirenList.push({ siren: _value, isValid: _check })
  }
}
