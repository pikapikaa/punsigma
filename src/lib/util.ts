const removePunctuation = (text: string) => {
  return text.replace(/[.,\/#!$%\^&\*;:{}=\_`~()]/g, '');
};

export {removePunctuation};