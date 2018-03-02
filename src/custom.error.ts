if (typeof(global) === 'undefined') {
    throw new Error('global is undefined');
}

export interface CustomErrorShimConstructor {
    new (message?: string): CustomErrorShim;
    readonly OGError: ErrorConstructor;
}

export class CustomErrorShim implements Error {

    public readonly name: string;
    public readonly message: string;
    public readonly stack: string;

    constructor(message?: string) {
        this.name = this.constructor.name;
        this.message = message;

        const superCtrPrototype = Object.getPrototypeOf(Object.getPrototypeOf(this));
        Object.setPrototypeOf(this.constructor.prototype, superCtrPrototype);

        OGError.captureStackTrace(this, this.constructor);
    }

    public static captureStackTrace(targetObject: Object, constructorOpt?: Function): void {
        OGError.captureStackTrace(targetObject, constructorOpt);
    }

    public static get stackTraceLimit(): number {
        return OGError.stackTraceLimit;
    }
    public static set stackTraceLimit(limit: number) {
        OGError.stackTraceLimit = limit;
    }
    public static get prepareStackTrace(): (err: Error, stackTraces: NodeJS.CallSite[]) => any {
        return OGError.prepareStackTrace;
    }
    public static set prepareStackTrace(fn: (err: Error, stackTraces: NodeJS.CallSite[]) => any) {
        OGError.prepareStackTrace = fn;
    }

    public static get OGError(): ErrorConstructor {
        return OGError;
    }

}

export const OGError: ErrorConstructor =
    global.Error.name === 'CustomErrorShim' ?
        (global.Error as any as CustomErrorShimConstructor).OGError :
        global.Error;

if ((global.Error as any) !== CustomErrorShim) {
    console.log('replacing', global.Error);
    (global as any).Error = CustomErrorShim;
}
