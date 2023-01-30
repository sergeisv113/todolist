import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../../API/todolists-api";
import {Dispatch} from "redux";

/* type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
*/

// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
/*export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS',
    todolists: Array<TodolistDomainType>
}*/


/*let todolistId1 = v1()
let todolistId2 = v1()*/

/*const initialState: Array<TodoListType> = [
    {id: todolistId1, title: "What to buy", filter: 'all'},
    {id: todolistId2, title: "What to learn" , filter: 'all'}
]*/
const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST': {
           /* return [ {
                id: action.todolistId,// общий id для task & todolist
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]*/
            // const newTodolist: TodolistDomainType = {...action.todolist, filter: "all"}
            // return [newTodolist, ...state]
            return [{...action.todolist, filter: "all"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            /*const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]*/
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
         /*   const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter
            }
            return [...state]*/
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: "all"}))

        default:
            // throw new Error('Error')
            return state
    }
}
// func action creator


/* type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
} */
// type  RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
/*export const RemoveTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}*/
export const removeTodolistAC = (todolistId: string) => ({type: "REMOVE-TODOLIST", id: todolistId}) as const

// export const AddTodolistAC = (newTodolistTitle: string) => ({type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1()}) as const
export const addTodolistAC = (todolist:  TodolistType ) => ({type: "ADD-TODOLIST", todolist}) as const

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => ({type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTodolistTitle}) as const

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType ): ChangeTodolistFilterActionType => ({type: "CHANGE-TODOLIST-FILTER",id: todolistId, filter: filter}) as const

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists}) as const

// export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//     return {type: "CHANGE-TODOLIST-FILTER", id: id, filter: filter}
// }
//react => redux => api
/*export const fetchTodolistsThunk = (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
    .then((res) => {
        dispatch(setTodolistsAC(res.data))
    })
}*/


//thunc-creator

export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
        todolistsApi.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistsApi.deleteTodolists(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const addTodolistsTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistsApi.createTodolists(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
}

export const changeTodolistsTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistsApi.updateTodolists(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
            })
}

//types

type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

type ActionType =
/* | RemoveTodolistActionType
 | AddTodolistActionType
 | ChangeTodolistTitleActionType
 | ChangeTodolistFilterActionType*/
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export default todolistsReducer
