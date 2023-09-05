import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appDateValidator]'
})
export class DateValidatorDirective {

  constructor() { }

  static dateInPresent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value.getTime() < new Date().getTime();
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  static dateDebutBeforeDateFin(dateFin : Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value.getTime() > dateFin.getTime();
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }


}
