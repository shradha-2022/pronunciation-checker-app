# 🎤 Pronunciation Checker - React Native App

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![Android](https://img.shields.io/badge/Platform-Android-green.svg)](https://www.android.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A beautiful, feature-rich mobile app to learn word pronunciation in American and British English

![App Preview](https://via.placeholder.com/800x400?text=Add+Screenshots+Here)

## ✨ Features

- 🔊 **Audio Pronunciation** - Listen to native speakers (US & UK)
- 🤖 **Smart Spell Checking** - Automatic suggestions for typos
- 📚 **Word Definitions** - Get meanings and examples
- 🎯 **IPA Transcriptions** - See phonetic symbols
- 💾 **Search History** - Track your learning journey
- 📱 **Native Performance** - Smooth, fast, responsive

## 📸 Screenshots

| Home Screen | Pronunciation | History |
|------------|---------------|---------|
| ![Home](link) | ![Pronunciation](link) | ![History](link) |

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- Java JDK 17
- Android Studio
- Android SDK

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/pronunciation-app-rn.git
cd pronunciation-app-rn

# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android (in new terminal)
npm run android
```

## 📦 Building APK

### Debug APK (for testing)
```bash
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK (for distribution)
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions**

## 🎯 Usage

1. **Search for a word** - Type any English word
2. **Listen** - Tap play button to hear pronunciation
3. **View definitions** - Read meanings and examples
4. **Check history** - See your recent searches
5. **Get suggestions** - Misspell intentionally to see corrections

### Try These Words:
- `schedule` - Different in US vs UK
- `tomato` - Classic example
- `aluminum` - Spelling varies
- `pronounciation` - Misspelled (app corrects it!)

## 🛠️ Tech Stack

- **React Native** - Cross-platform framework
- **JavaScript** - Programming language
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client
- **React Native Sound** - Audio playback

### APIs Used:
- **Dictionary API** - Word data & pronunciations
- **DataMuse API** - Spell checking & suggestions

## 📁 Project Structure

```
pronunciation-app-rn/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PronunciationCard.js
│   │   ├── SuggestionsList.js
│   │   └── HistoryList.js
│   ├── screens/             # App screens
│   │   └── HomeScreen.js
│   ├── services/            # API integration
│   │   └── api.js
│   └── utils/               # Helper functions
│       └── audioPlayer.js
├── android/                 # Android native code
├── App.js                   # Root component
├── index.js                 # Entry point
└── package.json             # Dependencies
```

## 🎨 Customization

### Change App Name
Edit `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">Your App Name</string>
```

### Change App Icon
Replace icons in: `android/app/src/main/res/mipmap-*/`

### Change Colors
Edit styles in `src/screens/HomeScreen.js`

## 🐛 Troubleshooting

### App won't build?
```bash
cd android
./gradlew clean
cd ..
npm start -- --reset-cache
```

### Audio not playing?
- Check internet connection
- Try different word
- Verify phone volume

### SDK not found?
Create `android/local.properties`:
```
sdk.dir=/path/to/your/Android/sdk
```

**More solutions in [SETUP_GUIDE.md](SETUP_GUIDE.md)**

## 🚀 Roadmap

### Completed ✅
- [x] Word search functionality
- [x] Audio playback
- [x] Spell checking
- [x] Search history
- [x] Definitions display

### In Progress 🚧
- [ ] Speech recognition
- [ ] User pronunciation scoring
- [ ] Dark mode

### Planned 📋
- [ ] iOS version
- [ ] Favorites/bookmarks
- [ ] Offline mode
- [ ] Multiple languages
- [ ] Gamification (streaks, points)
- [ ] Social sharing

## 🤝 Contributing

Contributions welcome! Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/) - Framework
- [Dictionary API](https://dictionaryapi.dev/) - Word data
- [DataMuse API](https://www.datamuse.com/api/) - Spell checking
- [React Native Sound](https://github.com/zmxv/react-native-sound) - Audio

## ⭐ Show Your Support

Give a ⭐ if this project helped you!

## 📞 Support

- 📧 Email: support@yourapp.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/pronunciation-app-rn/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/pronunciation-app-rn/discussions)

---

Made with ❤️ using React Native
