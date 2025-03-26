export class Utils {
  public static async copyJsonToClipboard(data: any): Promise<void> {
    const jsonString = JSON.stringify(data, null, 2);
    try {
      await navigator.clipboard.writeText(jsonString);
    } catch (err) {
      throw err; // Let the caller handle the error
    }
  }
}
