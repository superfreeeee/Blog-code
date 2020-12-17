CC = gcc

MAINSRC = main.c
MAINC = main_pre.c
MAINS = main.s
MAINO = main.o
BIN = main
OBJC = $(MAINC) $(MAINS) $(MAINO) $(BIN)

.PHONY: all clean

all: $(MAINC) $(MAINS) $(MAINO) $(BIN)

clean:
	rm $(OBJC)

$(MAINC): $(MAINSRC)
	$(CC) -E $< -o $@

$(MAINS): $(MAINSRC)
	$(CC) -S $< -o $@

$(MAINO): $(MAINSRC)
	$(CC) -c $< -o $@

$(BIN): $(MAINO)
	$(CC) $< -o $@
	./$@