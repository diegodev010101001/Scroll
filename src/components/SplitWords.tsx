import { Fragment } from "react";

type SplitWordsProps = {
  /** Texto a dividir. Las palabras entre *asteriscos* se marcan con <em>. */
  text: string;
  /**
   * true  → cada palabra lleva máscara (para revelarla subiendo desde abajo).
   * false → solo spans sueltos (para iluminar palabra por palabra).
   */
  mask?: boolean;
};

type Token = { word: string; emphasis: boolean };

function tokenize(text: string): Token[] {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .flatMap((chunk) => {
      const emphasis = chunk.startsWith("*") && chunk.endsWith("*");
      const clean = emphasis ? chunk.slice(1, -1) : chunk;
      return clean
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => ({ word, emphasis }));
    });
}

/**
 * Divide un texto en palabras animables sin romper su lectura: los espacios
 * siguen siendo texto real, así que lectores de pantalla y buscadores leen la
 * frase completa.
 */
export default function SplitWords({ text, mask = true }: SplitWordsProps) {
  const tokens = tokenize(text);

  return tokens.map((token, index) => {
    const content = token.emphasis ? <em>{token.word}</em> : token.word;
    return (
      <Fragment key={`${token.word}-${index}`}>
        {mask ? (
          <span className="word">
            <span className="word__inner" data-word>
              {content}
            </span>
          </span>
        ) : (
          <span data-word>{content}</span>
        )}
        {index < tokens.length - 1 ? " " : null}
      </Fragment>
    );
  });
}
