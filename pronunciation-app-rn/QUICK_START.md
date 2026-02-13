# 🚀 QUICK START - Build APK in 15 Minutes!

## ⚡ Super Quick Setup (If you have everything installed)

```bash
# 1. Navigate to project
cd pronunciation-app-rn

# 2. Install dependencies
npm install

# 3. Build debug APK (for testing)
cd android && ./gradlew assembleDebug && cd ..

# APK is ready at: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 If Starting from Scratch

### Windows Users:

1. **Install Node.js**: https://nodejs.org/ (Download LTS)

2. **Install Java JDK 17**: https://www.oracle.com/java/technologies/downloads/#java17

3. **Install Android Studio**: https://developer.android.com/studio
   - During setup, install Android SDK
   - Install Android Virtual Device (AVD)

4. **Set Environment Variables**:
   - Add ANDROID_HOME: `C:\Users\YOUR_NAME\AppData\Local\Android\Sdk`
   - Add to PATH: `%ANDROID_HOME%\platform-tools`

5. **Open Command Prompt**:
```bash
cd pronunciation-app-rn
npm install
cd android
gradlew assembleDebug
```

### Mac Users:

1. **Install Homebrew** (if not installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. **Install Node.js**:
```bash
brew install node
```

3. **Install Java**:
```bash
brew install openjdk@17
```

4. **Install Android Studio**: Download from https://developer.android.com/studio

5. **Build APK**:
```bash
cd pronunciation-app-rn
npm install
cd android && ./gradlew assembleDebug && cd ..
```

---

## 🎯 What You Get

After building, you'll have an APK file that you can:
- ✅ Install on any Android phone
- ✅ Share with friends
- ✅ Upload to Play Store
- ✅ Add to your portfolio/resume

**APK Location**: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📲 Installing APK on Phone

### Method 1: USB Cable
```bash
# Connect phone via USB
# Enable USB debugging on phone
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Method 2: Direct Transfer
1. Copy APK file to phone (via USB, email, or cloud)
2. On phone, open APK file
3. Allow "Install from Unknown Sources"
4. Install!

---

## 🎓 Build Commands Cheat Sheet

```bash
# Debug APK (for testing)
cd android && ./gradlew assembleDebug && cd ..

# Release APK (smaller, optimized)
cd android && ./gradlew assembleRelease && cd ..

# Clean build (if issues)
cd android && ./gradlew clean && cd ..

# Run on emulator
npm run android

# Start development server
npm start
```

---

## ⚠️ Common Issues & Fixes

### "SDK location not found"
**Fix**: Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_NAME/Library/Android/sdk
# Windows: C:\\Users\\YOUR_NAME\\AppData\\Local\\Android\\Sdk
```

### "Command not found: gradlew"
**Fix**: You're not in android directory
```bash
cd android
./gradlew assembleDebug
```

### Build fails with errors
**Fix**: Clean and retry
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

---

## 💡 Pro Tips

1. **First time building?** It might take 10-15 minutes to download dependencies. Be patient!

2. **Want smaller APK?** Build release version after setting up signing key (see SETUP_GUIDE.md)

3. **Testing on real device?** Debug APK is fine. For Play Store, use release APK.

4. **Want to customize?** Edit colors, name, icon in source files before building.

---

## 🎉 After Building

### Add to Resume:
✅ "Built production-ready Android app with React Native"
✅ "Deployed mobile application with 100+ installs"
✅ "Integrated RESTful APIs for real-time data processing"

### Share Your Work:
- Upload APK to Google Drive/Dropbox
- Record demo video
- Add screenshots to portfolio
- Write blog post about building process

---

## 📚 Next Steps

1. ✅ Build APK (you're doing this now!)
2. ✅ Test on phone
3. ✅ Add to portfolio
4. 📈 Publish to Play Store (optional)
5. 🚀 Add more features

---

## 🆘 Need Help?

- 📖 Read full guide: SETUP_GUIDE.md
- 🔍 Search: Stack Overflow
- 💬 Ask: React Native Discord
- 📧 Email: (your email)

---

**You're almost there! Just run the commands and you'll have your APK! 🎉**
