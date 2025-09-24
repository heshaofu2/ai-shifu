import { create } from 'zustand';
import { SystemStoreState } from '@/c-types/store';
import { browserLanguage } from '@/i18n';

export const useSystemStore = create<SystemStoreState>(set => ({
  language: browserLanguage,
  channel: '',
  wechatCode: '',
  showVip: true,
  previewMode: false,
  skip: false,
  updateChannel: (channel: string) => set({ channel }),
  updateWechatCode: (wechatCode: string) => set({ wechatCode }),
  updateLanguage: (language: string) => set({ language }),
  setShowVip: (showVip: boolean) => set({ showVip }),
  updatePreviewMode: (mode: boolean) => set({ previewMode: mode }),
  updateSkip: (skip: boolean) => set({ skip }),
}));
