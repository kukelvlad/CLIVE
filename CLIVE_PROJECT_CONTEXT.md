# CLIVE — Полный контекст проекта
### Документ для загрузки в новый диалог

---

## 🎯 ЧТО МЫ СТРОИМ

**CLIVE** — приложение для когнитивного здоровья (тренировки мозга) для взрослых 55+.

**Следующий шаг:** Создать полноценное приложение (iOS/Android/Web) и веб-версию продукта.

---

## 📍 ТЕКУЩЕЕ СОСТОЯНИЕ

### Работающий прототип
- **URL:** https://clive-lilac.vercel.app
- **Технология:** React PWA (Progressive Web App), CDN-версия, ~2000 строк кода
- **Статус:** Задеплоен, работает, можно установить на iPhone как PWA
- **Репозиторий:** Vercel (аккаунт Влада)

### Что уже есть в прототипе
- 6 рабочих когнитивных упражнений с игровой механикой
- Экран онбординга с оценкой когнитивного возраста
- Дизайн-система (цвета, шрифты, touch targets для 55+)
- Работает офлайн, устанавливается как приложение

---

## 🧠 6 КЛИНИЧЕСКИХ УПРАЖНЕНИЙ

| # | Название | Что тренирует | Клинический источник |
|---|----------|--------------|---------------------|
| 1 | 🛒 Shopping List | Рабочая память | Cicerone et al. 2019 |
| 2 | 🔦 Find the Odd One | Внимание и скорость | NICE NG236 |
| 3 | 📅 What Was Yesterday? | Эпизодическая память | Spector 2003 RCT (CST) |
| 4 | 🔢 Number Chain | Рабочая память + скорость обработки | NICE NG236 (digit span) |
| 5 | 🎨 Matching Pairs | Визуальная память | UCLA Health 2024 |
| 6 | 🧭 The Route | Исполнительные функции | EBRSR 19th Edition |

---

## 🎨 ДИЗАЙН-СИСТЕМА

### Цвета
```
Navy (основной):    #0D2B4E
Teal (акцент):      #006B7A
Teal Bright (CTA):  #00B4A6
Gold (цитаты):      #D4A847
Cream (фон):        #F5F2ED
White:              #FFFFFF
```

### Шрифты
- **Заголовки:** Syne (Bold 700/800) — современный, выразительный
- **Текст:** Atkinson Hyperlegible — специально разработан для слабовидящих
- **Fallback:** DM Sans

### Стандарты доступности (55+)
- Минимальный размер touch target: 56×56px (WCAG 2.2+)
- Минимальный размер шрифта: 18px для основного текста
- ARIA labels на всех интерактивных элементах
- Focus rings для навигации с клавиатуры
- Safe area insets для iOS notch
- Все цвета проверены WCAG AA контраст

---

## 💰 БИЗНЕС-МОДЕЛЬ И РЫНОК

### Рыночные данные
- EU digital health: €81B (2024) → €333B (2033), CAGR 22%
- Smart Aging: €16B → €41B (2035), CAGR 9.1%
- EU 65+: 21.6% сейчас → 29% к 2050
- 140M+ взрослых 55+ в Европе

### Модель монетизации
- **Freemium:** базовые упражнения бесплатно, Premium подписка
- **Premium:** €84/год (€7/мес) или €168 за 2 года
- **Без рекламы всегда** — принципиальная позиция

### Текущий Kickstarter
- **URL:** https://www.kickstarter.com/projects/409122201/clive-a-brain-training-app-designed-for-adults-55
- **Цель:** €15,000 (в долларах ~$117,449 — видимо изначально в другой валюте)
- **Статус:** 5 бэкеров, $657 собрано, 35 дней осталось
- **Проблема:** Страница текстовая, не конвертирует → нужна клиповая переработка

