# CLIVE — вход в проект для разработчика

*Состояние на 18 ноября 2026. Вопросы по документу — к Владу.*

## 1. Что это за проект

CLIVE — тренажёр памяти и внимания для людей 55+: 6 коротких упражнений плюс Cognitive Age Test (около минуты). Веб-версия уже в проде. Сейчас идёт полный перенос на **Expo / React Native**, чтобы выпустить приложение в **App Store**, а затем в **Google Play**.

Подробнее:
- [STORE_RELEASE_PLAN.md](STORE_RELEASE_PLAN.md) — главный план релиза: этапы, сроки, риски.
- [ARCHITECTURE.md](ARCHITECTURE.md) — почему выбран этот стек.
- [PRODUCT_PLAN.md](PRODUCT_PLAN.md) — продуктовая логика: регистрация, Cognitive Age, адаптивная сложность, push.
- [design/CLIVE_Master_Design_Specification.md](design/CLIVE_Master_Design_Specification.md) — дизайн-спека.
- [CLAUDE.md](CLAUDE.md) — краткий контекст (его же читает Claude Code).

## 2. Где мы сейчас

| Часть | Статус |
|---|---|
| Веб-прод (`clive-lilac.vercel.app`, ветка `main`) | ✅ Работает: 6 игр, Cognitive Age Test, Insights/Profile/Settings/Help, настоящее удаление аккаунта |
| Supabase-бэкенд | ✅ Таблицы `profiles`, `sessions`, `exercise_state`, `cognitive_age_tests`; Edge Function `delete-account` задеплоена |
| Этап 1 — Expo-фундамент (`mobile/`) | ✅ Монорепо, дизайн-система, роутинг, Supabase-клиент. Typecheck чистый, `expo export -p web` проходит |
| **Этап 2 — перенос экранов и игр** | ⏳ **Текущий этап, ещё не начат.** Все экраны, кроме Dashboard, пока заглушки |
| Этап 3 — push, офлайн, адаптивная сложность | ⬜ |
| Этап 4 — Sentry, PostHog | ⬜ |
| iOS: материалы → TestFlight → App Store | ⬜ Цель: ~март 2027 |
| Android: Play Console → closed testing → Google Play | ⬜ Цель: ~апрель 2027, строго после iOS |

Нативные сборки (EAS) ещё не запускались. Иконки и сплэш стоят дефолтные. `bundleIdentifier`/`package` = плейсхолдер `app.getclive.clive`.

## 3. Структура репозитория

```
Clive/
├── index.html, sw.js, manifest.json, vercel.json, assets/   ← ПРОД веб (React 18 + Babel в одном файле, без сборки)
│                                                              эталон логики игр для переноса
├── design/                                                  ← дизайн-спека и исходники
└── mobile/                                                  ← Expo-монорепо (npm workspaces)
    ├── apps/app/                     ← приложение
    │   ├── app.json                  ← конфиг Expo (bundle id, иконки, плагины)
    │   └── src/app/                  ← роуты Expo Router
    │       ├── _layout.tsx           ← корневой Stack
    │       ├── index.tsx             ← Dashboard (готов)
    │       ├── onboarding.tsx, insights.tsx, profile.tsx, settings.tsx, help.tsx   ← заглушки
    │       ├── cognitive-age-test.tsx                                              ← заглушка
    │       └── games/{shopping,odd,yesterday,chain,pairs,route}.tsx                ← заглушки
    └── packages/
        ├── design-system/   ← tokens.ts + Screen, Card, PrimaryBtn, SecondaryBtn, BoundedGrid
        ├── exercises/       ← метаданные 6 игр; сюда же переносится чистая логика игр (без UI)
        └── supabase-client/ ← клиент (сессия в expo-secure-store), logSession, logCognitiveTest, deleteAccount
```

ID игр (`shopping`, `odd`, `yesterday`, `chain`, `pairs`, `route`) совпадают с `exercise_id`, которые веб уже пишет в таблицу `sessions`. **Не переименовывать**, иначе потеряется история пользователей.

## 4. Как подключиться

### Доступы (запросить у Влада)
- GitHub: коллаборатор в `kukelvlad/CLIVE`.
- Supabase: приглашение в проект `zksoexscmazqngryjade`. Нужно только для изменений схемы или Edge Functions. Для локальной работы приложения ничего не требуется: URL и anon-ключ уже лежат в `packages/supabase-client/src/client.ts`, доступ к данным ограничивают RLS-политики.
- Vercel: только если будешь трогать веб.
- Expo/EAS и Apple Developer появятся позже, к этапу сборок.

### Окружение
- Node.js LTS (проверено на Node 24 / npm 11) и Git.
- Для запуска на устройстве: Xcode + iOS Simulator (macOS) и/или Android Studio + эмулятор.
- Или Expo Go на телефоне, если хватает его возможностей.

