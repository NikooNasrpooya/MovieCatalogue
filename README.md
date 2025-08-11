# 🎬 Movie Catalogue (React Native + Expo + TypeScript)

Browse popular movies, view details, and explore trailers using the TMDB API, built with React Native (Expo) and TypeScript.

![Platform](https://img.shields.io/badge/Expo-React%20Native-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-4%2B-3178c6) ![TMDB](https://img.shields.io/badge/TMDB-API-0dbd8b) ![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## ✨ Features

- Popular movies list from TMDB
- Movie detail screen (poster, rating, release date, overview)
- Type-safe API models (TypeScript interfaces)
- Smooth list & (optional) carousel UI
- Loading/error states
- Modular structure (components / services / hooks)

---

## 🧱 Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **React Navigation** (Native Stack)
- **Axios / Fetch** for API calls
- **TMDB API**

---

## 🚀 Getting Started

### 1) Clone & Install

```bash
git clone https://github.com/NikooNasrpooya/MovieCatalogue
cd MovieCatalogue
npm install
```

### 2) TMDB API Key

Create a TMDB account → get an **API Key (v3 auth)**.

**Expo-friendly config (recommended):**

- In `app.config.ts`, add:

```ts
export default {
  expo: {
    name: "MovieCatalogue",
    slug: "movie-catalogue",
    extra: {
      TMDB_API_KEY: process.env.TMDB_API_KEY,
    },
  },
};
```

- Add a `.env` file:

```
TMDB_API_KEY=YOUR_TMDB_KEY_HERE
```

- Install env support:

```bash
npm i -D dotenv
```

- In src/services/tmdb.ts:

```ts
import Constants from "expo-constants";
const API_KEY = Constants.expoConfig?.extra?.TMDB_API_KEY;
```

> If you already use `@env` (react-native-dotenv), keep it — just ensure `.env` is in `.gitignore` and you have the babel plugin configured.

### 3) Run the App

```bash
npx expo start
# Press i to open iOS simulator, a for Android, or scan the QR in Expo Go
```

---

## 🖼️ Screenshots

<table>
  <tr>
    <td><img src="./assets/HomeScreen1.png" alt="Home" width="250"/></td>
    <td><img src="./assets/HomeScreen2.png" alt="Home" width="250"/></td>
    <td><img src="./assets/MovieDetail.png" alt="Detail" width="250"/></td>
  </tr>
</table>
