"use client"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

type Props = {}

type Todo = {
    userId?: number;
    id: number;
    title?: string;
    completed?: boolean
}

const TestPage = (props: Props) => {
    const {data, isLoading, error} = useQuery({
        // queryKey: ["todos"],
        queryFn: async () => {
            const {data} = await axios.get("https://jsonplaceholder.typicode.com/todos")
            return data
        }
    })


    console.log(data)
  return (
      <div className='flex items-center justify-center h-screen'>
        {isLoading && <h1>Loading...</h1>}  
        {data?.map((todo) => (
            <div key={todo.id}>
                <h1>{todo.title}</h1>
            </div>
        ))}
        {/* {error && <h1>Failed to fetch data</h1>} */}
        {/* {data?.map(todo => {
            <div key={todo.id}>
                <h1>{todo.title}</h1>
                <h2>Second title</h2>
            </div>
        })} */}
    </div>
  )
}

export default TestPage