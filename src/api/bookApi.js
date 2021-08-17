export const getApi = async (api, token) => {
  const result = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await result.json();
};
