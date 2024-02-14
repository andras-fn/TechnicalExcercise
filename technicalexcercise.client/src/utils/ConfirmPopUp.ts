export const confirmPopUp = (message: string)=>{
    if (confirm(message)) {
        return true
      } else {
        return false
      }
}