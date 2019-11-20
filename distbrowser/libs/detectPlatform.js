export var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
export var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