### Первый запуск
```bash
git clone https://github.com/kukelvlad/CLIVE.git
cd CLIVE
git checkout feature/expo-foundation
cd mobile
npm install
npm run dev
```
`npm run dev` запускает `expo start`. Дальше: `i` открывает iOS-симулятор, `a` — Android-эмулятор, `w` — браузер.

### Проверки перед каждым PR
```bash
cd mobile && npm run typecheck
cd mobile/apps/app && npx expo export -p web
```

### Подводные камни
- В `mobile/.npmrc` стоит `legacy-peer-deps=true`. Не убирать.
- В корневом `mobile/package.json` много транзитивных пакетов закреплено **намеренно**: без этого npm hoisting ломает резолв у Metro/tsc. Не удаляй их «для чистоты» без проверки typecheck и export.
- Turborepo пока отложен (падал на опциональных платформенных зависимостях). Всё запускается через npm workspaces.
- Новые нативные зависимости ставить через `npx expo install <pkg>`, а не `npm i`: так подбирается версия под SDK 57.
- Токены и PAT никогда не сохранять в remote URL.

## 5. Как вести параллельную разработку

### Ветки
- `main` — **только веб-прод**. В мобильной работе его не трогаем. Мерж в `main` только после явного «деплой» от Влада (Vercel деплоит автоматически).
- `feature/expo-foundation` — интеграционная ветка мобильного приложения.
- Каждая задача — своя ветка от `feature/expo-foundation`: `mobile/<что-делаем>`, например `mobile/game-shopping` или `mobile/screen-insights`. PR открываем обратно в `feature/expo-foundation`.
- Ветки должны жить недолго: один экран или одна игра на PR. Перед PR делаем rebase на свежую `feature/expo-foundation`.

### Как делим работу
Этап 2 хорошо параллелится: каждая игра — это свой роут и свой модуль логики, и они почти не пересекаются. Предлагаемое разделение (финально распределяем вместе):

| Поток | Задачи | Файлы |
|---|---|---|
| A | Onboarding, Insights, Profile, Settings, Help | `src/app/{onboarding,insights,profile,settings,help}.tsx` |
| B | Shopping List, Number Chain → Find the Odd One, Matching Pairs | `src/app/games/{shopping,chain,odd,pairs}.tsx`, `packages/exercises/src/{shopping,chain,odd,pairs}.ts` |
| C (после A/B) | Story & Recall, The Route (SVG через `react-native-svg`), Cognitive Age Test | `games/{yesterday,route}.tsx`, `cognitive-age-test.tsx`, соответствующие модули в `exercises` |

### Общие файлы: правка только по договорённости
Эти файлы трогают все, поэтому параллельные правки в них дают конфликты:
- `packages/design-system/**` — новый компонент или токен оформляем **отдельным маленьким PR**, который мержится первым. Не прячем его внутри PR с игрой.
- `apps/app/src/app/_layout.tsx`, `app.json`
- `mobile/package.json`, `package-lock.json` и любые новые зависимости. Если нужна новая зависимость, предупреди в чате и сделай отдельный PR.
- `packages/supabase-client/**` и любые изменения схемы БД.

### Как переносить игру
1. Найди компонент игры в `index.html`. `GAMES` — около строки 997, игры идут ниже (например, `function ShoppingList` около строки 1233). `computeCognitiveAge` и `AGE_NORMS` — около строки 700.
2. Чистую логику (генерация раунда, подсчёт очков, уровни) вынеси в `packages/exercises/src/<id>.ts`, без React и UI.
3. UI собери в `apps/app/src/app/games/<id>.tsx` из компонентов `@clive/design-system`. Сетки строй через `BoundedGrid`, потому что в RN нет CSS `aspect-ratio`.
4. Результат сессии записывай через `logSession` из `@clive/supabase-client`.
5. Проверь на iOS **и** Android, плюс системный шрифт на 200%.

### Требования к UI (аудитория 55+)
- Touch target не меньше 56×56. Шрифты: Fraunces для заголовков, Atkinson Hyperlegible для текста. Тёмной темы нет.
- Никаких формулировок, похожих на медицинские заявления («лечит», «предотвращает деменцию»). У результата Cognitive Age всегда стоит дисклеймер, что это неформальная оценка для сравнения с собой.
- Android-нюансы закладываем сразу, а не перед релизом: edge-to-edge, системная кнопка «Назад» внутри игры (не сбрасывать раунд без подтверждения), `fontScale` до 200%.

### Синхронизация
- Короткий апдейт в чате: что взял в работу, чтобы не делать одно и то же дважды.
- Ревью: каждый PR смотрит второй человек. Если оба заняты, хотя бы проходит typecheck + export.
- Веб-хотфиксы продолжаются на `main` в текущем стеке. Если исправляешь логику игры на вебе, сделай то же в `mobile/` (или заведи задачу).
