/**
 * These classes simply act as 'containers' for values that have been added,
 * deleted or changed in an object.
 */
export class DeletedValue {
  constructor(public prevVal: any) { }
}

// tslint:disable-next-line:max-classes-per-file
export class ChangedValue {
  constructor(public prevVal: any, public newVal: any) { }
}

// tslint:disable-next-line:max-classes-per-file
export class AddedValue {
  constructor(public val: any) { }
}
