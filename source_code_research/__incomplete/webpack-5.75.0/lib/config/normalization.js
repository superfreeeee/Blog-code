/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const util = require("util");

/** @typedef {import("../../declarations/WebpackOptions").EntryStatic} EntryStatic */
/** @typedef {import("../../declarations/WebpackOptions").EntryStaticNormalized} EntryStaticNormalized */
/** @typedef {import("../../declarations/WebpackOptions").LibraryName} LibraryName */
/** @typedef {import("../../declarations/WebpackOptions").LibraryOptions} LibraryOptions */
/** @typedef {import("../../declarations/WebpackOptions").OptimizationRuntimeChunk} OptimizationRuntimeChunk */
/** @typedef {import("../../declarations/WebpackOptions").OptimizationRuntimeChunkNormalized} OptimizationRuntimeChunkNormalized */
/** @typedef {import("../../declarations/WebpackOptions").OutputNormalized} OutputNormalized */
/** @typedef {import("../../declarations/WebpackOptions").WebpackOptions} WebpackOptions */
/** @typedef {import("../../declarations/WebpackOptions").WebpackOptionsNormalized} WebpackOptionsNormalized */

const handledDeprecatedNoEmitOnErrors = util.deprecate(
	(noEmitOnErrors, emitOnErrors) => {
		if (emitOnErrors !== undefined && !noEmitOnErrors === !emitOnErrors) {
			throw new Error(
				"Conflicting use of 'optimization.noEmitOnErrors' and 'optimization.emitOnErrors'. Remove deprecated 'optimization.noEmitOnErrors' from config."
			);
		}
		return !noEmitOnErrors;
	},
	"optimization.noEmitOnErrors is deprecated in favor of optimization.emitOnErrors",
	"DEP_WEBPACK_CONFIGURATION_OPTIMIZATION_NO_EMIT_ON_ERRORS"
);

/**
 * @template T
 * @template R
 * @param {T|undefined} value value or not
 * @param {function(T): R} fn nested handler
 * @returns {R} result value
 */
/**
 * return fn(value === undefined ? {} : value)
 */
const nestedConfig = (value, fn) =>
	value === undefined ? fn(/** @type {T} */ ({})) : fn(value);

/**
 * @template T
 * @param {T|undefined} value value or not
 * @returns {T} result value
 */
/**
 * shallow clone
 */
const cloneObject = value => {
	return /** @type {T} */ ({ ...value });
};

/**
 * @template T
 * @template R
 * @param {T|undefined} value value or not
 * @param {function(T): R} fn nested handler
 * @returns {R|undefined} result value
 */
/**
 * value = undefined  => undefined
 * value != undefined => fn(value)
 */
const optionalNestedConfig = (value, fn) =>
	value === undefined ? undefined : fn(value);

/**
 * @template T
 * @template R
 * @param {T[]|undefined} value array or not
 * @param {function(T[]): R[]} fn nested handler
 * @returns {R[]|undefined} cloned value
 */
const nestedArray = (value, fn) => (Array.isArray(value) ? fn(value) : fn([]));

/**
 * @template T
 * @template R
 * @param {T[]|undefined} value array or not
 * @param {function(T[]): R[]} fn nested handler
 * @returns {R[]|undefined} cloned value
 */
const optionalNestedArray = (value, fn) =>
	Array.isArray(value) ? fn(value) : undefined;

/**
 * @template T
 * @template R
 * @param {Record<string, T>|undefined} value value or not
 * @param {function(T): R} fn nested handler
 * @param {Record<string, function(T): R>=} customKeys custom nested handler for some keys
 * @returns {Record<string, R>} result value
 */
const keyedNestedConfig = (value, fn, customKeys) => {
	const result =
		value === undefined
			? {}
			: Object.keys(value).reduce(
					(obj, key) => (
						(obj[key] = (
							customKeys && key in customKeys ? customKeys[key] : fn
						)(value[key])),
						obj
					),
					/** @type {Record<string, R>} */ ({})
			  );
	if (customKeys) {
		for (const key of Object.keys(customKeys)) {
			if (!(key in result)) {
				result[key] = customKeys[key](/** @type {T} */ ({}));
			}
		}
	}
	return result;
};

