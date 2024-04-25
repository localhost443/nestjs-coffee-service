import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  PreconditionFailedException,
} from '@nestjs/common';

@Injectable()
export class PersonalParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new PreconditionFailedException('Oh! Sorry');
    }
    return val;
  }
}
