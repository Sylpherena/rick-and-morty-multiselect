import React, { useCallback, useEffect, useRef } from 'react';

type PaginatedFetchOptions = {
  enabled: boolean;
};

export type PaginatedFetchResult<T> = {
  items: T[];
  hasNextPage: boolean;
};

type PaginatedFetchProps<T> = {
  fetchQuery: (page: number, controller: AbortController) => Promise<PaginatedFetchResult<T>>;
  options?: PaginatedFetchOptions;
  dependencies: React.DependencyList;
};

export function usePaginatedFetch<T>(props: PaginatedFetchProps<T>) {
  const { fetchQuery, options = { enabled: true }, dependencies } = props;

  const { enabled } = options;

  const [results, setResults] = React.useState<T[]>([]); //Options from backend
  const [isLoading, setLoading] = React.useState(false); //Loading state

  const [page, setPage] = React.useState<number>(1); //Page state
  const [hasNextPage, setHasNextPage] = React.useState(true); //Has next page state

  // To memoize controller for future use in fetchNextPage
  const controllerRef = useRef<AbortController | null>(null);

  //Backend call to get options when page increments
  const fetchNextPage = useCallback(async () => {
    if (hasNextPage) {
      setLoading(true);

      const result = await fetchQuery(page + 1, controllerRef.current!);

      setResults((prevState) => [...prevState, ...result.items]);
      setPage((prev) => prev + 1);
      setHasNextPage(result.hasNextPage);
      setLoading(false);
    }
  }, [fetchQuery, page, hasNextPage]);

  //Backend call to get options when dependencies change
  useEffect(() => {
    // Controller to abort unnecessary calls
    controllerRef.current = new AbortController();

    const fetchOptions = async () => {
      if (enabled) {
        setLoading(true);

        const result = await fetchQuery(1, controllerRef.current!);

        setResults(result.items);
        setPage(1);
        setHasNextPage(result.hasNextPage);
        setLoading(false);
      }
    };

    fetchOptions();
    return () => {
      //Abort axios call on cleanup
      controllerRef.current?.abort();
    };
  }, [enabled, ...dependencies]);

  return {
    isLoading,
    results,
    fetchNextPage
  };
}
