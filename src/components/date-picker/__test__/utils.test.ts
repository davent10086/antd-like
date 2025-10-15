import { formatDate, parseDate, isValidDate, getPanelDays, isSameDay, getWeekdays } from '../src/utils';

describe('DatePicker utils', () => {
  describe('formatDate', () => {
    it('should format date correctly with default format', () => {
      const date = new Date(2023, 11, 25);
      expect(formatDate(date)).toBe('2023-12-25');
    });

    it('should format date with custom format', () => {
      const date = new Date(2023, 5, 5, 14, 30, 45);
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-06-05 14:30:45');
      expect(formatDate(date, 'YYYY/MM/DD')).toBe('2023/06/05');
    });

    it('should pad single digit values with zero', () => {
      const date = new Date(2023, 0, 1, 1, 2, 3);
      expect(formatDate(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-01-01 01:02:03');
    });
  });

  describe('parseDate', () => {
    it('should parse valid date string', () => {
      const date = parseDate('2023-12-25');
      expect(date).toEqual(new Date(2023, 11, 25));
    });

    it('should return null for invalid date string', () => {
      const date = parseDate('invalid-date');
      expect(date).toBeNull();
    });

    it('should return null for unsupported format', () => {
      const date = parseDate('25/12/2023', 'DD/MM/YYYY');
      expect(date).toBeNull();
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date', () => {
      const date = new Date();
      expect(isValidDate(date)).toBe(true);
    });

    it('should return false for invalid date', () => {
      const date = new Date('invalid');
      expect(isValidDate(date)).toBe(false);
    });

    it('should return false for non-Date objects', () => {
      expect(isValidDate(null as unknown as Date)).toBe(false);
      expect(isValidDate(undefined as unknown as Date)).toBe(false);
      expect(isValidDate('2023-12-25' as unknown as Date)).toBe(false);
    });
  });

  describe('getPanelDays', () => {
    it('should generate 42 days for date panel', () => {
      const days = getPanelDays(2023, 11); // December 2023
      expect(days).toHaveLength(42);
    });

    it('should start from Sunday', () => {
      const days = getPanelDays(2023, 11); // December 2023
      // First day should be a Sunday (getDay() === 0)
      expect(days[0].getDay()).toBe(0);
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day dates', () => {
      const date1 = new Date(2023, 11, 25, 10, 30, 0);
      const date2 = new Date(2023, 11, 25, 15, 45, 30);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different day dates', () => {
      const date1 = new Date(2023, 11, 25);
      const date2 = new Date(2023, 11, 26);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false when one date is null', () => {
      const date1 = new Date(2023, 11, 25);
      expect(isSameDay(date1, null)).toBe(false);
      expect(isSameDay(null, date1)).toBe(false);
    });

    it('should return false when both dates are null', () => {
      expect(isSameDay(null, null)).toBe(false);
    });
  });

  describe('getWeekdays', () => {
    it('should return correct weekday names', () => {
      const weekdays = getWeekdays();
      expect(weekdays).toEqual(['日', '一', '二', '三', '四', '五', '六']);
    });
  });
});