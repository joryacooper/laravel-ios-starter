import { FormControl, FormGroup } from "@angular/forms";
import { first, forEach, get, startCase, values } from "lodash";

const _labelMap = {
  'score.custom': 'Score',
}

export function getErrors(formGroup: FormGroup, formGroupName: string = '', errors: {[k: string]: any} = {}): {[k: string]: string} {
  if (formGroup.valid) {
    return errors
  }
  forEach(formGroup.controls, (formControl, formControlName) => {
    if (formControl.valid) {
      return
    }
    const formControlPath = formGroupName ? `${formGroupName}.${formControlName}` : formControlName
    if (formControl instanceof FormGroup) {
      getErrors(formControl, formControlPath, errors)
    } else if (formControl instanceof FormControl) {
      forEach(formControl.errors, (errorValue, errorType) => {
        const errorKey = `${formControlPath}.${errorType}`
        errors[errorKey] = _errorMessageForErrorType(errorType, get(_labelMap, formControlPath, startCase(formControlName)))
      })
    }
  })
  return errors
}

export function getFirstError(formGroup: FormGroup) {
  return first(values(getErrors(formGroup)))
}

function _errorMessageForErrorType(errorType: string, errorSubject: string) {
  switch (errorType) {
    case 'required':
      return `${errorSubject} is required.`
    default:
      return `${errorSubject} is invalid.`
  }
}
