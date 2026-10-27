import type { ReactNode } from "react";
import { Highlight } from "./Highlight";

/** Split `text` around the first occurrence of `word` and wrap that word in <Highlight>. */
export function withHighlight(text: string, word?: string): ReactNode {
  if (!word) return text;
  const i = text.indexOf(word);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <Highlight>{word}</Highlight>
      {text.slice(i + word.length)}
    </>
  );
}
