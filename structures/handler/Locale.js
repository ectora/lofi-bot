const { Collection } = require('discord.js-selfbot-v13');

/* eslint-disable no-unused-vars */
module.exports = class {
      constructor(i18n, name, localeProps = {}) {
            this.i18n = i18n;
            this.name = name;

            for (const element in localeProps) {
                  if (typeof localeProps[element] === "object") {
                        for (const prop in localeProps[element]) {
                              this[element] = new Collection();
                              this[element].set(prop, localeProps[element][prop]);
                        }
                  } else {
                        this[element] = localeProps[element];
                  }
            }
      }
};