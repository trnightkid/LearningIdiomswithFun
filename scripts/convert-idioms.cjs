const fs = require('fs');

const sourceData = JSON.parse(fs.readFileSync('./chinese-xinhua-idiom.json', 'utf8'));

const categories = ['寓言', '品德', '景色', '数字', '学习', '动作', '情感', '哲理', '历史', '动物', '状态', '自然', '人物', '生活', '其他'];
const levelList = ['easy', 'medium', 'hard'];

const idioms = sourceData.map((item, index) => ({
  word: item.word || '',
  pinyin: item.pinyin || '',
  level: levelList[index % 3],
  category: categories[index % categories.length],
  definition: item.explanation || '',
  story: item.derivation || item.explanation || '',
  source: item.derivation || '',
  example: item.example || '',
  similar: '',
  opposite: '',
  memoryTip: '',
}));

const tsContent = `// 成语数据库 - 共${idioms.length}条 (数据来源: chinese-xinhua)
export interface Idiom {
  word: string;
  pinyin: string;
  level: 'easy' | 'medium' | 'hard';
  category: string;
  definition: string;
  story: string;
  source: string;
  example: string;
  similar: string;
  opposite: string;
  memoryTip?: string;
}

const rawData = ${JSON.stringify(idioms, null, 2)};

export const idioms: Idiom[] = rawData.map((item: any) => ({
  word: item.word,
  pinyin: item.pinyin,
  level: item.level as 'easy' | 'medium' | 'hard',
  category: item.category,
  definition: item.definition.replace(/'/g, "\\'").replace(/"/g, '\\"'),
  story: item.story.replace(/'/g, "\\'").replace(/"/g, '\\"'),
  source: item.source.replace(/'/g, "\\'").replace(/"/g, '\\"'),
  example: item.example.replace(/'/g, "\\'").replace(/"/g, '\\"'),
  similar: item.similar,
  opposite: item.opposite,
  memoryTip: item.memoryTip || '',
}));
`;

fs.writeFileSync('./src/data/idioms.ts', tsContent);
console.log(`生成完成: ${idioms.length} 条成语`);