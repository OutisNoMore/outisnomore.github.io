#include <stdio.h>
#include <emscripten/emscripten.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN EMSCRIPTEN_KEEPALIVE int fibo(int index){
  if(index == 0 || index == 1){
    return index;
  }
  int a = 0;
  int b = 1;
  while(index > 1){
    b = a + b;
    a = b - a;
    index--;
  }
  return b;
}
