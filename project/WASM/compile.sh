#!/bin/bash
# Exit on error
set -e

# Check that the correct number of parameters is given
if (($# != 1)); then
  echo -e "Error: Wrong number of arguments\nSyntax: $0 <file_to_compile>"
  exit 1
fi

TARGET=$1 # Get target file to compile
# Check that target file exists
if test ! -f "$TARGET.c"; then
  echo "$TARGET does not exist!"
  exit 1
fi

# Compile WASM
emcc -o $TARGET.html $TARGET.c -O3 -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']"
#emcc $TARGET.c -o $TARGET.js -s "EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']"
