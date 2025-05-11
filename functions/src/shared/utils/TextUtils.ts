import DOMPurify from 'isomorphic-dompurify';

export class TextUtils {
  public static sanitize(unsafeText: string): string {
    return DOMPurify.sanitize(unsafeText);
  }
}
