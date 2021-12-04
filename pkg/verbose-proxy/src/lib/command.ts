import yargs from 'yargs'

export const command = () => {
  return yargs(process.argv.slice(2))
    .usage('Usage: verbose-proxy [options]')
    .example('verbose-proxy --port=8901', 'Start verbose-proxy on port 8901')
    .option('target', {
      description: 'proxy target',
      default: 'dummy',
      type: 'string',
    })
    .option('port', {
      description: 'which port to listen to',
      default: '8889',
      type: 'number',
    })
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2021').argv
}
