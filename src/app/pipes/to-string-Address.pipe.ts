import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'toStringAddress'
})
export class ToStringAddressPipe implements PipeTransform {

  transform(_Address: Address): string {
    const direccion:string = _Address.city + " , " + _Address.street + " , " + _Address.suite + " , " +  _Address.zipcode;
    return direccion;
  }

}