### Тиры Kickstarter
| Тир | Цена | Лимит | Что получают |
|-----|------|-------|-------------|
| Supporter | €9 | ∞ | Имя в приложении |
| Early Bird ⚡ | €19 | 100 | 6 мес Premium |
| Early Supporter | €27 | ∞ | 1 год Premium (ценность €84) |
| **Founding Member ⭐** | **€57** | **∞** | **2 года Premium (€168) — ГЛАВНЫЙ** |
| Core Backer | €97 | ∞ | Lifetime + подарочный аккаунт |
| Ambassador 🏆 | €177 | 20 | Lifetime + 5 аккаунтов + звонок с командой |

---

## 👥 КОМАНДА

### Сооснователи
- **Влад (Vlad)** — технический/продуктовый. Email: kukel@playform.com. Базируется в Москве.
- **Сергей** — сооснователь CLIVE
- **Толя** — сооснователь CLIVE

### Компания
- **Greenency** (лого слева внизу на логотипе)
- **eg** (лого справа внизу — вторая компания)
- Европейская команда, фокус на digital health для пожилых

---

## 📱 ТЕХНИЧЕСКИЙ СТЕК ПРОТОТИПА

```javascript
// Текущий прототип
Framework: React (CDN, без сборщика)
Deployment: Vercel
URL: clive-lilac.vercel.app
Файл: /home/claude/clive-static/index.html (~2000 строк)

// Шрифты (Google Fonts)
Syne: wght@400;600;700;800
DM Sans: opsz,wght@9..40,300...700

// Нет зависимостей npm — чистый React через CDN
```

---

## 🔑 API КЛЮЧИ И СЕРВИСЫ

### OpenAI (DALL-E)
- **Аккаунт:** kukel@playform.com
- **Ключ:** ⚠️ НУЖНО СГЕНЕРИРОВАТЬ НОВЫЙ — старый sk-proj-...0BQA использовался в чате
- **Баланс:** ~$0 (исчерпан на генерацию изображений)
- **Platform:** platform.openai.com

### Vercel
- Прототип задеплоен: clive-lilac.vercel.app
- Аккаунт Влада

---

## 📋 ЧТО БЫЛО СДЕЛАНО В ПРЕДЫДУЩИХ ДИАЛОГАХ

### Версия 1 (апрель 2026)
- ✅ Kickstarter копирайтинг (EN)
- ✅ Инвестиционный питч (PPTX + PDF, 15 слайдов)
- ✅ 6 клинических упражнений с источниками
- ✅ React PWA прототип → задеплоен на Vercel
- ✅ UI/UX редизайн под стандарты 55+
- ✅ Email для инвесторов (EN + RU)

### Версия 2 (май 2026)
- ✅ Социальные посты FB+IG (EN+RU)
- ✅ Facebook Ads стратегия (бюджет €100-200)
- ✅ LinkedIn посты (EN+RU)
- ✅ Инструкция по установке PWA на iPhone
- ✅ 7 художественных изображений (Adobe Firefly + PIL)
- ✅ Клиповая Kickstarter-страница (HTML с встроенными изображениями)
- ✅ 5 изображений DALL-E HD (1792×1024) через OpenAI API

---

## 🚀 ЧТО НУЖНО ПОСТРОИТЬ ДАЛЬШЕ

### Приоритет 1 — Полноценное мобильное приложение
- iOS + Android (React Native или Flutter)
- Или качественный React Native / Expo с деплоем в сторы
- Онбординг, профиль, прогресс, все 6 упражнений
- Push-уведомления (ежедневные напоминания)
- Офлайн-режим
- Подписка через RevenueCat / App Store / Google Play

### Приоритет 2 — Веб-версия (маркетинговый сайт)
- Лендинг с клиповой подачей (как Kickstarter-страница)
- Регистрация email рассылки
- Демо-доступ к упражнениям прямо в браузере
- Интеграция с Kickstarter / Stripe

### Приоритет 3 — Backend
- User profiles и прогресс
- Cognitive Age calculation
- Analytics (сколько сессий, динамика)
- Аутентификация
- Subscription management

---

## 📐 АРХИТЕКТУРА ПРИЛОЖЕНИЯ (ПЛАН)

