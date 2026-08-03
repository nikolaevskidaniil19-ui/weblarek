export const BACKEND_SERVER_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
export const IMAGE_CDN_PATH = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

export const UI_CATEGORY_STYLE_REGISTRY: Record<string, string> = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};