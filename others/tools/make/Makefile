.PHONY: build clean

# 伪目标
build: main

clean:
	rm main.c main

# 目标文件
main: main.c
	gcc main.c -o main

# 源文件
main.c:
	echo "int main() {}" > main.c