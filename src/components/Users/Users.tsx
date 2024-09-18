
import React, { useEffect, useState } from "react";
import "./Users.css";
import { Button, Space, DatePicker, version } from 'antd';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { FilterType, followThunk, getUsersThunk, unfollowThunk } from "../../redux/usersReducer";
import { useSelector } from "react-redux";
import { selectCurrentPage, selectFilterUsers, selectPageSize, selectTotalCount, selectUsers, selectloadFollow } from "../../redux/usersSelectors";
import { useDispatch } from "react-redux";
import queryString from "query-string";

type FormData =
  {
    term: string,
    friend: string | null
  }



export let Users: React.FC = () => {

  const users = useSelector(selectUsers)
  const totalCount = useSelector(selectTotalCount)
  const loadFollow = useSelector(selectloadFollow)
  const pageSize = useSelector(selectPageSize)
  const currentPage = useSelector(selectCurrentPage)
  const filter = useSelector(selectFilterUsers)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { search } = location.search

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormData>({
    criteriaMode: "all", defaultValues: { term: filter.term, friend: filter.friend }
  });

  const follow = (userId: number) => {
    dispatch<any>(followThunk(userId))
  }

  const unfollow = (userId: number) => {
    dispatch<any>(unfollowThunk(userId))
  }

  const onSubmit: SubmitHandler<FormData> = (formData) => {

    onFilterChanged(formData)
  }

  let onFilterChanged = (filter: FilterType) => {
    dispatch<any>(getUsersThunk(1, pageSize, filter));
  }
  let onPageChanged = (p: number) => {
    dispatch<any>(getUsersThunk(p, pageSize, filter));
  };

  useEffect(() => {
    dispatch<any>(getUsersThunk(currentPage, pageSize, filter));
  }, []);


  let pagesCount = Math.ceil(totalCount / pageSize);
  let [firstPage, setFirstPage] = useState(1);
  let [lastPage, setLastPage] = useState(10);
  let [currentPageS, setPage] = useState(currentPage)



  let pages = [];

  for (let i = firstPage; i <= lastPage; i++) {
    pages.push(i)
  }

  let nextPages = () => {

    if (lastPage + 10 <= pagesCount) {
      setFirstPage(firstPage += 10);
      setLastPage(lastPage += 10)
    }

    else {
      setLastPage(lastPage += pagesCount - lastPage);
      setFirstPage(firstPage += 10);

    }
  }

  let prevPages = () => {
    setFirstPage(firstPage -= 10);
    setLastPage(lastPage = firstPage + 9)
  }

  useEffect(() => {
    navigate({
      search: `?term=${filter.term}&friend=${filter.friend}`
    });
  }, [filter])

  useEffect(() => {
    const values = queryString.parse(location.search) as { term: string, page: string, friend: string }
    let actFilter = filter;
    if (!!values.term) actFilter = { ...actFilter, term: values.term as string }
    if (!!values.friend) actFilter = { ...actFilter, friend: values.friend === "null" ? "null" : values.friend === "true" ? "true" : "false" }
    dispatch<any>(getUsersThunk(currentPage, pageSize, actFilter));
  }, [])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  return (
    <div>
      <div className="topUsers">
        <div>
          {totalCount ? <ul className="pagination">
            {firstPage > 1 ? <button onClick={prevPages}>PREV</button> : null}
            {pages.map((p) => {
              return (
                <li
                  onClick={() => {
                    onPageChanged(p);
                  }}
                  className={p === currentPageS ? 'selectedPage' : undefined}
                >
                  {p}
                </li>
              );
            })}
            {lastPage < pagesCount ? <button onClick={nextPages}>NEXT</button> : null}

          </ul> : <div>Ничего не найдено</div>
          }

        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register("term")}></input>
          </div>
          <div>
            <button className="searchButton">Search</button>
          </div>
          <div>
            <select {...register("friend")}>
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </select>
          </div>
        </form>
      </div>
      {
        users.map((u) => (
          <div>
            <NavLink to={"/profile/" + u.id}>
              <img className="userAva"
                src={
                  u.photos.small == null
                    ? "https://seeklogo.com/images/P/public-enemy-logo-E860A8D3AD-seeklogo.com.png"
                    : u.photos.small
                }
              ></img>
            </NavLink>
            <div>
              <span>{u.name}</span>
            </div>
            <div>
              <span>{u.status}</span>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={loadFollow.some((id) => id === u.id)}
                  onClick={() => {
                    unfollow(u.id);
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={loadFollow.some((id) => id === u.id)}
                  onClick={() => {
                    follow(u.id);
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
