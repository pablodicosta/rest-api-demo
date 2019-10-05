export class DuplicatedError extends Error {

  constructor(msg: string) {
    super(`Duplicated resource ${msg}`);
    Object.setPrototypeOf(this, DuplicatedError.prototype);
  }

}
