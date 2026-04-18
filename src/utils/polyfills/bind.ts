declare global {
  interface Function {
    bindCustom<TThis, TArgs extends unknown[], R>(
      this: (this: TThis, ...args: TArgs) => R,
      oThis: TThis,
      ...args: unknown[]
    ): (...restArgs: unknown[]) => R;
  }
}
Function.prototype.bindCustom = function <TThis, TArgs extends unknown[], R>(
  this: (this: TThis, ...args: TArgs) => R,
  oThis: TThis,
  ...boundArgs: unknown[]
): (...restArgs: unknown[]) => R {
  if (typeof oThis !== "function") {
    throw new TypeError("not a function");
  }

  const self = this;
  const fNOP = function () {};
  const fToBound = function (...restArgs: unknown[]): R {
    return self.apply(oThis, [...boundArgs, ...restArgs] as TArgs);
  };

  fNOP.prototype = this.prototype;
  // @ts-ignore
  // fToBound.prototype = Object.create(this.prototype);
  fToBound.prototype = new fNOP();

  return fToBound;
};
