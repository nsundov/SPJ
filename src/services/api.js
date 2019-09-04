import callApi from "../utils/call-api";

export const getTransformers = () => callApi(`/transformers/`, { method: "GET"});
export const updateTransformer = (id, body) => callApi(`/transformers/${id}/`, { method: "PUT", body});
export const addTransformer = body => callApi(`/transformers/`, { method: "POST", body});
export const deleteTransformer = id => callApi(`/transformers/${id}/`, { method: "DELETE",});