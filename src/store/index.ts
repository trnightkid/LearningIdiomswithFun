import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 用户学习记录
interface StudyRecord {
  date: string; // YYYY-MM-DD
  count: number; // 今日学习数量
  idioms: string[]; // 今日学过的成语ID列表
}

interface UserState {
  // 打卡记录
  records: Record<string, StudyRecord>;
  
  // 当前 streak（连续打卡天数）
  currentStreak: number;
  
  // 已收藏的成语
  favorites: string[];
  
  // 已学习的成语
  learnedIds: string[];
  
  // 今日已练习
  todayPracticed: boolean;
  
  // 复习本（错题）
  reviewIds: string[];
  
  // streak 计算
  calculateStreak: () => void;
  
  // 添加学习记录
  addStudyRecord: (idiomWord: string) => void;
  
  // 切换收藏
  toggleFavorite: (word: string) => void;
  
  // 标记已学习
  markLearned: (idiomWord: string) => void;
  
  // 添加到复习本
  addToReview: (idiomWord: string) => void;
  
  // 打卡
  checkIn: () => void;
  
  // 重置数据
  reset: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      records: {},
      currentStreak: 0,
      favorites: [],
      learnedIds: [],
      todayPracticed: false,
      reviewIds: [],

      calculateStreak: () => {
        const { records } = get();
        const dates = Object.keys(records).sort().reverse();
        if (dates.length === 0) return;
        
        let streak = 0;
        const today = getToday();
        let checkDate = today;
        
        // 如果今天没打卡，从昨天开始算
        if (!records[today]) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          checkDate = yesterday.toISOString().split('T')[0];
        }
        
        while (true) {
          if (records[checkDate] && records[checkDate].count >= 3) {
            streak++;
            const d = new Date(checkDate);
            d.setDate(d.getDate() - 1);
            checkDate = d.toISOString().split('T')[0];
          } else {
            break;
          }
        }
        
        set({ currentStreak: streak });
      },

      addStudyRecord: (idiomWord: string) => {
        const today = getToday();
        const { records } = get();
        const todayRecord = records[today] || { date: today, count: 0, idioms: [] };
        
        if (!todayRecord.idioms.includes(idiomWord)) {
          todayRecord.idioms.push(idiomWord);
          todayRecord.count = todayRecord.idioms.length;
        }
        
        set({
          records: { ...records, [today]: todayRecord },
        });
        
        get().calculateStreak();
      },

      toggleFavorite: (word: string) => {
        const { favorites } = get();
        if (favorites.includes(word)) {
          set({ favorites: favorites.filter(f => f !== word) });
        } else {
          set({ favorites: [...favorites, word] });
        }
      },

      markLearned: (idiomWord: string) => {
        const { learnedIds } = get();
        if (!learnedIds.includes(idiomWord)) {
          set({ learnedIds: [...learnedIds, idiomWord] });
        }
      },

      addToReview: (idiomWord: string) => {
        const { reviewIds } = get();
        if (!reviewIds.includes(idiomWord)) {
          set({ reviewIds: [...reviewIds, idiomWord] });
        }
      },

      checkIn: () => {
        const today = getToday();
        const { records } = get();
        const todayRecord = records[today] || { date: today, count: 0, idioms: [] };
        todayRecord.count = Math.max(todayRecord.count, 3); // 确保至少3条
        set({ records: { ...records, [today]: todayRecord } });
        get().calculateStreak();
      },

      reset: () => {
        set({
          records: {},
          currentStreak: 0,
          favorites: [],
          learnedIds: [],
          todayPracticed: false,
          reviewIds: [],
        });
      },
    }),
    {
      name: 'chengyu-storage',
    }
  )
);
