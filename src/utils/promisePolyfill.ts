type ResolveHandler<T> = (value: T) => void;
type RejectHandler = (err: unknown) => void;
type Executor<T> = (
  resolve: (value: T) => void,
  reject: (err: unknown) => void
) => void;
class MyPromise<T = unknown> {
  private onResolve?: ResolveHandler<T>;
  private onReject?: RejectHandler;
  private fulfilled = false;
  private isRejected = false;
  private isCalled = false;
  private value?: T;
  private error?: unknown;
  static all: (promises: Promise<unknown>[]) => void;

  constructor(executor: Executor<T>) {
    const resolve = (val: T): void => {
      this.fulfilled = true;
      this.value = val;
      if (typeof this.onResolve === "function" && !this.isCalled) {
        this.isCalled = true;
        this.onResolve(val);
      }
    };
    const reject = (err: unknown): void => {
      this.isRejected = true;
      this.error = err;

      if (typeof this.onReject === "function" && !this.isCalled) {
        this.isCalled = true;
        this.onReject(err);
      }
    };
    executor(resolve, reject);
  }

  then(handler: ResolveHandler<T>): this {
    this.onResolve = handler;
    if (
      !this.isCalled &&
      this.fulfilled &&
      typeof this.onResolve === "function"
    ) {
      this.onResolve(this.value as T);
      this.isCalled = true;
    }
    return this;
  }

  catch(catchHandler: any) {
    this.onReject = catchHandler;
    if (
      !this.isCalled &&
      this.isRejected &&
      typeof this.onReject === "function"
    ) {
      this.onReject(this.error);
      this.isCalled = true;
    }
    return this;
  }
}

let mp = new MyPromise<number>((resolve, _) => {
  setTimeout(() => resolve(1), 500);
});
mp.then((val) => {
  console.log("val: ", val);
}).catch((err: unknown) => console.error(err));

let mp2 = new MyPromise<number>((resolve, _) => {
  resolve(12);
});
mp2
  .then((val) => {
    console.log("val: ", val);
  })
  .catch((err: unknown) => console.error(err));

// Polyfill for promise.all

MyPromise.all = function (promises: Promise<unknown>[]) {
  return new MyPromise(function executor(resolve, reject) {
    let count = 0;
    let res = [];
    if (!promises.length) {
      resolve(promises);
      return;
    }

    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((response) => {
          res[i++] = response;
          count++;
          if (count === promises.length) {
            resolve(res);
          }
        })
        .catch((err) => reject(err));
    }
  });
};
