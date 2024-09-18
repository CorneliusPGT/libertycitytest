import { usersAPI } from "../API/users-api";
import { Photos, UsersType } from "../Types/types";
import { AppStateType, BaseThunkType, InferActionsType } from "./reduxStore";

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 100,
  totalCount: 0,
  currentPage: 1,
  isLoading: false,
  loadFollow: [] as Array<number>,
  filter: {
    term: "",
    friend: null as null | string,
  },
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

export const usersReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  let stateCopy = { ...state };

  switch (action.type) {
    case "SET_USERS": {
      return { ...state, users: [...action.users] };
    }
    case "FOLLOW": {
      stateCopy.users = state.users.map((u) => {
        if (u.id === action.userId) {
          return { ...u, followed: true };
        }
        return u;
      });
      return stateCopy;
    }
    case "UNFOLLOW": {
      stateCopy.users = state.users.map((u) => {
        if (u.id === action.userId) {
          return { ...u, followed: false };
        }
        return u;
      });
      return stateCopy;
    }
    case "SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "SET_TOTAL_COUNT": {
      return { ...state, totalCount: action.count };
    }
    case "TOGGLE_FETCHING": {
      return { ...state, isLoading: action.isLoading };
    }
    case "TOGGLE_FOLLOWING": {
      return {
        ...state,
        loadFollow: action.loadFollow
          ? [...state.loadFollow, action.id]
          : state.loadFollow.filter((id) => id != action.id),
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filter: action.filter,
      };
    }
    default: {
      return state;
    }
  }
};

type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
export const actions = {
  updatePages: (page: number) => ({ type: "UPDATE_PAGES", page } as const),

  follow: (userId: number) => ({ type: "FOLLOW", userId } as const),

  unfollow: (userId: number) => ({ type: "UNFOLLOW", userId } as const),

  setUsers: (users: Array<UsersType>) =>
    ({ type: "SET_USERS", users } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),

  setFilter: (filter: FilterType) =>
    ({
      type: "SET_FILTER",
      filter: filter,
    } as const),

  setTotalCount: (count: number) =>
    ({ type: "SET_TOTAL_COUNT", count } as const),

  toggleFetching: (isLoading: boolean) =>
    ({
      type: "TOGGLE_FETCHING",
      isLoading,
    } as const),

  toggleFollowing: (loadFollow: boolean, id: number) =>
    ({
      type: "TOGGLE_FOLLOWING",
      loadFollow,
      id,
    } as const),
};

export const getUsersThunk =
  (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
  (dispatch) => {
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.toggleFetching(true));
    dispatch(actions.setFilter(filter));
    usersAPI
      .getUsers(currentPage, pageSize, filter.term, filter.friend)
      .then((response) => {
        dispatch(actions.toggleFetching(false));
        dispatch(actions.setUsers(response.data.items));
        dispatch(actions.setTotalCount(response.data.totalCount));
      });
  };

export const followThunk =
  (id: number): ThunkType =>
  (dispatch: any) => {
    dispatch(actions.toggleFollowing(true, id));
    usersAPI.follow(id).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(actions.follow(id));
        dispatch(actions.toggleFollowing(false, id));
      }
    });
  };

export const unfollowThunk =
  (id: number): ThunkType =>
  (dispatch: any) => {
    dispatch(actions.toggleFollowing(true, id));
    usersAPI.unfollow(id).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(actions.unfollow(id));
        dispatch(actions.toggleFollowing(false, id));
      }
    });
  };
