# CLIVE — контекст проекта для Claude Code

Тренажёр памяти и внимания для аудитории 55+. Веб-версия уже в проде, идёт полный перенос на Expo/React Native для App Store и Google Play.

## Структура репозитория

- `index.html`, `sw.js`, `manifest.json`, `vercel.json`, `icon-*.png`, `assets/` — **прод веб-приложение** (`clive-lilac.vercel.app`, ветка `main`, автодеплой Vercel). React 18 + Babel Standalone в одном файле, без сборки. Служит эталоном логики игр для порта.
- `mobile/` — **новый Expo-монорепо** (TypeScript, Expo SDK 57, Expo Router, npm workspaces):
  - `apps/app` — приложение (`src/app/*` — роуты; сейчас заглушки + Dashboard)
  - `packages/design-system` — токены и компоненты (Screen, Card, PrimaryBtn, SecondaryBtn, BoundedGrid), портированы 1:1 с веба
  - `packages/exercises` — метаданные 6 игр (ID совпадают с веб `GAMES`: shopping, odd, yesterday, chain, pairs, route); логика игр ещё не перенесена
  - `packages/supabase-client` — клиент Supabase (expo-secure-store), logSession, logCognitiveTest, deleteAccount
- Документы: `STORE_RELEASE_PLAN.md` (главный план релиза), `ARCHITECTURE.md`, `PRODUCT_PLAN.md`, `CLIVE_PROJECT_CONTEXT.md`, `design/` (дизайн-спека и пакет).

## Ключевые решения

- Полный rewrite на Expo/React Native; бесплатный запуск, IAP (RevenueCat) — позже.
- Релиз строго последовательный: TestFlight (iOS) → App Store → тесты Android → Google Play. Google Play Console не регистрировать до Android-фазы.
- Веб-версия продолжает жить и получать хотфиксы на текущем стеке.
- Бэкенд: Supabase, проект `zksoexscmazqngryjade`. Таблицы `profiles`, `sessions`, `exercise_state`, `cognitive_age_tests` (FK с ON DELETE CASCADE). Edge Function `delete-account` уже задеплоена.
- Дизайн: Fraunces (заголовки) + Atkinson Hyperlegible (текст), touch target ≥ 56px, без тёмной темы. Формулировки в сторах не должны звучать как медицинские заявления.

## Статус

- Готово: веб-прод (6 игр, Cognitive Age Test, Insights/Profile/Settings/Help, реальное удаление аккаунта, расширенный контент); Этап 1 мобильного (фундамент, typecheck чист, `expo export -p web` проходит).
- Дальше: Этап 2 — перенос экранов и игр (порядок: Onboarding/Dashboard → Insights/Profile/Settings/Help → Shopping/Chain → Odd/Pairs → Story → Route → Cognitive Age Test), затем push, офлайн, Sentry/PostHog, TestFlight.
- Не сделано: нативные сборки (EAS) не запускались; иконки/сплэш дефолтные от Expo; `bundleIdentifier`/`package` = плейсхолдер `app.getclive.clive` (заменить на реальный App ID); Privacy Policy/Terms на публичных URL.
- Ветка мобильной работы: `feature/expo-foundation` (локально, в GitHub не запушена).

## Рабочие заметки

- Установка зависимостей: `cd mobile && npm install` (в `.npmrc` стоит `legacy-peer-deps=true`). Много транзитивных пакетов намеренно закреплены в корневом `mobile/package.json` — иначе npm hoisting ломает резолв у Metro/tsc; не удалять без проверки.
- Turborepo отложен (падал на опциональных платформенных зависимостях); скрипты — через npm workspaces. Проверка: `npm run typecheck`, `cd apps/app && npx expo export -p web`.
- Git: токены/PAT никогда не сохранять в remote URL; пуш через временный токен, затем вернуть `https://github.com/kukelvlad/CLIVE.git`.
- Деплой веба: ветка → Vercel preview → проверка → merge в `main` только после явного «деплой» от Влада.
