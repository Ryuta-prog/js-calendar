const WIDTH = 20;
    const WEEK_HEADER = '日 月 火 水 木 金 土';

    function centerText(text, width) {
    const len = [...text].length;
    const pad = Math.max(0, Math.floor((width - len) / 2));
    return ' '.repeat(pad) + text;
}

function getDaysInMonth(year, month) {
return new Date(year, month, 0).getDate();
}

function formatCalendar(year, month) {
const header = `${month}月 ${year}`;
const headerLine = centerText(header, WIDTH);
  const firstDow = new Date(year, month - 1, 1).getDay(); // 0=日..6=土
const dim = getDaysInMonth(year, month);

const lines = [];
  let line = ' '.repeat(firstDow * 3);

for (let d = 1; d <= dim; d++) {
    const cell = String(d).padStart(2, ' ');
    const dow = (firstDow + d - 1) % 7;
    line += cell;
    if (dow === 6) {
        lines.push(line);
        line = '';
    } else {
        line += ' ';
    }
}

if (line.trim().length > 0) lines.push(line);
return [headerLine, WEEK_HEADER, ...lines].join('\n');
}

function parseArgs(argv) {
if (argv.length === 0) {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
}
if (argv.length === 2 && argv[0] === '-m') {
    const month = Number(argv[1]);
    if (Number.isInteger(month) && month >= 1 && month <= 12) {
        const now = new Date();
        return { year: now.getFullYear(), month };
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
const out = formatCalendar(parsed.year, parsed.month);
console.log(out);
})();

