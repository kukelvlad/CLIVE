# CLIVE — Архитектура и технологический стек
### Предложение на основе исследования конкурентов и стандартов доступности 55+

*Документ создан: 29 июля 2026*

---

## 1. GitHub — доступ для управления релизами из чата

Прямого GitHub-коннектора в реестре MCP для этого чата нет (проверил — нашёл Vercel-коннектор, но не GitHub). Варианты:

1. **Vercel MCP** — есть в реестре, не подключен. Даёт управление деплоями/проектами (list_projects, list_deployments, get_deployment и т.д.) прямо из чата. Могу подключить сейчас.
2. **Claude in Chrome** — для действий в самом GitHub (PR, релизы, issues, настройки репо) через браузер, с подтверждением каждого шага.
3. **GitHub CLI (gh) в песочнице** — можно settить и работать с репозиторием (push, PR, tag, release) через `gh`/`git` в shell, но потребуется передать personal access token. Ввод паролей/токенов через автозаполнение форм запрещён политикой безопасности, но как переменная окружения для CLI — стандартная практика; решать вам.

**Рекомендация:** подключить Vercel MCP для деплоев сейчас, а для GitHub — использовать Claude in Chrome (безопаснее, без токенов) либо `gh` CLI, если хотите управлять релизами (тегами, PR) прямо из чата. Скажите, что выбрать — подключу.

---

## 2. Что показало исследование конкурентов

BrainHQ, Lumosity, Elevate, CogniFit, Peak, NeuroNation — все нативные iOS/Android приложения с веб-версией как вторичной. Ключевые выводы, которые влияют на архитектуру:

- **BrainHQ** — лидер по клинической доказательности (200+ исследований), покрывается некоторыми Medicare Advantage планами. Тяжеловесный онбординг с полной оценкой.
- **CogniFit** — длинная батарея тестов (23 когнитивных способности), менее "игривый" дизайн — по отзывам, воспринимается как утомительный.
- **Elevate / Lumosity** — минималистичный, быстрый онбординг, широкая библиотека упражнений.
- Общий паттерн: у всех — единая кодовая база на кросс-платформенном фреймворке (не отдельные iOS/Android/Web команды), т.к. только так небольшая команда (как у CLIVE — 3 сооснователя) успевает поддерживать паритет фич на всех платформах.

Для CLIVE это означает: **не дублировать разработку под каждую платформу** — это неподъёмно для команды из 3 человек, и наш дифференциатор ("спокойный", "не игра", "с достоинством") требует консистентного, тщательно выверенного UI на всех устройствах, а не 3 отдельных реализации, расходящихся со временем.

---

## 3. Рекомендуемый стек

| Слой | Технология | Почему |
|---|---|---|
| Язык | **TypeScript** везде (фронт + бэкенд-функции) | Один язык для всей команды, меньше багов на рантайме, легче онбордить нового разработчика |
| Приложение (iOS/Android/Web/PWA/планшет) | **Expo (React Native) + Expo Router** | Одна кодовая база → четыре целевые платформы. Expo Web в 2026 — production-grade (SDK 54+), тот же роутинг и компоненты работают в браузере и в нативном приложении. Планшет — это просто адаптивные layout-брейкпоинты в том же коде, отдельная платформа не нужна |
| Стилизация / дизайн-система | **NativeWind (Tailwind для RN)** или Tamagui | Ваши токены (Navy/Teal/Gold/Cream, Syne + Atkinson Hyperlegible, touch target 56×56px) оформляются как переиспользуемая дизайн-система, а не хардкодятся в каждом экране |
| Бэкенд | **Supabase** (уже выбран) | Postgres + Auth + Realtime + Storage. Edge Functions на TypeScript/Deno — остаёмся в одном языке |
| Подписки/платежи | **RevenueCat** поверх App Store / Google Play / Stripe | Единый слой биллинга для веба и сторов — не пишете логику подписок трижды |
| Офлайн-режим | **expo-sqlite** + фоновая синхронизация с Supabase | Требование "работает офлайн" уже есть в прототипе — сохраняется и в новой архитектуре |
| Push-уведомления | **Expo Notifications** | Работает на iOS/Android одинаково, легко подключить "ежедневное напоминание" |
| Аналитика | **PostHog** (self-host опция, приватность важна для 55+ аудитории здоровья) | — |
| Маркетинговый сайт (Kickstarter-лендинг, SEO) | Отдельно, **Astro** или Next.js статикой на Vercel | Лендинг не должен тянуть за собой вес RN-рантайма — ему нужны SEO и скорость первой загрузки, а не общий код с приложением |
| CI/CD | **GitHub Actions** + **EAS Build/Submit** (сборки в сторы) + автодеплой Vercel для веба | — |

---

## 4. Структура репозитория (monorepo)

```
clive/
├── apps/
│   ├── app/            ← Expo-приложение (iOS + Android + Web/PWA + планшет, один код)
│   └── marketing/       ← Лендинг (Astro/Next), Kickstarter-страница
├── packages/
│   ├── design-system/   ← Токены, компоненты (кнопки 56×56, шрифты, цвета)
│   ├── exercises/        ← Логика 6 упражнений, отделена от UI — переиспользуется
│   └── supabase-client/  ← Общая типизация БД, auth-хелперы
└── turbo.json            ← Turborepo для сборки/кэша
```

Разделение `exercises` (логика) от UI важно: упражнения (Shopping List, Number Chain и т.д.) — это чистая бизнес-логика, которая не должна зависеть от того, рендерится ли она в браузере или в нативном приложении.

---

## 5. Поэтапный релиз (как вы и просили — не всё сразу)

**Этап 1 (сейчас → осень 2026): Web + PWA**
Переезд текущего прототипа (~2000 строк в одном HTML) на Expo-кодовую базу с TypeScript, экспорт в Web. Внешне для пользователя ничего не меняется (тот же URL, то же PWA-инсталл на iPhone), но внутри — фундамент, готовый к сторам без переписывания.

**Этап 2 (после закрытия раунда/Kickstarter): iOS App Store + Google Play**
Та же кодовая база, `eas build` → сборки в сторы. Добавляется RevenueCat для подписок через сторы.

**Этап 3: Полировка планшета**
Адаптивные layout уже работают благодаря RN Web, но нужен отдельный QA-проход на iPad/Android-планшетах (раскладка, размер шрифта, safe areas).

---

## 6. Источники

- [React Native Web + Expo Guide (2026)](https://reactnativerelay.com/article/react-native-web-expo-cross-platform-2026)
- [React Native 2026: Expo Stack Guide](https://adevs.com/blog/why-react-native-still-leads-cross-platform-development-in-2026/)
- [Supabase + Expo React Native Auth Quickstart](https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth)
- [Using Supabase — Expo Docs](https://docs.expo.dev/guides/using-supabase/)
- [Best Brain Training Apps 2026: Complete Comparison (Lumosity vs Peak vs BrainHQ)](https://brainwaves.ai/blog/best-brain-training-apps-2026-complete-comparison)
- [The Big 2026 Comparison: CogniFit, Lumosity, Elevate](https://moadly.app/news/the-big-2026-comparison-cognifit-lumosity-elevate-and-beyond)
- [A Guide to Interface Design for Older Adults — Toptal](https://www.toptal.com/designers/ui/ui-design-for-older-adults)
- [Design Guidelines of Mobile Apps for Older Adults: Systematic Review (NCBI)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10557006/)
