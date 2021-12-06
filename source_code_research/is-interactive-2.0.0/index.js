/**
 * 检查当前是否处于非 CI 模式下的命令行
 * @param {*} param0
 * @returns
 */
// ? Read
export default function isInteractive({ stream = process.stdout } = {}) {
	// stream
	// stream.isTTY
	// process.env.TERM !== dumb
	// !process.env.CI
	return Boolean(
		stream &&
			stream.isTTY &&
			process.env.TERM !== "dumb" &&
			!("CI" in process.env)
	);
}
