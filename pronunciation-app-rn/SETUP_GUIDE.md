# 🚀 React Native Pronunciation Checker - Complete Setup Guide

## 📱 What You're Building

A full-featured Android app with:
- ✅ Word pronunciation (US & UK)
- ✅ Audio playback
- ✅ Spell checking & suggestions
- ✅ Search history (saved locally)
- ✅ IPA phonetic transcriptions
- ✅ Definitions and examples
- ✅ Beautiful native UI

---

## 🛠️ PREREQUISITES

### 1. Install Node.js
Download from: https://nodejs.org/ (LTS version recommended)

Verify installation:
```bash
node --version
npm --version
```

### 2. Install Java Development Kit (JDK 17)
Download from: https://www.oracle.com/java/technologies/downloads/#java17

Verify:
```bash
java -version
```

### 3. Install Android Studio
Download from: https://developer.android.com/studio

During installation:
- ✅ Install Android SDK
- ✅ Install Android SDK Platform
- ✅ Install Android Virtual Device

### 4. Set Environment Variables

**Windows:**
```
ANDROID_HOME = C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
PATH += %ANDROID_HOME%\platform-tools
PATH += %ANDROID_HOME%\tools
PATH += %ANDROID_HOME%\tools\bin
```

**Mac/Linux:**
Add to ~/.bash_profile or ~/.zshrc:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## 📦 PROJECT SETUP

### Step 1: Initialize React Native Project

```bash
# Install React Native CLI globally
npm install -g react-native-cli

# Create new project (if not using provided files)
npx react-native init PronunciationChecker

# OR use the provided files
cd pronunciation-app-rn
npm install
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- react-native
- react-native-sound (audio playback)
- @react-native-async-storage/async-storage (local storage)
- axios (API calls)
- react-native-vector-icons (icons)

### Step 3: Link Native Dependencies

```bash
# For React Native 0.60+, auto-linking should work
# But run this to ensure:
npx react-native link react-native-sound
npx react-native link react-native-vector-icons
```

---

## 🏃 RUNNING THE APP

### Option 1: Run on Android Emulator

1. **Start Android Studio**
2. **Open AVD Manager** (Tools > Device Manager)
3. **Create Virtual Device** (e.g., Pixel 5, API 33)
4. **Start the emulator**

Then in your terminal:
```bash
# Start Metro bundler
npm start

# In another terminal, run Android app
npm run android
# OR
npx react-native run-android
```

### Option 2: Run on Physical Device

1. **Enable Developer Options** on your phone:
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
   
2. **Enable USB Debugging**:
   - Settings > Developer Options > USB Debugging

3. **Connect phone via USB**

4. **Verify device is connected**:
```bash
adb devices
```

5. **Run the app**:
```bash
npm run android
```

---

## 📱 BUILDING APK

### Method 1: Debug APK (Quick Testing)

```bash
cd android
./gradlew assembleDebug
cd ..
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

### Method 2: Release APK (For Distribution)

#### Step 1: Generate Signing Key

```bash
cd android/app

# Generate keystore
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Important**: Remember the passwords you set!

#### Step 2: Configure Gradle Variables

Create file: `android/gradle.properties`

Add:
```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=YOUR_STORE_PASSWORD
MYAPP_UPLOAD_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

⚠️ **Important**: Add `gradle.properties` to `.gitignore`!

#### Step 3: Build Release APK

```bash
cd android
./gradlew assembleRelease
cd ..
```

**APK Location**: `android/app/build/outputs/apk/release/app-release.apk`

#### Step 4: Test Release APK

```bash
# Install on connected device
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## 📤 DISTRIBUTING YOUR APP

### Option 1: Direct APK Sharing

1. Share the APK file via:
   - Email
   - Google Drive
   - Dropbox
   - Direct USB transfer

2. Users install by:
   - Enabling "Install from Unknown Sources"
   - Opening APK file

### Option 2: Google Play Store

1. **Create Developer Account**:
   - Go to https://play.google.com/console
   - Pay $25 one-time fee

2. **Create App Listing**:
   - App name, description
   - Screenshots
   - Privacy policy

3. **Upload AAB (Android App Bundle)**:
```bash
cd android
./gradlew bundleRelease
```

AAB location: `android/app/build/outputs/bundle/release/app-release.aab`

4. **Submit for Review**

### Option 3: Alternative Stores

- Amazon Appstore
- Samsung Galaxy Store
- Huawei AppGallery

---

## 🎨 CUSTOMIZATION

### Change App Name

**android/app/src/main/res/values/strings.xml**:
```xml
<resources>
    <string name="app_name">Your App Name</string>
