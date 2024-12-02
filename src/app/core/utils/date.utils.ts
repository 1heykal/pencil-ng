import { formatDistanceToNow, format } from 'date-fns';

export class DateUtils {
  static formatRelativeDate(date: Date | string): string {
    const postDate = new Date(date);
    const now = new Date();
    const diffInHours = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(postDate, { addSuffix: true });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else if (diffInHours < 168) { // 7 days
      return formatDistanceToNow(postDate, { addSuffix: true });
    } else {
      return format(postDate, 'MMM d, yyyy');
    }
  }

  static formatFullDate(date: Date | string): string {
    return format(new Date(date), 'PPpp'); // e.g., "Apr 29, 2024, 9:30 AM"
  }
} 