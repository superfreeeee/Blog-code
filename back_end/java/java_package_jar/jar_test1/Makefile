SOURCES := $(wildcard *.java)
CLASSES := $(patsubst %.java, %.class, $(SOURCES))
TARGET := jar_test1.jar

.PHONY : init clean run1 run2

init : clean
	javac -d . $(SOURCES)
	jar cvf $(TARGET) $(CLASSES)

run1 :
	java -jar jar_test1.jar

run2 :
	java -cp jar_test1.jar Main

clean :
	rm -f $(CLASSES) $(TARGET)

show :
	@echo $(SOURCES)
	@echo $(CLASSES)
	@echo $(TARGET)