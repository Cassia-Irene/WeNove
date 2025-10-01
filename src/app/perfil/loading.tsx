import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFF] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#88a51d] mx-auto mb-4" />
        <p className="text-[#0c3729] font-dosis">Carregando perfil...</p>
      </div>
    </div>
  );
}