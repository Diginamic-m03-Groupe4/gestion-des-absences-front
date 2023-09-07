import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appDateValidator]'
})
export class DateValidatorDirective {

  constructor() { }

  static dateDebut : number = Date.now();

  static dateInPresent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value.getTime() < new Date().getTime();
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

}
