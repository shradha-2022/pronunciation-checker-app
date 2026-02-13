import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PronunciationCard from '../components/PronunciationCard';
import SuggestionsList from '../components/SuggestionsList';
import HistoryList from '../components/HistoryList';
import {searchWord, getSuggestions} from '../services/api';
import {playAudio} from '../utils/audioPlayer';

const HomeScreen = () => {
  const [word, setWord] = useState('');
  const [pronunciations, setPronunciations] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('searchHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.log('Error loading history:', err);
    }
  };

  const saveToHistory = async wordToSave => {
    try {
      const newHistory = [
        {word: wordToSave, timestamp: new Date().toISOString()},
        ...history.filter(item => item.word !== wordToSave),
      ].slice(0, 50);
      
      setHistory(newHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.log('Error saving history:', err);
    }
  };

  const handleSearch = async (searchWord = word) => {
    if (!searchWord.trim()) {
      Alert.alert('Error', 'Please enter a word');
      return;
    }

    setLoading(true);
    setError('');
    setPronunciations(null);
    setSuggestions([]);

    try {
      const data = await searchWord(searchWord.trim());
      
      if (data && data.length > 0) {
        const entry = data[0];
        const phonetics = entry.phonetics || [];

        setPronunciations({
          word: entry.word,
          phonetics: phonetics,
          meanings: entry.meanings || [],
        });

        saveToHistory(entry.word);
      }
    } catch (err) {
      console.log('Word not found, searching suggestions...');
      setError(`"${searchWord}" not found. Searching for similar words...`);

      try {
        const suggestionsList = await getSuggestions(searchWord);
        if (suggestionsList && suggestionsList.length > 0) {
          setSuggestions(suggestionsList);
          setError(`Did you mean "${suggestionsList[0]}"?`);
        } else {
          setError('No results found. Please check your spelling.');
        }
      } catch (suggErr) {
        setError('No results found. Please check your spelling.');
      }
    } finally {
      setLoading(false);
    }
  };

  const selectSuggestion = suggestion => {
    setWord(suggestion);
    handleSearch(suggestion);
  };

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all search history?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setHistory([]);
            await AsyncStorage.removeItem('searchHistory');
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pronunciation Guide</Text>
        <Text style={styles.subtitle}>
          Discover how words are spoken in American & British English
        </Text>
      </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a word..."
          placeholderTextColor="#999"
          value={word}
          onChangeText={setWord}
          onSubmitEditing={() => handleSearch()}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[styles.searchButton, loading && styles.searchButtonDisabled]}
          onPress={() => handleSearch()}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.searchButtonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* History Toggle */}
      <TouchableOpacity
        style={styles.historyToggle}
        onPress={() => setShowHistory(!showHistory)}>
        <Text style={styles.historyToggleText}>
          {showHistory ? '🔍 Hide History' : '📚 Show History'}
        </Text>
        {history.length > 0 && (
          <Text style={styles.historyCount}>({history.length})</Text>
        )}
      </TouchableOpacity>

      {/* History List */}
      {showHistory && (
        <HistoryList
          history={history}
          onSelectWord={word => {
            setWord(word);
            handleSearch(word);
            setShowHistory(false);
          }}
          onClear={clearHistory}
        />
      )}

      {/* Error and Suggestions */}
      {error && (
        <View
          style={[
            styles.errorContainer,
            suggestions.length > 0 && styles.suggestionContainer,
          ]}>
          <Text style={styles.errorText}>{error}</Text>
          {suggestions.length > 0 && (
            <SuggestionsList
              suggestions={suggestions}
              onSelect={selectSuggestion}
            />
          )}
        </View>
      )}

      {/* Results */}
      {pronunciations && (
        <View style={styles.resultsContainer}>
          <Text style={styles.wordTitle}>{pronunciations.word}</Text>
          <View style={styles.divider} />

          {/* Pronunciations */}
          <View style={styles.pronunciationsSection}>
            <Text style={styles.sectionTitle}>
              Pronunciations ({pronunciations.phonetics.length})
            </Text>
            {pronunciations.phonetics.length === 0 ? (
              <Text style={styles.noPronunciation}>
                No pronunciation data available
              </Text>
            ) : (
              pronunciations.phonetics.map((phonetic, idx) => (
                <PronunciationCard
                  key={idx}
                  phonetic={phonetic}
                  onPlay={audioUrl => playAudio(audioUrl)}
                />
              ))
            )}
          </View>

          {/* Definitions */}
          {pronunciations.meanings && pronunciations.meanings.length > 0 && (
            <View style={styles.definitionsSection}>
              <Text style={styles.sectionTitle}>Definitions</Text>
              {pronunciations.meanings.slice(0, 2).map((meaning, idx) => (
                <View key={idx} style={styles.meaningContainer}>
                  <Text style={styles.partOfSpeech}>
                    {meaning.partOfSpeech.toUpperCase()}
                  </Text>
                  {meaning.definitions.slice(0, 2).map((def, defIdx) => (
                    <View key={defIdx} style={styles.definitionItem}>
                      <Text style={styles.definitionText}>
                        {def.definition}
                      </Text>
                      {def.example && (
                        <Text style={styles.exampleText}>"{def.example}"</Text>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Tips */}
      {!pronunciations && !loading && !error && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Try these words:</Text>
          <View style={styles.tipsWords}>
            {['hello', 'water', 'schedule', 'tomato'].map(tipWord => (
              <TouchableOpacity
                key={tipWord}
                style={styles.tipWord}
                onPress={() => {
                  setWord(tipWord);
                  handleSearch(tipWord);
                }}>
                <Text style={styles.tipWordText}>{tipWord}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.tipsSubtitle}>
            Or try misspelling: "pronounciation", "recieve"
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Free Dictionary API & DataMuse
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1e8',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2c2416',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b5d4f',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#d4c5b3',
    color: '#2c2416',
  },
  searchButton: {
    backgroundColor: '#8b6b54',
    borderRadius: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
  },
  searchButtonDisabled: {
    backgroundColor: '#a89784',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  historyToggleText: {
    fontSize: 16,
    color: '#8b6b54',
    fontWeight: '600',
  },
  historyCount: {
    fontSize: 14,
    color: '#999',
    marginLeft: 5,
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderWidth: 2,
    borderColor: '#f5c6cb',
    borderRadius: 12,
    padding: 16,
    margin: 20,
  },
  suggestionContainer: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffc107',
  },
  errorText: {
    color: '#721c24',
    fontSize: 16,
    marginBottom: 10,
  },
  resultsContainer: {
    margin: 20,
  },
  wordTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#2c2416',
    textAlign: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 3,
    width: 60,
    backgroundColor: '#8b6b54',
    alignSelf: 'center',
    marginBottom: 20,
    opacity: 0.5,
  },
  pronunciationsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c2416',
    marginBottom: 16,
  },
  noPronunciation: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  definitionsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  meaningContainer: {
    marginBottom: 20,
  },
  partOfSpeech: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8b6b54',
    letterSpacing: 1,
    marginBottom: 10,
  },
  definitionItem: {
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#d4c5b3',
    marginBottom: 12,
  },
  definitionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a3f35',
  },
  exampleText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#6b5d4f',
    marginTop: 6,
  },
  tipsContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c2416',
    marginBottom: 12,
  },
  tipsWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  tipWord: {
    backgroundColor: '#f5f1e8',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d4c5b3',
  },
  tipWordText: {
    fontSize: 16,
    color: '#8b6b54',
    fontWeight: '500',
  },
  tipsSubtitle: {
    fontSize: 14,
    color: '#6b5d4f',
    fontStyle: 'italic',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
