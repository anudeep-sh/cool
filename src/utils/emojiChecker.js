export const isOnlyEmojis = (text) => {
  const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji}\u200D)+$/gu;
  return emojiRegex.test(text);
};

export const ParseMessageWithEmojis = ({ message }) => {
  if (isOnlyEmojis(message)) {
    return <span style={{ fontSize: '20px' }}>{message}</span>;
  }
  return <p>{message}</p>;
};
