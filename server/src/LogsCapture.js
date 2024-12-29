const fs = require('node:fs');
const dt = require('./DateTime');

class LogsCapture {
  constructor() {
    this.path = '@/log/log.txt'; //Ścieżka do pliku log

    this.fs = fs;
    this.dt = dt;
  }

  async SaveLog(prefix, sufix, description) {
    const date = this.dt.GetDate();
    const time = this.dt.GetTime();

    const content = date + '_' + time + '___' + prefix + '_' + sufix + '___: ' + description;
    await this.fs.writeFile(this.path, content);
  }

  async CaptureError(sufix ,error) {
    await this.SaveLog('ERROR', sufix, error);
  }

  async CaptureWarning(sufix ,error) {
    await this.SaveLog('WARNING', sufix, error);
  }
}

module.exports = new LogsCapture();