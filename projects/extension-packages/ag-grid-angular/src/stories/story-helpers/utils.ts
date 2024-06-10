export default class Utils {
  static getRandomColor() {
    const colorNames = ['Red', 'Green', 'Blue', 'Yellow', 'Orange'];
    const randomIndex = Math.floor(Math.random() * colorNames.length);
    return colorNames[randomIndex];
  }
}
