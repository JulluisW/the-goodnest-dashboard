import { useEffect, useState } from "react";

type FetchFn<T> = () => Promise<T[]>;
type CreateFn<TInput, T> = (data: TInput) => Promise<T>;
type UpdateFn<T> = (id: string, data: T) => Promise<{ success: boolean }>;
type DeleteFn = (id: string) => Promise<{ success: boolean }>;

export function useCollection<T, TInput>(
  fetchFn: FetchFn<T>,
  createFn: CreateFn<TInput, T>,
  updateFn: UpdateFn<T>,
  deleteFn: DeleteFn
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const data = await fetchFn();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: TInput) => {
    const result = await createFn(item);
    await fetchAll();
    return result;
  };

  const updateItem = async (id: string, item: T) => {
    await updateFn(id, item);
    await fetchAll();
  };

  const deleteItem = async (id: string) => {
    await deleteFn(id);
    setItems((prev) => prev.filter((i: any) => i.id !== id));
  };

  return {
    items,
    loading,
    createItem,
    updateItem,
    deleteItem,
    refetch: fetchAll,
  };
}
