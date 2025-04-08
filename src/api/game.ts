import type { Emoji } from '@/types/api'

export const getEmojis = async (category: string): Promise<Emoji[]> => {
  const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${category}`)

  if (!response.ok) {
    throw new Error('failed')
  }

  return await response.json()
}
