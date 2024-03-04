
export abstract class SirenValidator {
  abstract checkSirenValidity(siren: string): boolean;
  abstract computeFullSiren(sirenWithoutControlNumber: string): string;
}
