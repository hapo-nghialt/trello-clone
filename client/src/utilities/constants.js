require('dotenv').config()

export const API_ROOT = process.env.REACT_APP_API_ROOT

export const MODAL_ACTION_CLOSE = 'MODAL_ACTION_CLOSE'
export const MODAL_ACTION_CONFIRM = 'MODAL_ACTION_CONFIRM'

export const LOCAL_STORAGE_TOKEN_NAME = 'nghialt-kanban'

export const initialImages = [
  'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/35f815bf6bb1f6d42fb314886657a2bd/photo-1637684990963-366531ce088a.jpg',
  'https://images.unsplash.com/photo-1637423086319-892cc1c3526b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1637345540120-38bb0bbb7871?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1595&q=80',
  'https://images.unsplash.com/photo-1637479758719-a8f1241435e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1111&q=80'
]

export const initialColors = [
  'rgb(0, 121, 191)',
  'rgb(210, 144, 52)',
  'rgb(81, 152, 57)',
  'rgb(176, 70, 50)',
  'rgb(137, 96, 158)'
]
