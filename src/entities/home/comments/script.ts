export const formatDate= (dateString: string,t: any) => {
  const now = new Date()
  const past = new Date(dateString)
  const diffMs = now.getTime() - past.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return t("time.seconds", { count: seconds })
  if (minutes < 60) return t("time.minutes", { count: minutes })
  if (hours < 24) return t("time.hours", { count: hours })
  if (days < 7) return t("time.days", { count: days })
  if (weeks < 4) return t("time.weeks", { count: weeks })
  if (months < 12) return t("time.months", { count: months })
  return t("time.years", { count: years })
}