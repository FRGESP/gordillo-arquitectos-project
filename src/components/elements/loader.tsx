import { Loader2 } from 'lucide-react'

function Loader() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-navy animate-spin" />
        <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  )
}

export default Loader