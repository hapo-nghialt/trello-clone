// onKeyDown
export const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter' || e.key === 'Escape') {
    e.preventDefault()
    e.target.blur()
  }
}

// Select all input values when click
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
}
