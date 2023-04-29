/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const EntryDependency = require("./dependencies/EntryDependency");

/** @typedef {import("./Compiler")} Compiler */
/** @typedef {import("./Entrypoint").EntryOptions} EntryOptions */

class EntryPlugin {
	/**
	 * An entry plugin which will handle
	 * creation of the EntryDependency
	 *
	 * @param {string} context context path
	 * @param {string} entry entry path
	 * @param {EntryOptions | string=} options entry options (passing a string is deprecated)
	 */
	constructor(context, entry, options) {
		this.context = context;
		this.entry = entry; // entry: { main: { import: ['xxx'] } }
		this.options = options || ""; // at EntryOptionPlugin.entryDescriptionToOptions
	}

	/**
	 * Apply the plugin
	 * @param {Compiler} compiler the compiler instance
	 * @returns {void}
	 */
	/**
	 * tap     compiler.compilation
	 * => tap  compilation.dependencyFactories
	 * 
	 * tap     compiler.make
	 * => compilation.addEntry
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"EntryPlugin",
			(compilation, { normalModuleFactory }) => {
				// bind normalModuleFactory with compilation
				compilation.dependencyFactories.set(
					EntryDependency,
					normalModuleFactory
				);
			}
		);

		const { entry, options, context } = this;
		const dep = EntryPlugin.createDependency(entry, options);

		compiler.hooks.make.tapAsync("EntryPlugin", (compilation, callback) => {
			// addEntry(undefined, EntryDependency, options)
			compilation.addEntry(context, dep, options, err => {
				callback(err);
			});
		});
	}

	/**
	 * @param {string} entry entry request
	 * @param {EntryOptions | string} options entry options (passing string is deprecated)
	 * @returns {EntryDependency} the dependency
	 */
	/**
	 * entry = { main: { import: ['xxx'] } }
	 * =>
	 * new EntryDependency(entry)
	 */
	static createDependency(entry, options) {
		const dep = new EntryDependency(entry);
		// TODO webpack 6 remove string option
		dep.loc = { name: typeof options === "object" ? options.name : options };
		return dep;
	}
}

module.exports = EntryPlugin;
