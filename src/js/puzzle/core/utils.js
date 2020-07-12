// Pure functions - не взаимодействуют с глобальном скопом, реагируют только на входящие параметры
const capitalize = (str) => {
    if (typeof str !== 'string' || !str.split().length) {
        return '';
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
};

function storage(key, data = null) {
    // set
    if (data) {
        localStorage.setItem(key, JSON.stringify(data));

        return;
    }

    // get
    return JSON.parse(localStorage.getItem(key));
}

function isEqual(a, b) {
    if (typeof a === 'object' && b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}

function camelToDashCase(str) {
    return str.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
}

function toInlineStyles(styles = {}, prefixToAll = '') {
    if (styles) {
        return Object.keys(styles)
            .map(key => `${ camelToDashCase(key) }: ${ styles[key] + prefixToAll}`)
            .join(';');
    }

    return styles;
}

function debounce(fn, wait) {
    let timeout;

    return function(...args) {
        const later = () => {
            clearTimeout(timeout);

            // eslint-disable-next-line no-invalid-this
            fn.apply(this, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function merge(target, ...sources) {
    if (!sources.length) {
        return target;
    }

    const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                merge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
}

function keymapEvent(keymap, e) {
    const altKey = e.altKey;
    const cmdKey = e.ctrlKey || e.metaKey;

    const prefix = `${ cmdKey ? 'cmd_' : ''}${ altKey ? 'alt_' : '' }`;
    const keyCode = `${ prefix }${ e.keyCode }`;

    return keymap[keyCode];
}

export {
    debounce,
    capitalize,
    storage,
    isEqual,
    toInlineStyles,
    clone,
    merge,
    keymapEvent
};
