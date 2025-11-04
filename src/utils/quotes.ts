/**
 * Quotes Utility - Manages motivational quotes
 */

import quotesData from '../../assets/quotes.json';

export interface Quote {
  text: string;
  author: string;
}

class QuotesManager {
  private quotes: Quote[];

  constructor() {
    this.quotes = quotesData.quotes;
  }

  /**
   * Get a random quote
   */
  getRandomQuote(): Quote {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomIndex];
  }

  /**
   * Get multiple random quotes
   */
  getRandomQuotes(count: number): Quote[] {
    const shuffled = [...this.quotes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Get quote by index
   */
  getQuote(index: number): Quote | null {
    if (index >= 0 && index < this.quotes.length) {
      return this.quotes[index];
    }
    return null;
  }

  /**
   * Get total number of quotes
   */
  getTotalQuotes(): number {
    return this.quotes.length;
  }

  /**
   * Search quotes by keyword
   */
  searchQuotes(keyword: string): Quote[] {
    const lowerKeyword = keyword.toLowerCase();
    return this.quotes.filter(
      quote =>
        quote.text.toLowerCase().includes(lowerKeyword) ||
        quote.author.toLowerCase().includes(lowerKeyword)
    );
  }
}

export const quotesManager = new QuotesManager();
