import { useState } from 'react';
import './styles/global.css';
import { idioms } from './data/idioms';
import { useStore } from './store';

const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = {
    book: '📖', check: '✅', quiz: '🎯', star: '⭐', home: '🏠',
    search: '🔍', heart: '❤️', fire: '🔥', trophy: '🏆', calendar: '📅',
    star2: '🌟', back: '←', close: '✕', checkCircle: '✓', book2: '📚',
    light: '💡', forward: '→',
  };
  return <span>{icons[name] || '•'}</span>;
};

function HomePage() {
  const { currentStreak, checkIn } = useStore();
  const [today] = useState(() => new Date().toISOString().split('T')[0]);
  const { records } = useStore();
  const todayRecord = records[today];
  
  const dailyQuote = [
    "每天学3个成语，就能变成成语小天才！🌟",
    "今天也要加油呀！多学一个成语就进步一点点 🚀",
    "成语学好后写作文更厉害，同学都会佩服你！✨",
    "坚持每天学，成语达人就是你！💪",
    "学的越多懂得越多，你是最棒的小学者！🏆",
    "每天进步一点点，成就感满满！🎉",
    "掌握更多成语，说话都变得更厉害！😎",
    "今天也要加油，成为最闪亮的成语之星！⭐",
  ];
  const quote = dailyQuote[new Date().getDay() % dailyQuote.length];

  return (
    <div className="page">
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '8px' }}>
          成语趣学 · 每日一练
        </div>
        <h1 style={{ fontSize: '28px', color: 'var(--color-primary)', marginBottom: '4px' }}>
          📚 成语趣学
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>{quote}</p>
      </div>

      <div className="card" style={{ 
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #6B9B7A 100%)',
        color: 'white', marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 700 }}>🔥 {currentStreak}</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>连续打卡天数</div>
          </div>
          <div>
            {todayRecord && todayRecord.count >= 3 ? (
              <div className="seal">已打卡</div>
            ) : (
              <button className="btn btn-accent" onClick={checkIn} style={{ background: 'white', color: 'var(--color-accent)' }}>
                今日打卡
              </button>
            )}
          </div>
        </div>
      </div>

      {todayRecord && (
        <div className="card" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontWeight: 600 }}>📊 今日学习进度</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{todayRecord.count}/3 条</span>
          </div>
          <div style={{ background: 'var(--color-bg-deep)', borderRadius: '8px', height: '8px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${Math.min(100, (todayRecord.count / 3) * 100)}%`,
              height: '100%', background: 'var(--color-primary)', borderRadius: '8px', transition: 'width 0.3s',
            }} />
          </div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-light)' }}>
            今日已学习 {todayRecord.count} 条成语 {todayRecord.count >= 3 ? '✅ 达成今日目标' : `还差 ${3 - todayRecord.count} 条`}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="card" onClick={() => {}} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📖</div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>成语词典</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>查阅学习</div>
        </div>
        <div className="card" onClick={() => {}} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>每日一练</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>趣味练习</div>
        </div>
        <div className="card" onClick={() => {}} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📅</div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>打卡日历</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>坚持记录</div>
        </div>
        <div className="card" onClick={() => {}} style={{ cursor: 'pointer', textAlign: 'center' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>学习报告</div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>数据统计</div>
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>💡 今日推荐</div>
        <RandomIdiomCard />
      </div>
    </div>
  );
}

function RandomIdiomCard() {
  const idiom = idioms[Math.floor(Math.random() * idioms.length)];
  const { addStudyRecord } = useStore();
  const handleLearn = () => { addStudyRecord(idiom.word); };
  return (
    <div className="idiom-card" style={{ borderLeftColor: 'var(--color-secondary)', cursor: 'pointer' }} onClick={handleLearn}>
      <div className="idiom-word">{idiom.word}</div>
      <div className="idiom-pinyin">{idiom.pinyin}</div>
      <div className="idiom-definition">{idiom.definition}</div>
      <div className="idiom-meta">
        <span className={`badge badge-${idiom.level === 'easy' ? 'easy' : idiom.level === 'medium' ? 'medium' : 'hard'}`}>
          {idiom.level === 'easy' ? '🟢 简单' : idiom.level === 'medium' ? '🟡 中等' : '🔴 困难'}
        </span>
        <span className="idiom-tag">{idiom.category}</span>
      </div>
    </div>
  );
}

