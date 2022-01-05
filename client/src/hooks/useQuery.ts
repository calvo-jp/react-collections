import { useRouter } from 'next/router';

/**
 * @example
 * ```javascript
 * useQuery("page")
 * useQuery("page", "pageSize")
 * ```
 */
const useQuery = <T extends string>(...keys: T[]) => {
  const router = useRouter();
  const params: { [P in T]?: string | string[] } = {};

  for (const key of keys) params[key] = router.query[key];

  return params;
};

export default useQuery;
