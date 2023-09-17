export const generateUniqueId = (() => {
  let id = 0;
  return () => {
    id += 5;
    return id;
  };
})();
