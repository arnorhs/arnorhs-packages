// from https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
export const colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
}
// from https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html

export const moreColors = {
  eight: {
    Black: '\u001b[30m',
    Red: '\u001b[31m',
    Green: '\u001b[32m',
    Yellow: '\u001b[33m',
    Blue: '\u001b[34m',
    Magenta: '\u001b[35m',
    Cyan: '\u001b[36m',
    White: '\u001b[37m',
    Reset: '\u001b[0m',
  },
  sixteen: {
    BrightBlack: '\u001b[30;1m',
    BrightRed: '\u001b[31;1m',
    BrightGreen: '\u001b[32;1m',
    BrightYellow: '\u001b[33;1m',
    BrightBlue: '\u001b[34;1m',
    BrightMagenta: '\u001b[35;1m',
    BrightCyan: '\u001b[36;1m',
    BrightWhite: '\u001b[37;1m',
    Reset: '\u001b[0m',
  },
  bg: {
    normal: {
      BackgroundBlack: '\u001b[40m',
      BackgroundRed: '\u001b[41m',
      BackgroundGreen: '\u001b[42m',
      BackgroundYellow: '\u001b[43m',
      BackgroundBlue: '\u001b[44m',
      BackgroundMagenta: '\u001b[45m',
      BackgroundCyan: '\u001b[46m',
      BackgroundWhite: '\u001b[47m',
    },
    bright: {
      BackgroundBrightBlack: '\u001b[40;1m',
      BackgroundBrightRed: '\u001b[41;1m',
      BackgroundBrightGreen: '\u001b[42;1m',
      BackgroundBrightYellow: '\u001b[43;1m',
      BackgroundBrightBlue: '\u001b[44;1m',
      BackgroundBrightMagenta: '\u001b[45;1m',
      BackgroundBrightCyan: '\u001b[46;1m',
      BackgroundBrightWhite: '\u001b[47;1m',
    },
  },
}

export const makeColorScheme = (list: string[]) =>
  list.map((c) => (str: string) => `${c}${str}${colors.Reset}`)
