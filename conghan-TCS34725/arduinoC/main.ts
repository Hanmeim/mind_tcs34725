enum pins{
//%
}
}
//% color="#11A712" iconWidth=50 iconHeight=40
namespace keypad4x4  {
    //% block="初始化颜色传感器 LED：[LEDPIN]"  blocktype="command"
    //% LEDPIN.shadow="dropdown" LEDPIN.options="PIN_DigitalWrite"
     export function TCS_init(parameter: any, block: any) {
        let led = parameter.LEDPIN.code
        Generator.addInclude(`TCSinit`, `#include <Adafruit_TCS34725.h>`);
        Generator.addInclude(`Wire`, `#include <Wire.h>`);
        Generator.addInclude(`ledpin`, `#define ledpin ${led}`);
        Generator.addInclude(`gammatable`, `byte gammatable[256];`);
        Generator.addObject(`myTCS`, `Adafruit_TCS34725 tcs`, `= Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_50MS, TCS34725_GAIN_4X);`);
        Generator.addSetup(`TCS_begin`, `if(tcs.begin()) digitalWrite(ledpin,HIGH);`);
        Generator.addSetup(`gammatable_setup`, `for(int i = 0; i < 256; i ++){
    float x = i;
    x /= 255;
    x = pow(x,2.5);
    x *= 255;
    gammatable[i] = x;}`);
    }
    //% block="读取颜色" blockType="command"
    export function TCS_read(parameter: any, block: any) {
        Generator.addCode(`uint16_t red,green,blue,sum;
  tcs.getRawData(&red, &green, &blue, &sum);
  uint32_t s = sum;
  float r,g,b;
  r = red; r /= s; r *= 256;
  g = green; g /= s; g *= 256;
  b = blue; b /= s; b *= 256;`);

    }
    //% block="红色值" blockType="reporter"
    export function TCS_red(parameter: any, block: any) {
        Generator.addCode([`gammatable[(int)r]`, Generator.ORDER_UNARY_POSTFIX]);
    }
    //% block="绿色值" blockType="reporter"
    export function TCS_green(parameter: any, block: any) {
        Generator.addCode([`gammatable[(int)g]`, Generator.ORDER_UNARY_POSTFIX]);
    }
    //% block="蓝色值" blockType="reporter"
    export function TCS_blue(parameter: any, block: any) {
        Generator.addCode([`gammatable[(int)b]`, Generator.ORDER_UNARY_POSTFIX]);
    }


}
