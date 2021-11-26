const createReadableStreamSource = () => ({
  start(controller) {
    controller.enqueue('H');
    controller.enqueue('e');
    controller.enqueue('l');
    controller.enqueue('l');
    controller.enqueue('o');
    controller.enqueue(' ');
    controller.enqueue('W');
    controller.enqueue('o');
    controller.enqueue('r');
    controller.enqueue('l');
    controller.enqueue('d');
    controller.close();
  },
});

const createWritableStreamSource = (prefix) => ({
  write: (chunk) =>
    new Promise((resolve, reject) => {
      console.log(`[${prefix}] chunk =`, chunk);
      resolve();
    }),
  close() {},
});

// =============== task ===============
// 1.
const testReadableStreamCreate = async () => {
  const readableStream = new ReadableStream(createReadableStreamSource());

  const reader = readableStream.getReader();
  let result;
  result = await reader.read();
  console.log(`[testReadableStreamCreate] result =`, result);
  result = await reader.read();
  console.log(`[testReadableStreamCreate] result =`, result);
};

// 2.
const testWritableStreamCreate = async () => {
  const writableStream = new WritableStream(
    createWritableStreamSource('testWritableStreamCreate')
  );

  const writer = writableStream.getWriter();
  await writer.write('Hello');
  await writer.write(' ');
  await writer.write('World');
};

// 3.
const testPipeTo = async () => {
  const readableStream = new ReadableStream(createReadableStreamSource());
  const writableStream = new WritableStream(
    createWritableStreamSource('testPipeTo')
  );
  await readableStream.pipeTo(writableStream);
};

// 4.
const testCustomPipeTo = async () => {
  const reader = new ReadableStream(createReadableStreamSource()).getReader();
  const writer = new WritableStream(
    createWritableStreamSource('testCustomPipeTo')
  ).getWriter();

  const tryRead = async () => {
    const { done, value } = await reader.read();
    if (done) {
      return;
    }
    await writer.ready;
    writer.write(value);

    await tryRead();
  };
  await tryRead();
};

// 5.
const testTransformStream = async () => {
  const decoder = new TextDecoder();
  const transformStream = new TransformStream({
    transform: (chunk, controller) => {
      controller.enqueue(decoder.decode(chunk, { stream: true }));
    },
  });

  const readableStream = new ReadableStream(createReadableStreamSource());
  const writableStream = new WritableStream(
    createWritableStreamSource('testTransformStream')
  );
  await readableStream
    .pipeThrough(new TextEncoderStream())
    .pipeThrough(transformStream)
    .pipeTo(writableStream);
};

// 6.
const testTransformStreamCustom = async () => {
  const readableStream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const chunks = encoder.encode('Hello World', { stream: true });
      chunks.forEach((chunk) => controller.enqueue(chunk));
      controller.close();
    },
  });
  const writableStream = new WritableStream({
    write(chunk) {
      const decoder = new TextDecoder();
      return new Promise((resolve, reject) => {
        const buffer = new ArrayBuffer(2);
        const view = new Uint16Array(buffer);
        view[0] = chunk;
        console.log(`decode = ${decoder.decode(view, { stream: true })}`);

        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
    close() {
      console.log('writableStream in testTransformStreamCustom closed');
    },
  });

  await readableStream.pipeTo(writableStream);
};

// =============== test ===============
const testGroup = async (task) => {
  console.group(task.name);
  await task();
  console.groupEnd();
};

const test = async () => {
  await testGroup(testReadableStreamCreate);
  await testGroup(testWritableStreamCreate);
  await testGroup(testPipeTo);
  await testGroup(testCustomPipeTo);
  await testGroup(testTransformStream);
  await testGroup(testTransformStreamCustom);
};

test();
