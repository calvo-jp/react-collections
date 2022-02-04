import { useRouter } from 'next/router';

const useQuery = <T extends string>(...keys: T[]) => {
  const router = useRouter();
  const params: { [P in T]?: string | string[] } = {};

  for (const key of keys) params[key] = router.query[key];

  return {
    ...params,

    __get__(key: keyof typeof params) {
      return [params[key]].flat().at(0);
    },

    __getAll__(key: keyof typeof params) {
      const v = params[key];

      return !!v ? (Array.isArray(v) ? v : [v]) : [];
    },
  };
};

export default useQuery;
