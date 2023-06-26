'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <main className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button className="btn btn-error btn-sm text-xs text-white capitalize"
                onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
                }
            >
                Try again
            </button>
        </div>
    </main>
  )
}