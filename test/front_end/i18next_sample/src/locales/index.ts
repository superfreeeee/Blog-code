import i18next, { TOptions } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { resources } from './resources';

/**
 * Init i18next when loaded
 */
i18next.use(initReactI18next).init({
  // lng: 'en',
  debug: true,
  resources,
});

/**
 * 导出方法，保证 i18next 正确初始化
 */
export const i18n = (key: string, options?: TOptions): string => {
  return i18next.t(key, options);
};

export const useTrans = () => {
  const { t } = useTranslation();
  return (key: string, options?: TOptions) => t(key, options);
};

export const changeLanguage = (lang: string) => {
  i18next.changeLanguage(lang);
};