/**
 * @param {WebpackOptions} config input config
 * @returns {WebpackOptionsNormalized} normalized options
 */
const getNormalizedWebpackOptions = config => {
	return {
		amd: config.amd,
		bail: config.bail,
		/**
		 * cache: {
		 *   type: 'xxx',
		 *   ...options
		 * }
		 */
		cache: optionalNestedConfig(config.cache, cache => {
			/**
			 * cache: false
			 */
			if (cache === false) return false;
			/**
			 * cache: true
			 * => cache: { type: 'memory', maxGenerations: undefined }
			 */
			if (cache === true) {
				return {
					type: "memory",
					maxGenerations: undefined
				};
			}
			switch (cache.type) {
				/**
				 * cache: { type: 'filesystem' }
				 */
				case "filesystem":
					return {
						type: "filesystem",
						allowCollectingMemory: cache.allowCollectingMemory,
						maxMemoryGenerations: cache.maxMemoryGenerations,
						maxAge: cache.maxAge,
						profile: cache.profile,
						buildDependencies: cloneObject(cache.buildDependencies),
						cacheDirectory: cache.cacheDirectory,
						cacheLocation: cache.cacheLocation,
						hashAlgorithm: cache.hashAlgorithm,
						compression: cache.compression,
						idleTimeout: cache.idleTimeout,
						idleTimeoutForInitialStore: cache.idleTimeoutForInitialStore,
						idleTimeoutAfterLargeChanges: cache.idleTimeoutAfterLargeChanges,
						name: cache.name,
						store: cache.store,
						version: cache.version
					};
				case undefined:
				/**
				 * cache: { type: 'memory' }
				 * 
				 */
				case "memory":
					return {
						type: "memory",
						maxGenerations: cache.maxGenerations
					};
				default:
					// @ts-expect-error Property 'type' does not exist on type 'never'. ts(2339)
					throw new Error(`Not implemented cache.type ${cache.type}`);
			}
		}),
		context: config.context,
		dependencies: config.dependencies,
		devServer: optionalNestedConfig(config.devServer, devServer => ({
			...devServer
		})),
		devtool: config.devtool,
		/**
		 * entry: {
		 *   main: {
		 *     import : ['xxx']
		 *   },
		 *   ...entry points
		 * }
		 */
		entry:
			config.entry === undefined
				/**
				 * entry = undefined
				 * => entry = { main: {} }
				 */
				? { main: {} }
				: typeof config.entry === "function"
				? (
						fn => () =>
							Promise.resolve().then(fn).then(getNormalizedEntryStatic)
				  )(config.entry)
				: getNormalizedEntryStatic(config.entry),
		/**
		 * experiments: {
		 *   buildHttp
		 *   lazyCompilation
		 *   css
		 * }
		 */
		experiments: nestedConfig(config.experiments, experiments => ({
			...experiments,
			buildHttp: optionalNestedConfig(experiments.buildHttp, options =>
				Array.isArray(options) ? { allowedUris: options } : options
			),
			lazyCompilation: optionalNestedConfig(
				experiments.lazyCompilation,
				options => (options === true ? {} : options)
			),
			css: optionalNestedConfig(experiments.css, options =>
				options === true ? {} : options
			)
		})),
		externals: config.externals,
		externalsPresets: cloneObject(config.externalsPresets),
		externalsType: config.externalsType,
		ignoreWarnings: config.ignoreWarnings
			? config.ignoreWarnings.map(ignore => {
					if (typeof ignore === "function") return ignore;
					const i = ignore instanceof RegExp ? { message: ignore } : ignore;
					return (warning, { requestShortener }) => {
						if (!i.message && !i.module && !i.file) return false;
						if (i.message && !i.message.test(warning.message)) {
							return false;
						}
						if (
							i.module &&
							(!warning.module ||
								!i.module.test(
									warning.module.readableIdentifier(requestShortener)
								))
						) {
							return false;
						}
						if (i.file && (!warning.file || !i.file.test(warning.file))) {
							return false;
						}
						return true;
					};
			  })
			: undefined,
		/**
		 * infrastructureLogging: {}
		 */
		infrastructureLogging: cloneObject(config.infrastructureLogging),
		loader: cloneObject(config.loader),
		mode: config.mode,
		/**
		 * module: {
		 *   noParse
		 *   unsafeCache
		 *   parser
		 *   generator
		 *   defaultRules
		 *   rules: {
		 *     ...
		 *   }
		 * }
		 */
		module: nestedConfig(config.module, module => ({
			noParse: module.noParse,
			unsafeCache: module.unsafeCache,
			parser: keyedNestedConfig(module.parser, cloneObject, {
				javascript: parserOptions => ({
					unknownContextRequest: module.unknownContextRequest,
					unknownContextRegExp: module.unknownContextRegExp,
					unknownContextRecursive: module.unknownContextRecursive,
					unknownContextCritical: module.unknownContextCritical,
					exprContextRequest: module.exprContextRequest,
					exprContextRegExp: module.exprContextRegExp,
					exprContextRecursive: module.exprContextRecursive,
					exprContextCritical: module.exprContextCritical,
					wrappedContextRegExp: module.wrappedContextRegExp,
					wrappedContextRecursive: module.wrappedContextRecursive,
					wrappedContextCritical: module.wrappedContextCritical,
					// TODO webpack 6 remove
					strictExportPresence: module.strictExportPresence,
					strictThisContextOnImports: module.strictThisContextOnImports,
					...parserOptions
				})
			}),
			generator: cloneObject(module.generator),
			defaultRules: optionalNestedArray(module.defaultRules, r => [...r]),
			rules: nestedArray(module.rules, r => [...r])
		})),
		name: config.name,
		node: nestedConfig(
			config.node,
			node =>
				node && {
					...node
				}
		),
		/**
		 * optimization: {
		 *   runtimeChunk
		 *   splitChunks: {
		 *     ...
		 *     defaultSizeTypes
		 *     cacheGroups
		 *   }
		 *   emitOnErrors
		 * }
		 */
		optimization: nestedConfig(config.optimization, optimization => {
			return {
				...optimization,
				runtimeChunk: getNormalizedOptimizationRuntimeChunk(
					optimization.runtimeChunk
				),
				splitChunks: nestedConfig(
					optimization.splitChunks,
					splitChunks =>
						splitChunks && {
							...splitChunks,
							defaultSizeTypes: splitChunks.defaultSizeTypes
								? [...splitChunks.defaultSizeTypes]
								: ["..."],
							cacheGroups: cloneObject(splitChunks.cacheGroups)
						}
				),
				emitOnErrors:
					optimization.noEmitOnErrors !== undefined
						? handledDeprecatedNoEmitOnErrors(
								optimization.noEmitOnErrors,
								optimization.emitOnErrors
						  )
						: optimization.emitOnErrors
			};
		}),
		/**
		 * output: {
		 *   filename: '[name]-[hash].js'
		 *   path: path.resolve(__dirname, 'dist')
		 * 	 library: {
		 *     type: 'umd',
		 *     auxiliaryComment
		 *     export
		 *     name
		 *     umdNamedDefine
		 *   }
		 * }
		 */
		output: nestedConfig(config.output, output => {
			const { library } = output;
			const libraryAsName = /** @type {LibraryName} */ (library);
			/**
			 * libraryBase = undefined
			 * libraryBase = { type: 'umd' }
			 * libraryBase = { name: 'name' }
			 */
			const libraryBase =
				typeof library === "object" &&
				library &&
				!Array.isArray(library) &&
				"type" in library
					// { type: 'umd' }
					? library
					: libraryAsName || output.libraryTarget
					/**
					 * { library: 'name', libraryTarget: 'xxx' }
					 * => { name: 'name' }
					 */
					? /** @type {LibraryOptions} */ ({
							name: libraryAsName
					  })
					: undefined;
			/** @type {OutputNormalized} */
			const result = {
				assetModuleFilename: output.assetModuleFilename,
				asyncChunks: output.asyncChunks,
				charset: output.charset,
				chunkFilename: output.chunkFilename,
				chunkFormat: output.chunkFormat,
				chunkLoading: output.chunkLoading,
				chunkLoadingGlobal: output.chunkLoadingGlobal,
				chunkLoadTimeout: output.chunkLoadTimeout,
				cssFilename: output.cssFilename,
				cssChunkFilename: output.cssChunkFilename,
				clean: output.clean,
				compareBeforeEmit: output.compareBeforeEmit,
				crossOriginLoading: output.crossOriginLoading,
				devtoolFallbackModuleFilenameTemplate:
					output.devtoolFallbackModuleFilenameTemplate,
				devtoolModuleFilenameTemplate: output.devtoolModuleFilenameTemplate,
				devtoolNamespace: output.devtoolNamespace,
				environment: cloneObject(output.environment),
				enabledChunkLoadingTypes: output.enabledChunkLoadingTypes
					? [...output.enabledChunkLoadingTypes]
					: ["..."],
				enabledLibraryTypes: output.enabledLibraryTypes
					? [...output.enabledLibraryTypes]
					: ["..."],
				enabledWasmLoadingTypes: output.enabledWasmLoadingTypes
					? [...output.enabledWasmLoadingTypes]
					: ["..."],
				/**
				 * filename = '[name]-[hash].js'
				 */
				filename: output.filename,
				globalObject: output.globalObject,
				hashDigest: output.hashDigest,
				hashDigestLength: output.hashDigestLength,
				hashFunction: output.hashFunction,
				hashSalt: output.hashSalt,
				hotUpdateChunkFilename: output.hotUpdateChunkFilename,
				hotUpdateGlobal: output.hotUpdateGlobal,
				hotUpdateMainFilename: output.hotUpdateMainFilename,
				iife: output.iife,
				importFunctionName: output.importFunctionName,
				importMetaName: output.importMetaName,
				scriptType: output.scriptType,
				/**
				 * library: {
				 *   type: 'umd',
				 *   auxiliaryComment
				 *   export
				 *   name
				 *   umdNamedDefine
				 * }
				 */
				library: libraryBase && {
					type:
						output.libraryTarget !== undefined
							? output.libraryTarget // { libraryTarget: 'umd' }
							: libraryBase.type, // { type: 'umd' }
					auxiliaryComment:
						output.auxiliaryComment !== undefined
							? output.auxiliaryComment
							: libraryBase.auxiliaryComment,
					export:
						output.libraryExport !== undefined
							? output.libraryExport
							: libraryBase.export,
					name: libraryBase.name,
					umdNamedDefine:
						output.umdNamedDefine !== undefined
							? output.umdNamedDefine
							: libraryBase.umdNamedDefine
				},
				module: output.module,
				/**
				 * path = path.resolve(__dirname, 'dist')
				 */
				path: output.path,
				pathinfo: output.pathinfo,
				publicPath: output.publicPath,
				sourceMapFilename: output.sourceMapFilename,
				sourcePrefix: output.sourcePrefix,
				strictModuleExceptionHandling: output.strictModuleExceptionHandling,
				trustedTypes: optionalNestedConfig(
					output.trustedTypes,
					trustedTypes => {
						if (trustedTypes === true) return {};
						if (typeof trustedTypes === "string")
							return { policyName: trustedTypes };
						return { ...trustedTypes };
					}
				),
				uniqueName: output.uniqueName,
				wasmLoading: output.wasmLoading,
				webassemblyModuleFilename: output.webassemblyModuleFilename,
				workerChunkLoading: output.workerChunkLoading,
				workerWasmLoading: output.workerWasmLoading
			};
			return result;
		}),
		parallelism: config.parallelism,
		performance: optionalNestedConfig(config.performance, performance => {
			if (performance === false) return false;
			return {
				...performance
			};
		}),
		/**
		 * plugins: [
		 *   ...plugins
		 * ]
		 */
		plugins: nestedArray(config.plugins, p => [...p]),
		profile: config.profile,
		recordsInputPath:
			config.recordsInputPath !== undefined
				? config.recordsInputPath
				: config.recordsPath,
		recordsOutputPath:
			config.recordsOutputPath !== undefined
				? config.recordsOutputPath
				: config.recordsPath,
		resolve: nestedConfig(config.resolve, resolve => ({
			...resolve,
			byDependency: keyedNestedConfig(resolve.byDependency, cloneObject)
		})),
		resolveLoader: cloneObject(config.resolveLoader),
		snapshot: nestedConfig(config.snapshot, snapshot => ({
			resolveBuildDependencies: optionalNestedConfig(
				snapshot.resolveBuildDependencies,
				resolveBuildDependencies => ({
					timestamp: resolveBuildDependencies.timestamp,
					hash: resolveBuildDependencies.hash
				})
			),
			buildDependencies: optionalNestedConfig(
				snapshot.buildDependencies,
				buildDependencies => ({
					timestamp: buildDependencies.timestamp,
					hash: buildDependencies.hash
				})
			),
			resolve: optionalNestedConfig(snapshot.resolve, resolve => ({
				timestamp: resolve.timestamp,
				hash: resolve.hash
			})),
			module: optionalNestedConfig(snapshot.module, module => ({
				timestamp: module.timestamp,
				hash: module.hash
			})),
			immutablePaths: optionalNestedArray(snapshot.immutablePaths, p => [...p]),
			managedPaths: optionalNestedArray(snapshot.managedPaths, p => [...p])
		})),
		stats: nestedConfig(config.stats, stats => {
			if (stats === false) {
				return {
					preset: "none"
				};
			}
			if (stats === true) {
				return {
					preset: "normal"
				};
			}
			if (typeof stats === "string") {
				return {
					preset: stats
				};
			}
			return {
				...stats
			};
		}),
		target: config.target,
		watch: config.watch,
		watchOptions: cloneObject(config.watchOptions)
	};
};

