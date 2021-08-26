export const postRentApi = async (api, params) => {
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