</resources>
```

### Change App Icon

1. Generate icons: https://romannurik.github.io/AndroidAssetStudio/
2. Replace files in: `android/app/src/main/res/mipmap-*/ic_launcher.png`

### Change Package Name

1. Edit `android/app/build.gradle`:
```gradle
defaultConfig {
    applicationId "com.yourcompany.yourapp"
}
```

2. Rename Java package folders

### Change Colors

Edit `src/screens/HomeScreen.js` styles:
```javascript
backgroundColor: '#YOUR_COLOR'
```

---

## 🐛 TROUBLESHOOTING

### Issue: "SDK location not found"

**Solution**:
Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
# OR on Windows:
# sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

### Issue: "Unable to load script from assets"

**Solution**:
```bash
# Create assets folder
mkdir android/app/src/main/assets

# Bundle JS
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Rebuild
npm run android
```

### Issue: Audio not playing

**Solution**:
1. Check internet connection (audio files are streamed)
2. Try different word (some words don't have audio)
3. Check phone volume

### Issue: Build fails

**Solutions**:
```bash
# Clean build
cd android
./gradlew clean
cd ..

# Clear Metro cache
npm start -- --reset-cache

# Reinstall node_modules
rm -rf node_modules
npm install
```

### Issue: App crashes on startup

**Solution**:
```bash
# Check logs
adb logcat *:E

# Rebuild
npm run android
```

---

## 📊 APP FEATURES

### Current Features:
- ✅ Search any English word
- ✅ View US & UK pronunciations
- ✅ Listen to audio pronunciation
- ✅ See IPA phonetic transcriptions
- ✅ Get word definitions
- ✅ Smart spell checking
- ✅ Search history (saved locally)
- ✅ Offline history access

### Future Enhancements:
- [ ] Speech recognition (user speaks)
- [ ] Pronunciation scoring
- [ ] Word favorites/bookmarks
- [ ] Daily word challenges
- [ ] Gamification (streaks, points)
- [ ] Multiple languages
- [ ] Dark mode

---

## 📁 PROJECT STRUCTURE

```
pronunciation-app-rn/
├── android/                   # Android native code
│   └── app/
│       ├── build.gradle      # Android build config
│       └── src/main/
│           ├── AndroidManifest.xml
│           └── res/          # Icons, strings
├── src/
│   ├── components/           # Reusable components
│   │   ├── PronunciationCard.js
│   │   ├── SuggestionsList.js
│   │   └── HistoryList.js
│   ├── screens/              # App screens
│   │   └── HomeScreen.js
│   ├── services/             # API calls
│   │   └── api.js
│   └── utils/                # Helper functions
│       └── audioPlayer.js
├── App.js                    # Main app component
├── index.js                  # Entry point
├── package.json              # Dependencies
└── app.json                  # App metadata
```

---

## 💡 TESTING CHECKLIST

Before building release APK:

- [ ] Test on different Android versions
- [ ] Test on different screen sizes
- [ ] Test with slow internet
- [ ] Test audio playback
- [ ] Test spell suggestions
- [ ] Test history saving/loading
- [ ] Test app icon displays correctly
- [ ] Test app name is correct

---

## 🎓 LEARNING RESOURCES

### React Native Basics:
- https://reactnative.dev/docs/getting-started
- https://reactnative.dev/docs/tutorial

### Building APKs:
- https://reactnative.dev/docs/signed-apk-android

### Publishing to Play Store:
- https://support.google.com/googleplay/android-developer

---

## 📝 NEXT STEPS

1. **Build the app**: Follow setup instructions above
2. **Test thoroughly**: Try different words, test audio
3. **Build APK**: Use release build instructions
4. **Add to portfolio**:
   - Upload to GitHub
   - Record demo video
   - Write blog post
   - Add to resume

5. **Publish** (Optional):
   - Google Play Store
   - Personal website
   - Share APK directly

---

## 🎯 RESUME BULLET POINTS

Use these after completing:

✅ "Developed cross-platform mobile app with React Native for Android/iOS"

✅ "Integrated RESTful APIs for real-time pronunciation data and spell checking"

✅ "Implemented local data persistence with AsyncStorage for user history"

✅ "Built audio playback system using React Native Sound library"

✅ "Published app achieving 100+ downloads in first month"

✅ "Optimized app performance reducing bundle size by 40%"

---

## 🆘 SUPPORT

If you encounter issues:

1. Check the Troubleshooting section above
2. Search on Stack Overflow
3. Check React Native GitHub issues
4. Ask in React Native Discord/Reddit

---

## 📄 LICENSE

MIT License - Free to use, modify, and distribute!

---

**Good luck building your app! 🚀**

Remember: Start simple, test often, and add features gradually!
