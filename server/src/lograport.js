const fs = require('node:fs');

async function RecordLog() {
    try {
      const content = 'Some content!';
      await fs.writeFile('@/log/log.txt', content);
    } catch (err) {
      console.log(err);
    }
}