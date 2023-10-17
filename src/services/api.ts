export async function translateWord(word: string): Promise<string> {
  const temp = await fetch(
    `https://burlang.ru/api/v1/buryat-word/translate?q=${word}`,
  )
    .then(response => response.text())
    .then(res => res);
  return temp;
}
