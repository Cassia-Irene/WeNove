export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cfe090] via-[#88a51d] to-[#0c3729] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Carregando perfil da empresa...</p>
      </div>
    </div>
  );
}