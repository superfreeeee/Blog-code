import { ITodoItem } from '@/types/todo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // http://localhost
  tagTypes: ['todos'],
  endpoints: (builder) => {
    return {
      fetchTodos: builder.query<ITodoItem[], number | void>({
        query: (limit = 10) => `/todos.json?limit=${limit}`, // /todoItems
        providesTags: [{ type: 'todos', id: 'all' }],
      }),
      updateTodos: builder.mutation({
        query: ({ id, ...patch }) => ({
          url: `/post/${id}`,
          method: 'PATCH',
          body: patch,
        }),
      }),
    };
  },
});

export const { useFetchTodosQuery, useUpdateTodosMutation } = apiSlice;
