export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const truncateText = (text, length = 100) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};