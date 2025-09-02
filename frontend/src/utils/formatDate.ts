const formatDate = (dateString: string): string => {
  return new Date(dateString).toDateString()
} 

export default formatDate;