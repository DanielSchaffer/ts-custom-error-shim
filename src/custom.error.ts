if (typeof(global) === 'undefined') {
    throw new Error('global is undefined');
}

export interface CustomErrorShimConstructor {
    new (message?: string): CustomErrorShim;
    readonly OGError: ErrorConstructor;
}

export class CustomErrorShim implements Error {

    public name: string;
    public message: string;
    public stack: string;

    constructor(message?: string) {
        try {
            this.name = this.constructor.name;
        } catch (err) {
            // ignore - some error helpers (like this one!) make `name` read-only
        }
        try {
            this.message = message;
        } catch (err) {
            // ignore - some error helpers (like this one!) make `message` read-only
        }


        let superCtrPrototype = Object.getPrototypeOf(Object.getPrototypeOf(this));
        if (superCtrPrototype === this.constructor.prototype) {
            // most likely another custom error helper referring to Error
            superCtrPrototype = OGError.prototype;
        }

        if (superCtrPrototype.constructor !== CustomErrorShim) {
            Object.setPrototypeOf(this.constructor.prototype, superCtrPrototype);
        }

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

    public toString(): string {
        return OGError.prototype.toString.call(this);
    }

}

export const OGError: ErrorConstructor =
    global.Error.name === 'CustomErrorShim' ?
        (global.Error as any as CustomErrorShimConstructor).OGError :
        global.Error;

if ((global.Error as any) !== CustomErrorShim) {
    (global as any).Error = CustomErrorShim;
}
