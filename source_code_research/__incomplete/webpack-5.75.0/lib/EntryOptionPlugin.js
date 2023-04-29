/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

/** @typedef {import("../declarations/WebpackOptions").EntryDescriptionNormalized} EntryDescription */
/** @typedef {import("../declarations/WebpackOptions").EntryNormalized} Entry */
/** @typedef {import("./Compiler")} Compiler */
/** @typedef {import("./Entrypoint").EntryOptions} EntryOptions */

class EntryOptionPlugin {
	/**
	 * @param {Compiler} compiler the compiler instance one is tapping into
	 * @returns {void}
	 */
	/**
	 * tap  entryOption
	 */
	apply(compiler) {
		compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
			EntryOptionPlugin.applyEntryOption(compiler, context, entry);
			return true;
		});
	}

	/**
	 * @param {Compiler} compiler the compiler
	 * @param {string} context context directory
	 * @param {Entry} entry request
	 * @returns {void}
	 */
	/**
	 * applyEntryOption(
	 *   compiler,
	 *   context  =  undefined,
	 *   entry    =  { main: { import: ['xxx'] } }
	 * )
	 */
	static applyEntryOption(compiler, context, entry) {
		if (typeof entry === "function") {
			/**
			 * entry: () => {}
			 */
			const DynamicEntryPlugin = require("./DynamicEntryPlugin");
			new DynamicEntryPlugin(context, entry).apply(compiler);
		} else {
			/**
			 * entry: { main: { import: ['src/index.js'] } }
			 */
			const EntryPlugin = require("./EntryPlugin");
			for (const name of Object.keys(entry)) {
				/**
				 * name: 'main'
				 * desc: { import: ['xxx'] }
				 */
				const desc = entry[name];
				const options = EntryOptionPlugin.entryDescriptionToOptions(
					compiler,
					name,
					desc
				);
				for (const entry of desc.import) {
					new EntryPlugin(context, entry, options).apply(compiler);
				}
			}
		}
	}

	/**
	 * @param {Compiler} compiler the compiler
	 * @param {string} name entry name
	 * @param {EntryDescription} desc entry description
	 * @returns {EntryOptions} options for the entry
	 */
	/**
	 * entryDescriptionToOptions(compiler, 'main', { import: ['xxx'] })
	 */
	static entryDescriptionToOptions(compiler, name, desc) {
		/** @type {EntryOptions} */
		const options = {
			name,
			filename: desc.filename,
			runtime: desc.runtime,
			layer: desc.layer,
			dependOn: desc.dependOn,
			baseUri: desc.baseUri,
			publicPath: desc.publicPath,
			chunkLoading: desc.chunkLoading,
			asyncChunks: desc.asyncChunks,
			wasmLoading: desc.wasmLoading,
			library: desc.library
		};
		if (desc.layer !== undefined && !compiler.options.experiments.layers) {
			throw new Error(
				"'entryOptions.layer' is only allowed when 'experiments.layers' is enabled"
			);
		}
		if (desc.chunkLoading) {
			const EnableChunkLoadingPlugin = require("./javascript/EnableChunkLoadingPlugin");
			EnableChunkLoadingPlugin.checkEnabled(compiler, desc.chunkLoading);
		}
		if (desc.wasmLoading) {
			const EnableWasmLoadingPlugin = require("./wasm/EnableWasmLoadingPlugin");
			EnableWasmLoadingPlugin.checkEnabled(compiler, desc.wasmLoading);
		}
		if (desc.library) {
			const EnableLibraryPlugin = require("./library/EnableLibraryPlugin");
			EnableLibraryPlugin.checkEnabled(compiler, desc.library.type);
		}
		return options;
	}
}

module.exports = EntryOptionPlugin;
