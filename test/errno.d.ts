declare module 'errno' {

  interface Errno {
    custom: ErrnoCustom;
  }

  interface ErrnoCustom {
    createError(name: string, parent?: Function): ErrorConstructor;
  }

  const errno: Errno;

  export = errno;

}
