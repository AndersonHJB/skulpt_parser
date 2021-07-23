// Copyright (c) 2021 the Skulpt Project
// SPDX-License-Identifier: MIT

import { assert } from "../util/assert.ts";

// deno-lint-ignore no-explicit-any
export class pyConstant<V = any> {
    static _name = "constant";
    _v: V;
    constructor(v: V) {
        this._v = v;
    }
    toString(): string {
        return String(this._v);
    }
    valueOf(): V {
        return this._v;
    }
    get [Symbol.toStringTag]() {
        return (this.constructor as typeof pyConstant)._name;
    }
}

const escape = { "\n": "n", "\r": "r", "\t": "t", "\\": "\\", "'": "'", '"': '"' };

function _stringRepr(v: string): string {
    let quote = "'";
    if (v.includes("'") && !v.includes('"')) {
        quote = '"';
    }
    const toEscape = new RegExp(`([\\n\\r\\\\\t${quote}])`, "g");
    v = v.replace(toEscape, (_m, m1) => "\\" + escape[m1 as keyof typeof escape]);
    // deno-lint-ignore no-control-regex
    v = v.replace(/[\x00-\x1f]/g, (m) => "\\x" + m.charCodeAt(0).toString(16).padStart(2, "0"));
    return quote + v + quote;
}

export class pyStr extends pyConstant<string> {
    static _name = "str";
    toString() {
        return _stringRepr(this._v);
    }
}

// this could also be a JSBI.BigInt
// relying on Skulpt adding JSBI to the window object if bigint isn't available
export class pyInt extends pyConstant<number | bigint> {
    static _name = "int";
}

export class pyFloat extends pyConstant<number> {
    static _name = "float";
    /** @todo - make this string a little more involved */
    toString() {
        const v = this._v;
        if ((v > 0 && v < 0.0001) || (v < 0 && v > -0.0001)) {
            return v.toExponential().replace(/(e[-+])([1-9])$/, "$10$2");
        } else {
            const ret = v.toString();
            return ret.includes(".") ? ret : ret + ".0";
        }
    }
}

export class pyComplex extends pyConstant<{ real: number; imag: number }> {
    static _name = "complex";
    constructor({ real = 0, imag }: { real?: number; imag: number }) {
        // this is from the tokenizer and we shouldn't have a real except 0.
        assert(real === 0);
        super({ real, imag });
    }
    toString() {
        const { imag } = this._v;
        return imag + "j";
    }
}

export class pyBytes extends pyConstant<Uint8Array> {
    static _name = "bytes";
    toString() {
        return "b" + _stringRepr(new TextDecoder().decode(this._v));
    }
}

export class pyNoneType extends pyConstant<null> {
    static _name = "NoneType";
    toString() {
        return "None";
    }
}

export class pyBool extends pyConstant<boolean> {
    static _name = "bool";
    toString() {
        return this._v ? "True" : "False";
    }
}

export class pyEllipsisType extends pyConstant<"..."> {
    static _name = "ellipsis";
    toString() {
        return "Ellipsis";
    }
}

export const pyNone = new pyNoneType(null);
export const pyTrue = new pyBool(true);
export const pyFalse = new pyBool(false);
export const pyEllipsis = new pyEllipsisType("...");
