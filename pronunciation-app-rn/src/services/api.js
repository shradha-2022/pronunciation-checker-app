import axios from 'axios';

const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const DATAMUSE_API = 'https://api.datamuse.com/sug';

export const searchWord = async word => {
  try {
    const response = await axios.get(`${DICTIONARY_API}/${word}`);
    return response.data;
  } catch (error) {
    console.error('Dictionary API error:', error);
    throw error;
  }
};

export const getSuggestions = async word => {
  try {
    const response = await axios.get(`${DATAMUSE_API}?s=${word}&max=5`);
    return response.data.map(item => item.word);
  } catch (error) {
    console.error('Suggestions API error:', error);
    return [];
  }
};
