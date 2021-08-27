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

export const postApi = async (api, params) => {
  const result = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.body),
  });
  return await result.json();
};
