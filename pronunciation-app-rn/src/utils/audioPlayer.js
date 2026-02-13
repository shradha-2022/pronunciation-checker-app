import {Alert} from 'react-native';
import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

let currentSound = null;

export const playAudio = audioUrl => {
  if (!audioUrl) {
    Alert.alert('Error', 'Audio URL not available');
    return;
  }

  // Stop any currently playing audio
  if (currentSound) {
    currentSound.stop();
    currentSound.release();
    currentSound = null;
  }

  // Create and play new sound
  currentSound = new Sound(audioUrl, null, error => {
    if (error) {
      console.error('Failed to load sound', error);
      Alert.alert('Error', 'Failed to play audio. Please try again.');
      return;
    }

    // Play the sound
    currentSound.play(success => {
      if (!success) {
        console.log('Sound playback failed');
        Alert.alert('Error', 'Audio playback failed');
      }
      
      // Release the sound resource when finished
      currentSound.release();
      currentSound = null;
    });
  });
};

export const stopAudio = () => {
  if (currentSound) {
    currentSound.stop();
    currentSound.release();
    currentSound = null;
  }
};
