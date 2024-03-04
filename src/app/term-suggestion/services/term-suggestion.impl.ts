import {TermSuggestion} from "./term-suggestion";

export class TermSuggestionImpl implements TermSuggestion {

  getSuggestions(term: string, choices: string[], numberOfSuggestions: number): string[] {
    const _response = new Map<string, number>();

    choices.forEach((choice: string) => {
      if (choice.length >= term.length) {
        _response.set(choice, this.getDifferenceScore(term, choice));
      }
    });

    const _sortedResponseArray = Array.from(
      this.sortByNearestTerm(_response).keys()
    );

    return numberOfSuggestions > 0 ?
      _sortedResponseArray.splice(0, numberOfSuggestions) :
      _sortedResponseArray;
  }

  /**
   * Calculate Difference Score
   * @param term given string
   * @param target string to compare term with
   * @private
   */
  private getDifferenceScore(term: string, target: string): number {
    const _term: string[] = Array.from(term.trim().toLowerCase());
    const _target: string[] = Array.from(target.trim().toLowerCase());
    let _score = 0;

    _term.forEach((item: string) => {
      if (!_target.includes(item)) {
        _score++;
      }
    });

    return _score;
  }

  /**
   * Sort Map Values by nearest Term according to the score, term length
   * and an Alphabetical
   * @param map
   * @private
   */
  private sortByNearestTerm(map: Map<string, number>): Map<string, number> {
    const _response = Array.from(map).sort(
      (a: [string, number], b: [string, number]) => this.sortTermByScore(a, b)
    );
    return new Map(_response);
  }

  private sortTermByScore(a: [string, number], b: [string, number]): number {
    if(a[1] > b[1]) {
      return 1;
    } else if(a[1] < b[1]) {
      return -1;
    } else {
      return this.sortTermByLength(a[0], b[0]);
    }
  }

  private sortTermByLength(a: string, b: string): number {
    if(a.length > b.length) {
      return 1;
    } else if(a.length < b.length) {
      return -1;
    } else {
      return this.alphabeticalSort(a, b);
    }
  }

  private alphabeticalSort(a: string, b: string): number {
    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
  }
}
