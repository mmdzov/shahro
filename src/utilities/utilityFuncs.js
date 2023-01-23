export const checkAlert = (alert) => {
  if (!alert || alert.has === 0) {
    return false;
  }
  return true;
};
