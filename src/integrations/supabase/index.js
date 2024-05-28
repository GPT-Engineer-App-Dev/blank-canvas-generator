import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();

export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

// Custom hook to fetch data from Supabase
export function useSupabaseQuery(key, queryFn, options) {
    return useQuery(key, async () => {
        const { data, error } = await queryFn(supabase);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }, options);
}

// Custom hook to mutate data in Supabase
export function useSupabaseMutation(mutationFn, options) {
    const queryClient = useQueryClient();
    return useMutation(async (variables) => {
        const { data, error } = await mutationFn(supabase, variables);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }, {
        ...options,
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });
}

// Include the new code under
