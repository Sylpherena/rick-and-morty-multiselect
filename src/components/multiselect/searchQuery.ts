import { PaginatedFetchResult } from '@/src/utils/usePaginatedFetch';
import axios, { AxiosError } from 'axios';

export type Option = { id: number; name: string; image: string; episode: string[] };

const url = 'https://rickandmortyapi.com/api/character';

export const searchByInput = async (
  searchInput: string,
  page: number,
  controller: AbortController,
  onError?: (errorMessage: string) => void
): Promise<PaginatedFetchResult<Option>> => {
  const result: PaginatedFetchResult<Option> | void = await axios
    .get(url, {
      params: {
        page: page,
        name: searchInput
      },
      signal: controller.signal, // To abort signal when multiple calls sent
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'private' // To cache requests
      }
    })
    .then(({ data }) => {
      return { items: data?.results, hasNextPage: !!data?.info.next };
    })
    .catch((error: Error | AxiosError) => {
      if (controller.signal.aborted) return; //No toast shown when backend call aborted
      if (axios.isAxiosError(error)) {
        onError?.(error.response ? error.response?.data.error : error.message); //Toast show logic
      } else {
        onError?.(error.message);
      }
    });

  return result ?? { items: [], hasNextPage: false };
};
