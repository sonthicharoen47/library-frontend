export const getWithTokenApi = async (api, params) => {
  const result = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });
  return await result.json();
};
