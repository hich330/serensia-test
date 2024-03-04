
export abstract class TermSuggestion {
  abstract getSuggestions: (term: string, choices: string[], numberOfSuggestions: number) => string[];
}
