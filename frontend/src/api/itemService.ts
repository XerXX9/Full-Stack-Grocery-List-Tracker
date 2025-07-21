import axios from 'axios';

export interface Item {
  id: number;
  name: string;
  quantity?: number;
}

export interface ItemCreate {
    name: string;
    quantity?: number;
}
export interface ItemUpdatePayload {
    name?: string;
    quantity?: number;
}

const apiClient = axios.create({ 
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getItems = async (): Promise<Item[]> => {
    const response = await apiClient.get("/items/");
    return response.data;
}

export const postItem = async (itemData: ItemCreate): Promise<Item> => {
  const response = await apiClient.post("/items/", itemData);
  return response.data;
};

export const putItem = async (id: number, itemData: ItemUpdatePayload): Promise<Item> => {
  const response = await apiClient.put(`/items/${id}`, itemData);
  return response.data;
}

export const deleteItem = async (id: number): Promise<void> => {
  await apiClient.delete(`/items/${id}`);
}
