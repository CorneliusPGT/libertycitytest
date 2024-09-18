import { createSelector } from "reselect";
import { AppStateType } from "./reduxStore";


export const baseSelectUsers = (state: AppStateType) =>
{
    return state.usersPage.users;
}

export const selectUsers = createSelector(baseSelectUsers, (users) =>
{
    return users;
})

export const selectPageSize = (state: AppStateType) =>
{
    return state.usersPage.pageSize
}

export const selectTotalCount = (state: AppStateType) =>
{
    return state.usersPage.totalCount
}

export const selectCurrentPage = (state: AppStateType) =>
{
    return state.usersPage.currentPage
}

export const selectLoading = (state: AppStateType) =>
{
    return state.usersPage.isLoading
}

export const selectloadFollow = (state: AppStateType) =>
{
    return state.usersPage.loadFollow
}

export const selectFilterUsers = (state: AppStateType) =>
{
    return state.usersPage.filter
}