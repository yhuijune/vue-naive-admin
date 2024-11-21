// https://github.com/arco-design/color

/** 创建简单的模块声明 */
// declare module '@arco-design/color'

interface Options {
  index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  list: boolean
  dark: boolean
  format: 'hex' | 'rgb' | 'hsl'
}

declare module '@arco-design/color' {
  export function generate(color: string, options: Partial<Options>): Array<string>
  export function getRgbStr(color: string): string
  export function getPresetColors(): Array<'string', object>
}
