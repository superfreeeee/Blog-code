OBJC = color.c day.c
TARGET = color day

.PHONY : init clean

init : $(TARGET)

clean :
	rm (TARGET)

# files
color : color.c
	gcc $< -o $@

day : day.c
	gcc $< -o $@