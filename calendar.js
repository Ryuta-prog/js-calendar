const WIDTH = 20;
const WEEK_HEADER = '日 月 火 水 木 金 土';

function centerText(text, width) {
  const len = [...text].length;
  const left = Math.max(0, Math.floor((width - len) / 2));
  return text.padStart(left + len);
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function printCalendar(year, month) {
  const header = `${month}月 ${year}`;
  console.log(centerText(header, WIDTH));
  console.log(WEEK_HEADER);

  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=日..6=土
  const lastDate = getDaysInMonth(year, month);

  let line = ' '.repeat(firstDay * 3);
  for (let d = 1; d <= lastDate; d++) {
    const cell = String(d).padStart(2, ' ');
    const dow = (firstDay + d - 1) % 7;
    line += cell;
    if (dow === 6) {
      console.log(line);
      line = '';
    } else {
      line += ' ';
    }
  }
  if (line.trim().length > 0) console.log(line);
}

function parseArgs(argv) {
  if (argv.length === 0) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  if (argv.length === 2 && argv[0] === '-m') {
    const m = Number(argv[1]);
    if (Number.isInteger(m) && m >= 1 && m <= 12) {
      const now = new Date();
      return { year: now.getFullYear(), month: m };
    }
    return { error: 'Error: -m の引数は 1〜12 の整数です。' };
  }
  return { error: 'Usage: node calendar.js [-m 1-12]' };
}

(function main() {
  const args = process.argv.slice(2);
  const parsed = parseArgs(args);
  if (parsed.error) {
    console.error(parsed.error);
    process.exit(1);
  }
  printCalendar(parsed.year, parsed.month);
})();
