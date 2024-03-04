import {WebBrowser} from "./web-browser";

export class WebBrowserImpl implements WebBrowser {
  data: { [key: string]: string } = {
    'file:///C:/TestHtml/index.html': `
    <html>
      <h1>INDEX</h1>
      <a href="./child1.html">child1</a>
      <a href="./child1.html">child1</a>
      <a href=./child1.html>child1</a>
      <a href="tel:0123456789">child1</a>
      <a href="blog/bien-utiliser-les-balises-de-lien">child1</a>
      <a href="javascript:alert('Bienvenue');">child1</a>
      <a href="#section">child1</a>
      <a href=mailto:nullepart@mozilla.org>Envoyer l'email nulle part</a>
    </html>
    `,
    'file:///C:/TestHtml/child1.html': `
      <html>
        <h1>CHILD1</h1>
        <a href="./index.html">index</a>
        <a href="./child2.html">child2</a>
        <a href=mailto:ailleurs@mozilla.org>Envoyer l'email ailleurs</a>
        <a href=mailto:nullepart@mozilla.org>Envoyer l'email nulle part</a>
      </html>
      `,
    'file:///C:/TestHtml/child2.html': `
    <html>
      <h1>CHILD2</h1>
      <a href="./index.html">index</a>
      <a href=mailto:loin@mozilla.org>Envoyer l'email loin</a>
      <a href=mailto:nullepart@mozilla.org>Envoyer l'email nulle part</a>
    </html>
    `,
  };

  getHtml(url: string): string | null {
    return this.data[url] ? this.data[url] : null;
  }
}