function DictPage({ onSelectIdiom }: { onSelectIdiom: (idiom: typeof idioms[0]) => void }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('全部');
  const [level, setLevel] = useState('all');
  const categories = ['全部', '寓言', '品德', '景色', '学习', '情感', '词语', '哲理', '历史', '动物', '动作', '数字', '状态', '态度', '天气', '时间', '危险', '说话', '人物', '思考', '感受'];
  
  const filtered = idioms.filter(i => {
    const matchSearch = !search || i.word.includes(search) || i.pinyin.includes(search) || i.definition.includes(search);
    const matchCategory = category === '全部' || i.category === category;
    const matchLevel = level === 'all' || i.level === level;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <div className="page">
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '22px', marginBottom: '12px' }}>📖 成语词典</h2>
        <div className="search-box">
          <Icon name="search" />
          <input type="text" placeholder="搜索成语、拼音或释义..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {[['all','全部'],['easy','🟢 简单'],['medium','🟡 中等'],['hard','🔴 困难']].map(([l,label]) => (
            <button key={l} className={`category-tab ${level === l ? 'active' : ''}`} onClick={() => setLevel(l)}>{label}</button>
          ))}
        </div>
        <div className="category-tabs">
          {categories.map(cat => (
            <button key={cat} className={`category-tab ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>{cat}</button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '12px' }}>共 {idioms.length} 条成语（当前显示 {filtered.length} 条）</div>
      {filtered.map((idiom, index) => (
        <div key={index} className="idiom-card" onClick={() => onSelectIdiom(idiom)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div className="idiom-word">{idiom.word}</div>
              <div className="idiom-pinyin">{idiom.pinyin}</div>
            </div>
            <span className={`badge badge-${idiom.level === 'easy' ? 'easy' : idiom.level === 'medium' ? 'medium' : 'hard'}`}>
              {idiom.level === 'easy' ? '简单' : idiom.level === 'medium' ? '中等' : '困难'}
            </span>
          </div>
          <div className="idiom-definition" style={{ marginTop: '8px' }}>{idiom.definition}</div>
          <div className="idiom-meta">
            <span className="idiom-tag">{idiom.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function IdiomDetailPage({ idiom, onBack }: { idiom: typeof idioms[0]; onBack: () => void }) {
  const { toggleFavorite, favorites, addStudyRecord } = useStore();
  const isFav = favorites.includes(idiom.word);
  
  return (
    <div>
      <div className="detail-header">
        <button className="detail-back" onClick={onBack}><Icon name="back" /> 返回</button>
        <div className="detail-word">{idiom.word}</div>
        <div className="detail-pinyin">{idiom.pinyin}</div>
      </div>
      <div className="page">
        <div className="detail-section"><div className="detail-section-title">📝 释义</div><p style={{ fontSize: '15px', lineHeight: 1.8 }}>{idiom.definition}</p></div>
        <div className="detail-section"><div className="detail-section-title">📖 典故</div><p style={{ fontSize: '14px', lineHeight: 1.8 }}>{idiom.story}</p></div>
        <div className="detail-section"><div className="detail-section-title">📚 出处</div><p style={{ fontSize: '14px', color: 'var(--color-secondary)', fontFamily: 'var(--font-title)' }}>{idiom.source}</p></div>
        <div className="detail-section"><div className="detail-section-title">💬 例句</div><p style={{ fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic' }}>"{idiom.example}"</p></div>
        <div className="detail-section">
          <div className="detail-section-title">🔗 相关成语</div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {idiom.similar.split(',').map((s, i) => (
              <span key={i} style={{ padding: '6px 12px', background: 'var(--color-bg-deep)', borderRadius: '20px', fontSize: '13px' }}>近 {s}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
            {idiom.opposite.split(',').map((s, i) => (
              <span key={i} style={{ padding: '6px 12px', background: '#FFF8E0', borderRadius: '20px', fontSize: '13px', color: 'var(--color-accent)' }}>反 {s}</span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => addStudyRecord(idiom.word)}>✅ 已学习</button>
          <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => toggleFavorite(idiom.word)}>{isFav ? '❤️ 已收藏' : '🤍 收藏'}</button>
        </div>
        {idiom.memoryTip && (
          <div className="detail-section" style={{ marginTop: '12px', background: '#FFF8E1' }}>
            <div className="detail-section-title">💡 记忆小技巧</div><p style={{ fontSize: '14px', lineHeight: 1.7 }}>{idiom.memoryTip}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PracticePage({ onBack }: { onBack: () => void }) {
  const [quizzes, setQuizzes] = useState<typeof idioms>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  
  const initQuiz = () => {
    const shuffled = [...idioms].sort(() => Math.random() - 0.5).slice(0, 30);
    setQuizzes(shuffled);
    setCurrent(0); setScore(0); setShowResult(false); setSelected(null);
    generateOptions(shuffled[0]);
  };
  
  const generateOptions = (idiom: typeof idioms[0]) => {
    const wrong = idioms.filter(i => i.word !== idiom.word).sort(() => Math.random() - 0.5).slice(0, 3);
    setOptions([idiom.definition, ...wrong.map(w => w.definition)].sort(() => Math.random() - 0.5));
  };
  
  useState(() => { initQuiz(); });
  useState(() => { if (quizzes.length > 0 && current < quizzes.length) generateOptions(quizzes[current]); });
  
  useState(() => { initQuiz(); });
  
  const handleSelect = (opt: string) => {
    if (showResult) return;
    setSelected(opt); setShowResult(true);
    if (opt === quizzes[current].definition) setScore(s => s + 1);
  };
  
  const handleNext = () => {
    if (current < quizzes.length - 1) {
      setCurrent(c => c + 1); setShowResult(false); setSelected(null);
    }
  };
  
  if (quizzes.length === 0) {
    initQuiz();
    return <div className="page">加载中...</div>;
  }
  
  const currentQuiz = quizzes[current];
  const isCorrect = selected === currentQuiz?.definition;
  
  return (
    <div className="page">
      <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-light)', marginBottom: '16px', cursor: 'pointer', fontSize: '14px' }}>
        <Icon name="back" /> 返回
      </button>
      <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>🎯 每日一练</h2>
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
        {quizzes.map((_, i) => (
          <div key={i} style={{ flex: 1, height: '6px', borderRadius: '3px', background: i <= current ? (i === current && showResult ? (isCorrect ? '#4CAF50' : '#F44336') : 'var(--color-primary)') : 'var(--color-bg-deep)' }} />
        ))}
      </div>
      {currentQuiz && (
        <>
          <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '8px' }}>第 {current + 1} / {quizzes.length} 题</div>
            <div style={{ fontSize: '20px', fontFamily: 'var(--font-title)', fontWeight: 700, marginBottom: '4px' }}>{currentQuiz.word}</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-light)' }}>{currentQuiz.pinyin}</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text)', marginTop: '12px' }}>请选择正确的释义：</div>
          </div>
          {options.map((opt, i) => (
            <div key={i} className={`quiz-option ${selected === opt ? 'selected' : ''} ${showResult && opt === currentQuiz.definition ? 'correct' : ''} ${showResult && selected === opt && opt !== currentQuiz.definition ? 'wrong' : ''}`} onClick={() => handleSelect(opt)}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</span>
                <span style={{ fontSize: '14px', lineHeight: 1.6 }}>{opt}</span>
              </div>
            </div>
          ))}
          {showResult && (
            <div className={`card ${isCorrect ? '' : ''}`} style={{ background: isCorrect ? '#E8F5E9' : '#FFEBEE', textAlign: 'center', animation: 'fadeInUp 0.3s ease' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{isCorrect ? '🎉' : '😢'}</div>
              <div style={{ fontWeight: 600, marginBottom: '4px', color: isCorrect ? '#2E7D32' : '#C62828' }}>{isCorrect ? '回答正确！' : '回答错误'}</div>
              {!isCorrect && <div style={{ fontSize: '13px', color: 'var(--color-text)' }}>正确答案：{currentQuiz.definition}</div>}
            </div>
          )}
          {showResult && (
            <div style={{ marginTop: '16px' }}>
              {current < quizzes.length - 1 ? (
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext}>下一题 <Icon name="forward" /></button>
              ) : (
                <div className="card" style={{ textAlign: 'center', background: '#FFF8E1' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</div>
                  <div style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px' }}>完成！得分 {score} / {quizzes.length}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>{score === quizzes.length ? '太棒了，全对！' : score >= 3 ? '继续加油！' : '明天再来挑战吧'}</div>
                  <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={initQuiz}>再练一次</button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CheckInPage({ onBack }: { onBack: () => void }) {
  const { records, currentStreak } = useStore();
  const [month, setMonth] = useState(() => new Date());
  
  const year = month.getFullYear();
  const mon = month.getMonth();
  const firstDay = new Date(year, mon, 1).getDay();
  const daysInMonth = new Date(year, mon + 1, 0).getDate();
  const today = new Date().toISOString().split('T')[0];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  
  return (
    <div className="page">
      <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-light)', marginBottom: '16px', cursor: 'pointer', fontSize: '14px' }}>
        <Icon name="back" /> 返回
      </button>
      <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>📅 打卡日历</h2>
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--color-accent) 0%, #E57373 100%)', color: 'white', marginBottom: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', fontWeight: 700 }}>🔥 {currentStreak}</div>
        <div style={{ fontSize: '14px', opacity: 0.9 }}>连续打卡天数</div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <button onClick={() => setMonth(new Date(year, mon - 1, 1))} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>←</button>
          <span style={{ fontWeight: 600, fontSize: '16px' }}>{year}年{mon + 1}月</span>
          <button onClick={() => setMonth(new Date(year, mon + 1, 1))} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>→</button>
        </div>
        <div className="calendar">
          {weekDays.map(w => <div key={w} style={{ fontSize: '12px', color: 'var(--color-text-light)', fontWeight: 600 }}>{w}</div>)}
          {cells.map((d, i) => {
            if (!d) return <div key={`empty${i}`} className="calendar-day empty" />;
            const dateStr = `${year}-${String(mon + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const record = records[dateStr];
            const isToday = dateStr === today;
            const isChecked = !!(record && record.count >= 3);
            return (
              <div key={i} className={`calendar-day ${isChecked ? 'checked' : ''} ${isToday ? 'today' : ''}`} style={{ cursor: 'default' }}>
                <span className="date">{d}</span>
                {isChecked && <span className="emoji">✓</span>}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-text-light)' }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>●</span> 已打卡（≥3条）{' '}
          <span style={{ color: 'var(--color-accent)', marginLeft: '12px' }}>◐</span> 今日
        </div>
      </div>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: '8px' }}>🏅 打卡成就</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
          {[
            { emoji: '🌱', label: '连续7天', need: 7 },
            { emoji: '📖', label: '连续30天', need: 30 },
            { emoji: '🏆', label: '连续100天', need: 100 },
          ].map((item, i) => (
            <div key={i} className="stat-card" style={{ padding: '12px' }}>
              <div style={{ fontSize: '24px' }}>{item.emoji}</div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-light)' }}>{item.label}</div>
              {currentStreak >= item.need && <div style={{ fontSize: '16px' }}>🏅</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatsPage({ onBack }: { onBack: () => void }) {
  const { records, favorites } = useStore();
  const totalDays = Object.keys(records).length;
  const allRecords = Object.values(records);
  const totalStudy = allRecords.reduce((sum, r) => sum + r.count, 0);
  
  
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    last7Days.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      count: records[dateStr]?.count || 0
    });
  }
  const maxCount = Math.max(...last7Days.map(d => d.count), 1);
  
  return (
    <div className="page">
      <button onClick={onBack} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-light)', marginBottom: '16px', cursor: 'pointer', fontSize: '14px' }}>
        <Icon name="back" /> 返回
      </button>
      <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>📊 学习报告</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="stat-card"><div className="stat-number">{totalStudy}</div><div className="stat-label">总学习次数</div></div>
        <div className="stat-card"><div className="stat-number">{favorites.length}</div><div className="stat-label">收藏成语</div></div>
        <div className="stat-card"><div className="stat-number">{totalDays}</div><div className="stat-label">学习天数</div></div>
        <div className="stat-card"><div className="stat-number">{totalDays * 3}</div><div className="stat-label">预计掌握</div></div>
      </div>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: '16px' }}>📈 近7天学习趋势</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
          {last7Days.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '100%', height: `${(d.count / maxCount) * 100}px`, maxHeight: '100px', background: d.count > 0 ? 'var(--color-primary)' : 'var(--color-bg-deep)', borderRadius: '4px', transition: 'height 0.3s', minHeight: d.count > 0 ? '4px' : '0' }} />
              <span style={{ fontSize: '10px', color: 'var(--color-text-light)' }}>{d.date}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{ fontWeight: 600, marginBottom: '12px' }}>🎯 能力分布</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: '词汇量', value: Math.min(100, totalDays * 10), color: '#4CAF50' },
            { label: '典故理解', value: Math.min(100, totalDays * 5), color: '#2196F3' },
            { label: '学习坚持', value: Math.min(100, totalDays * 8), color: '#9C27B0' },
            { label: '综合能力', value: Math.min(100, totalDays * 6), color: '#FF9800' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'var(--color-bg-deep)', borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-light)', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, background: 'white', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.value}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: item.color }}>{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FavoritesPage({ onSelectIdiom }: { onSelectIdiom: (idiom: typeof idioms[0]) => void }) {
  const { favorites } = useStore();
  const favIdioms = idioms.filter(i => favorites.includes(i.word));
  
  return (
    <div className="page">
      <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>❤️ 我的收藏</h2>
      {favIdioms.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💔</div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>还没有收藏</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-light)' }}>去词典里收藏喜欢的成语吧</div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: '13px', color: 'var(--color-text-light)', marginBottom: '12px' }}>共 {favIdioms.length} 条收藏</div>
          {favIdioms.map((idiom, i) => (
            <div key={i} className="idiom-card" onClick={() => onSelectIdiom(idiom)}>
              <div className="idiom-word">{idiom.word}</div>
              <div className="idiom-pinyin">{idiom.pinyin}</div>
              <div className="idiom-definition">{idiom.definition}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedIdiom, setSelectedIdiom] = useState<typeof idioms[0] | null>(null);
  
  const handleSelectIdiom = (idiom: typeof idioms[0]) => setSelectedIdiom(idiom);
  
  if (selectedIdiom) return <IdiomDetailPage idiom={selectedIdiom} onBack={() => setSelectedIdiom(null)} />;
  
  return (
    <>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'dict' && <DictPage onSelectIdiom={handleSelectIdiom} />}
      {currentPage === 'practice' && <PracticePage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'checkin' && <CheckInPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'stats' && <StatsPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'favorites' && <FavoritesPage onSelectIdiom={handleSelectIdiom} />}
      
      <nav className="bottom-nav">
        {[
          ['home', '🏠', '首页'],
          ['dict', '📖', '词典'],
          ['practice', '🎯', '练习'],
          ['checkin', '📅', '打卡'],
          ['favorites', '❤️', '收藏'],
        ].map(([page, icon, label]) => (
          <button key={page} className={`bottom-nav-item ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page as string)}>
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
