export abstract class WebBrowser {
  abstract getHtml(url: string): string | null;
}
