import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const SuggestionsList = ({suggestions, onSelect}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Did you mean:</Text>
      <View style={styles.suggestionsList}>
        {suggestions.map((suggestion, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.suggestion, idx === 0 && styles.suggestionPrimary]}
            onPress={() => onSelect(suggestion)}>
            <Text
              style={[
                styles.suggestionText,
                idx === 0 && styles.suggestionTextPrimary,
              ]}>
              {suggestion}
              {idx === 0 && ' ✓'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#856404',
    marginBottom: 10,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  suggestion: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8b6b54',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  suggestionPrimary: {
    backgroundColor: '#8b6b54',
    borderColor: '#8b6b54',
  },
  suggestionText: {
    fontSize: 16,
    color: '#8b6b54',
    fontWeight: '500',
  },
  suggestionTextPrimary: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default SuggestionsList;
