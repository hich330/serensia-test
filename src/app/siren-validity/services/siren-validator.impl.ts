import {SirenValidator} from "./siren-validator";

export class SirenValidatorImpl implements SirenValidator {

  checkSirenValidity(siren: string): boolean {
    const _trimmedSiren = this.removeSpaces(siren);
    if (!this.isValidStringFormat(_trimmedSiren)) {
      return false;
    }
    const _sum = this.calculateSum(_trimmedSiren);
    return _sum%10 === 0;
  }

  computeFullSiren(sirenWithoutControlNumber: string): string {
    const _trimmedSiren = this.removeSpaces(sirenWithoutControlNumber);
    if (_trimmedSiren.length !== 8) {
      throw new Error('invalid SIREN');
    }
    let controlNumber = 0;
    const _sum = this.calculateSum(_trimmedSiren + controlNumber);
    controlNumber = _sum%10 === 0 ? controlNumber : 10 - (_sum%10);

    return sirenWithoutControlNumber + controlNumber;
  }

  private removeSpaces(value: string): string {
    return value.replace(/\s/g, '');
  }

  private isValidStringFormat(value: string): boolean {
    const _normalSirenRegex = new RegExp(/(^\d{9}$)/gi);
    const _traderSirenRegex = new RegExp(/(^\d{9}RCS$)/ig);
    const _artisanSirenRegex = new RegExp(/(^\d{9}RM\d{3}$)/ig);

    return _normalSirenRegex.test(value) ||
      _traderSirenRegex.test(value) ||
      _artisanSirenRegex.test(value);
  }

  private calculateSum(siren: string): number {
    const _sirenArray = Array.from(siren).splice(0, 9);
    const _reversed = _sirenArray.reverse();
    let _sum = 0;

    _reversed.forEach((value: string, index: number) => {
      const _position = index + 1;
      const _parsed = parseInt(value);
      let _result = _position % 2 > 0 ? _parsed : _parsed * 2;

      if (_result > 9) {
        const digit = _result - 10;
        _result = digit + 1;
      }
      _sum += _result;
    });

    return _sum;
  }

}
