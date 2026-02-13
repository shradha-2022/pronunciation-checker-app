import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const PronunciationCard = ({phonetic, onPlay}) => {
  const hasAudio = phonetic.audio && phonetic.audio.trim() !== '';
  
  const getAccentLabel = audioUrl => {
    if (!audioUrl) return '🌐 Generic';
    if (audioUrl.includes('-us') || audioUrl.includes('_us')) return '🇺🇸 US';
    if (audioUrl.includes('-uk') || audioUrl.includes('-gb')) return '🇬🇧 UK';
    return '🌐 Generic';
  };

  return (
    <View style={[styles.card, hasAudio && styles.cardWithAudio]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.phoneticText}>
            {phonetic.text || '(No phonetic text)'}
          </Text>
          <Text style={styles.accentLabel}>
            {getAccentLabel(phonetic.audio)}
          </Text>
        </View>
        
        {hasAudio ? (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => onPlay(phonetic.audio)}>
            <Text style={styles.playButtonText}>▶ Listen</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.noAudioBadge}>
            <Text style={styles.noAudioText}>No Audio</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardWithAudio: {
    borderColor: '#28a745',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  phoneticText: {
    fontSize: 26,
    color: '#2c2416',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  accentLabel: {
    fontSize: 15,
    color: '#6b5d4f',
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  noAudioBadge: {
    backgroundColor: '#ffc107',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  noAudioText: {
    color: '#856404',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default PronunciationCard;
