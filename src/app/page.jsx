import Home from '@/components/Home'
import { Suspense } from 'react'

function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[90vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <Home />
    </Suspense>
  )
}

export default Page