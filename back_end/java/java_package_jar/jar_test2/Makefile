SOURCES = $(wildcard src/*/*/*.java)
JAR = jar_test2.jar
CONFIG = MANIFEST.MF
PARAMS = 1 2 3 4

.PHONY : init clean build

build : clean
	mkdir target
	javac -d target $(SOURCES)
	jar cvfm $(JAR) $(CONFIG) -C target/ .

clean :
	rm -rf target $(JAR)

run :
	java -jar $(JAR) $(PARAMS)
