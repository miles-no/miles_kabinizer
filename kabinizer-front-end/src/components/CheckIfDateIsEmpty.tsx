const checkIfDateIsEmpty = (str: string | undefined) => {
  if (!str || str.trim().length === 0) return false;
  return true;
};

export default checkIfDateIsEmpty;
