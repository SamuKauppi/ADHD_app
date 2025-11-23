import { Text } from "react-native";


// Renders text with parts that need to be bolded
export function renderWithBold(line: string, boldWords: string[]) {
  if (boldWords.length === 0) {
    return line;
  }

  // Create a regex that matches any of the boldWords as whole words (case-insensitive)
  // \b ensures word boundary
  const regex = new RegExp(`\\b(${boldWords.map(w => escapeRegExp(w)).join('|')})\\b`, 'gi');

  // Split the line, keeping the delimiters (i.e., the bold words)
  const parts = line.split(regex);

  return parts.map((part, i) => {
    // If this part matches one of the bold words, render bold
    if (boldWords.some(w => w.toLowerCase() === part.toLowerCase())) {
      return (
        <Text key={i} style={{ fontWeight: 'bold' }}>
          {part}
        </Text>
      );
    } else {
      // Normal text
      return <Text key={i}>{part}</Text>;
    }
  });
}

// Helper to escape special regex chars in the words
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
