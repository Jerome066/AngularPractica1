import { Pipe, PipeTransform } from '@angular/core';
import { Geo } from '../models/geo';

@Pipe({
  name: 'toStringGeo'
})
export class ToStringGeoPipe implements PipeTransform {

  transform(geo: Geo): string {
    return "( " + geo.lat + "° , " + geo.lng + "° )";
  }

}
