const numberFormatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 })
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export const formatDecimal = (num: number) => {
  return numberFormatter.format(num)
}

export const formatDate = (date: Date) => {
  return dateFormatter.format(date)
}
