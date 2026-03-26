import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StudyRecord {
  date: string;
  count: number;
  idioms: string[];
}

interface UserState {
  records: Record<string, StudyRecord>;
  currentStreak: number;
  favorites: string[];
  learnedIds: string[];
  todayPracticed: boolean;
  reviewIds: string[];
  calculateStreak: () => void;
  addStudyRecord: (idiomWord: string) => void;
  toggleFavorite: (word: string) => void;
  markLearned: (idiomWord: string) => void;
  addToReview: (idiomWord: string) => void;
  checkIn: () => void;
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
        
        set({ records: { ...records, [today]: todayRecord } });
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
        todayRecord.count = Math.max(todayRecord.count, 3);
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
    { name: 'chengyu-storage' }
  )
);