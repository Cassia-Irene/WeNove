/**
 * Utilitário para geração de avatars baseados no nome do usuário
 * Utiliza a API do DiceBear para gerar avatars consistentes e determinísticos
 */

/**
 * Gera uma URL de avatar baseada no nome do usuário
 * @param name - Nome do usuário para usar como seed
 * @param style - Estilo do avatar (padrão: 'avataaars')
 * @param size - Tamanho do avatar em pixels (padrão: 100)
 * @returns URL do avatar gerado
 */
export function generateAvatar(
  name: string, 
  style: string = 'adventurer-neutral', 
  size: number = 100
): string {
  if (!name || name.trim().length === 0) {
    // Fallback para nome vazio
    name = 'user';
  }

  // Limpar e normalizar o nome para usar como seed
  const seed = name.trim().toLowerCase().replace(/\s+/g, '-');
  
  // Usar DiceBear API para gerar avatar consistente
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&size=${size}`;
}

/**
 * Gera uma URL de avatar com estilo específico para o WeNove
 * @param name - Nome do usuário
 * @returns URL do avatar com estilo personalizado
 */
export function generateWeNoveAvatar(name: string): string {
  return generateAvatar(name, 'adventurer-neutral', 120);
}

/**
 * Gera um hash simples baseado no nome para consistência
 * @param name - Nome do usuário
 * @returns Hash numérico baseado no nome
 */
function simpleHash(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    const char = name.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Converter para 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Gera avatar com cores baseadas no hash do nome
 * @param name - Nome do usuário
 * @returns URL do avatar com cores consistentes
 */
export function generateColoredAvatar(name: string): string {
  const hash = simpleHash(name);
  const colors = ['blue', 'green', 'purple', 'orange', 'red', 'yellow'];
  const selectedColor = colors[hash % colors.length];
  
  const seed = name.trim().toLowerCase().replace(/\s+/g, '-');
  return `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundColor=${selectedColor}&size=120`;
}