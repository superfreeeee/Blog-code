# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.17

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Disable VCS-based implicit rules.
% : %,v


# Disable VCS-based implicit rules.
% : RCS/%


# Disable VCS-based implicit rules.
% : RCS/%,v


# Disable VCS-based implicit rules.
% : SCCS/s.%


# Disable VCS-based implicit rules.
% : s.%


.SUFFIXES: .hpux_make_needs_suffix_list


# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /Applications/CLion.app/Contents/bin/cmake/mac/bin/cmake

# The command to remove a file.
RM = /Applications/CLion.app/Contents/bin/cmake/mac/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug

# Include any dependencies generated for this target.
include CMakeFiles/cpp_typedef.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/cpp_typedef.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/cpp_typedef.dir/flags.make

CMakeFiles/cpp_typedef.dir/main.cpp.o: CMakeFiles/cpp_typedef.dir/flags.make
CMakeFiles/cpp_typedef.dir/main.cpp.o: ../main.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/cpp_typedef.dir/main.cpp.o"
	/Library/Developer/CommandLineTools/usr/bin/c++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/cpp_typedef.dir/main.cpp.o -c /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/main.cpp

CMakeFiles/cpp_typedef.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/cpp_typedef.dir/main.cpp.i"
	/Library/Developer/CommandLineTools/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/main.cpp > CMakeFiles/cpp_typedef.dir/main.cpp.i

CMakeFiles/cpp_typedef.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/cpp_typedef.dir/main.cpp.s"
	/Library/Developer/CommandLineTools/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/main.cpp -o CMakeFiles/cpp_typedef.dir/main.cpp.s

# Object files for target cpp_typedef
cpp_typedef_OBJECTS = \
"CMakeFiles/cpp_typedef.dir/main.cpp.o"

# External object files for target cpp_typedef
cpp_typedef_EXTERNAL_OBJECTS =

cpp_typedef: CMakeFiles/cpp_typedef.dir/main.cpp.o
cpp_typedef: CMakeFiles/cpp_typedef.dir/build.make
cpp_typedef: CMakeFiles/cpp_typedef.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable cpp_typedef"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/cpp_typedef.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/cpp_typedef.dir/build: cpp_typedef

.PHONY : CMakeFiles/cpp_typedef.dir/build

CMakeFiles/cpp_typedef.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/cpp_typedef.dir/cmake_clean.cmake
.PHONY : CMakeFiles/cpp_typedef.dir/clean

CMakeFiles/cpp_typedef.dir/depend:
	cd /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug /Users/superfree/Desktop/Blog/code/back_end/cpp/cpp_typedef/cmake-build-debug/CMakeFiles/cpp_typedef.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/cpp_typedef.dir/depend

