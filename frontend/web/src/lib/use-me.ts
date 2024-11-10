import { LOGOFF } from "@/apollo/mutations";
import { ME } from "@/apollo/queries";
import {
  ApolloError,
  MutationFunction,
  useMutation,
  useQuery,
} from "@apollo/client";

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

export interface MeData {
  me?: User;
  loading: boolean;
  error?: ApolloError;
  logoff: MutationFunction;
}

function useMe(): MeData {
  const { data, loading, error } = useQuery(ME);
  const [logoff] = useMutation(LOGOFF, {
    refetchQueries: [{ query: ME }],
  });

  const me: User = data ? data.me : null;

  return {
    me,
    loading,
    error,
    logoff,
  };
}

export default useMe;
