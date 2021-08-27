export const postAccountApi = async (api, body) => {
  const result = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await result.json();
};

export const getAccountApi = async (api) => {
  const result = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await result.json();
};
