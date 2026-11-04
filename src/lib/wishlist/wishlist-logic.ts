export function has(ids: readonly number[], id: number): boolean {
  return ids.includes(id)
}

export function toggle(ids: readonly number[], id: number): number[] {
  return has(ids, id) ? ids.filter((wishlistId) => wishlistId !== id) : [...ids, id]
}
