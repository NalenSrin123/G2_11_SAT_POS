const STORAGE_KEY = 'restaurant-logo-drafts'

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function readLogoDrafts() {
  if (!canUseLocalStorage()) {
    return []
  }

  try {
    const rawDrafts = window.localStorage.getItem(STORAGE_KEY)
    if (!rawDrafts) {
      return []
    }

    const parsedDrafts = JSON.parse(rawDrafts)
    return Array.isArray(parsedDrafts) ? parsedDrafts : []
  } catch {
    return []
  }
}

function saveLogoDraft(draft) {
  const nextDrafts = [draft, ...readLogoDrafts()]

  if (canUseLocalStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts))
  }

  return nextDrafts
}

export { STORAGE_KEY, readLogoDrafts, saveLogoDraft }