```
CLIVE App
├── Onboarding
│   ├── Cognitive Age Assessment (5 min test)
│   └── Personalization setup
├── Home
│   ├── Daily Session (1 упражнение)
│   ├── Cognitive Age score
│   └── Streak tracker
├── Exercises
│   ├── Shopping List (Working Memory)
│   ├── Find the Odd One (Attention)
│   ├── Yesterday Recall (Episodic Memory)
│   ├── Number Chain (Processing Speed)
│   ├── Matching Pairs (Visual Memory)
│   └── The Route (Executive Function)
├── Progress
│   ├── Weekly/Monthly charts
│   ├── Cognitive Age trend
│   └── Badges / milestones
└── Profile
    ├── Settings
    ├── Subscription management
    └── About / Clinical sources
```

---

## 📝 КЛЮЧЕВЫЕ ТЕКСТЫ

### Главный слоган
> "Built for our moms and dads. Not for gamers."

### Субтитул
> "The first cognitive health app designed from the ground up for adults 55+. Clinically grounded. Ad-free. Calm."

### Ключевая цитата (реальная, от тестового пользователя 67 лет)
> "I know I need to train my brain. I just don't want to feel like a child doing it."

### Позиционирование
- Не игра. Ежедневная практика.
- Клинически обоснованные методы (не "brain games")
- Ноль рекламы — всегда, никаких исключений
- Достоинство, а не давление

---

## 🌍 КЛИНИЧЕСКИЕ ИСТОЧНИКИ

1. **NICE NG236** (2023) — National Institute for Health and Care Excellence, UK. Cognitive rehabilitation guidelines.
2. **Cicerone et al. (2019)** — Evidence-Based Cognitive Rehabilitation: Systematic Review. Archives of Physical Medicine and Rehabilitation.
3. **Spector et al. (2003)** — Efficacy of an evidence-based cognitive stimulation therapy programme for people with dementia. RCT.
4. **UCLA Health (2024)** — Visual memory and aging research.
5. **EBRSR 19th Edition** — Evidence-Based Review of Stroke Rehabilitation. Executive function.

---

## 💬 ВАЖНЫЕ ИНСАЙТЫ ИЗ ИССЛЕДОВАНИЙ

- 140M+ взрослых 55+ в Европе пробуют и бросают мозговые приложения не потому что им неважно когнитивное здоровье — а потому что инструменты их не уважают
- Основная проблема существующих приложений: мелкий шрифт, реклама каждую сессию, геймифицированное давление, нет клинической базы
- Целевой пользователь: женщина 60-67, хочет тренировать мозг, уже пробовала 3 приложения и бросила все в течение недели
- Самый высококонвертящий формат контента — клиповый (картинка + 1 удар текста), не длинные описания

---

## 📁 ФАЙЛЫ ИЗ ПРЕДЫДУЩИХ ДИАЛОГОВ

Все файлы в `/mnt/user-data/outputs/`:
- `CLIVE_Investor_Pitch_v2.pptx` + `.pdf` — инвестиционная презентация
- `CLIVE_PWA_iPhone.zip` — установочный пакет PWA
- `CLIVE_iPhone_Install_Guide.html` — инструкция по установке
- `CLIVE_7posts_final.zip` — 7 постов для соцсетей
- `post1_hands.jpg` ... `post7_quote.jpg` — изображения постов
- `CLIVE_Kickstarter_Clip.html` — клиповая Kickstarter-страница (2.1MB с встроенными изображениями)

---

## ⚙️ НАСТРОЙКИ НОВОГО ДИАЛОГА

При старте нового диалога скажи Claude:

> "Я загружаю контекст проекта CLIVE. Прочитай этот документ полностью. Мы будем создавать полноценное мобильное приложение и веб-версию CLIVE — когнитивного приложения для взрослых 55+. Работающий прототип: clive-lilac.vercel.app. Начнём с [iOS/Android app / веб-сайт / backend]."

---

*Документ создан: 29 июля 2026*
*Версия: 3.0*
*Предыдущие диалоги: 3 сессии с апреля по май 2026*
