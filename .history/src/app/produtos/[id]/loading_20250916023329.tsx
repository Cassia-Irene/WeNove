export default function Loading() {
  return (
    <div className="min-h-screen bg-[#efe8db] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#88a51d] mx-auto mb-4"></div>
        <p className="text-[#0c3729] font-medium">Carregando produto...</p>
      </div>
    </div>
  )
}
