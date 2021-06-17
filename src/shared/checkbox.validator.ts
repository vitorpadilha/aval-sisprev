import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn | undefined {
  return function validate(control: AbstractControl): ValidationErrors | null {
    let checked = 0;
    if (control.value === true) {
      checked++;
    }
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxToBeChecked: true,
      };
    }

    return undefined;
  };
}
