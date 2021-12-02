import * as manualRustModule from './manual/pkg/rust_wasm';
import * as packTemplateModule from './pack_template/pkg';

// console.log('manulaRustModule', manualRustModule);

// manualRustModule.default().then(() => {
//   manualRustModule.greet('superfree');
// });

console.log('packTemplateModule', packTemplateModule);

packTemplateModule.greet('superfree');
