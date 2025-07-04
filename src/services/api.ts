import { Benefit } from '../types';

export class ApiService {
  private static readonly BASE_URL = 'http://localhost:3000';

  static async getBenefits(): Promise<Benefit[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/bci`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching benefits:', error);
      throw new Error('Failed to fetch benefits data');
    }
  }
}