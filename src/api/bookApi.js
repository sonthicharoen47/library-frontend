export const getApi = async (api) => {
  const result = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await result.json();
};
