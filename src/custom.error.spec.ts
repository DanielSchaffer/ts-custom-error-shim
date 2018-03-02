import { expect } from 'chai';

export class ExampleError extends Error {

    public readonly isExample = true;

    constructor() {
        super('This is an example');
    }

}

export class SubExampleError extends ExampleError {
    constructor() {
        super();
    }
}

describe.only('CustomError', () => {

    it('subclasses are instances of Error', () => {
        expect(new ExampleError()).to.be.instanceOf(Error);
    });

    it('subclasses are instances of Error when thrown', () => {
        expect(() => { throw new ExampleError() }).to.throw(Error);
    });

    it('subclasses are instances of themselves when instantiated', () => {
        expect(new ExampleError()).to.be.instanceOf(ExampleError);
    });

    it('subclasses are instances of themselves when thrown', () => {
        expect(() => { throw new ExampleError() }).to.throw(ExampleError);
    });

    it('subclasses\' name property is the name of the class', () => {
        expect(new ExampleError().name).to.equal('ExampleError');
    });

    it('subclasses\' names are retained on the function', () => {
        new ExampleError();
        expect(ExampleError.name).to.equal('ExampleError');
    });

    it('includes a stack trace', () => {
        expect(new ExampleError().stack).to.exist;
    });

    it('does not include itself in the stack trace', () => {
        const error = new ExampleError();
        expect(error.stack).not.to.include('at ExampleError');
        expect(error.stack).not.to.include('at new ExampleError');
    });

    it('sub-subclasses are instances of Error', () => {
        expect(new SubExampleError()).to.be.instanceOf(Error);
    });

    it('sub-subclasses are instances of Error when thrown', () => {
        expect(() => { throw new SubExampleError() }).to.throw(Error);
    });

    it('sub-subclasses are instances of themselves when instantiated', () => {
        const error = new SubExampleError();
        expect(error).to.be.instanceOf(SubExampleError);
    });

    it('sub-subclasses are instances of themselves when thrown', () => {
        expect(() => { throw new SubExampleError() }).to.throw(SubExampleError);
    });

    it('sub-subclasses are instances of their super class', () => {
        expect(new SubExampleError()).to.be.instanceOf(ExampleError);
    });

    it('sub-subclasses are instances of their super class when thrown', () => {
        expect(() => { throw new SubExampleError() }).to.throw(ExampleError);
    });

    it('sub-subclasses\' name property is the name of the class', () => {
        expect(new SubExampleError().name).to.equal('SubExampleError');
    });

    it('sub-subclasses\' names are retained on the function', () => {
        new SubExampleError();
        expect(SubExampleError.name).to.equal('SubExampleError');
    });

    it('sub-subclasses retain inherited properties', () => {
        const error = new SubExampleError();
        expect(error.isExample).to.exist;
        expect(error.isExample).to.be.true;
    });
});