/**
 * @param {EntryStatic} entry static entry options
 * @returns {EntryStaticNormalized} normalized static entry options
 */
const getNormalizedEntryStatic = entry => {
	/**
	 * entry = 'src/index.js'
	 * => { main: { import: ['src/index.js'] } }
	 */
	if (typeof entry === "string") {
		return {
			main: {
				import: [entry]
			}
		};
	}
	/**
	 * entry = ['index.js', 'path.js']
	 * =>
	 * entry: {
	 *   main: {
	 *     import: ['index.js', 'path.js']
	 *   }
	 * }
	 */
	if (Array.isArray(entry)) {
		return {
			main: {
				import: entry
			}
		};
	}
	/**
	 * entry = { main, vender }
	 */
	/** @type {EntryStaticNormalized} */
	const result = {};
	for (const key of Object.keys(entry)) {
		const value = entry[key];
		if (typeof value === "string") {
			/**
			 * entry = {
			 *   main: {
			 *     import: ['xxx']
			 *   }
			 * }
			 */
			result[key] = {
				import: [value]
			};
		} else if (Array.isArray(value)) {
			result[key] = {
				import: value
			};
		} else {
			result[key] = {
				import:
					value.import &&
					(Array.isArray(value.import) ? value.import : [value.import]),
				filename: value.filename,
				layer: value.layer,
				runtime: value.runtime,
				baseUri: value.baseUri,
				publicPath: value.publicPath,
				chunkLoading: value.chunkLoading,
				asyncChunks: value.asyncChunks,
				wasmLoading: value.wasmLoading,
				dependOn:
					value.dependOn &&
					(Array.isArray(value.dependOn) ? value.dependOn : [value.dependOn]),
				library: value.library
			};
		}
	}
	return result;
};

/**
 * @param {OptimizationRuntimeChunk=} runtimeChunk runtimeChunk option
 * @returns {OptimizationRuntimeChunkNormalized=} normalized runtimeChunk option
 */
const getNormalizedOptimizationRuntimeChunk = runtimeChunk => {
	if (runtimeChunk === undefined) return undefined;
	if (runtimeChunk === false) return false;
	if (runtimeChunk === "single") {
		return {
			name: () => "runtime"
		};
	}
	if (runtimeChunk === true || runtimeChunk === "multiple") {
		return {
			name: entrypoint => `runtime~${entrypoint.name}`
		};
	}
	const { name } = runtimeChunk;
	return {
		name: typeof name === "function" ? name : () => name
	};
};

exports.getNormalizedWebpackOptions = getNormalizedWebpackOptions;
