import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAreaSumValid(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isAreaSumValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as any;
          if (
            typeof obj.farmableArea === 'number' &&
            typeof obj.vegetationArea === 'number' &&
            typeof obj.totalArea === 'number'
          ) {
            return obj.farmableArea + obj.vegetationArea <= obj.totalArea;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return 'The sum of farmableArea and vegetationArea cannot exceed totalArea';
        },
      },
    });
  };
}
