import React from "react";
import "./MyPosts.css";
import Post from "./Post/Post";
import { SubmitHandler, useForm } from "react-hook-form";
import { reset } from "redux-form";
import { Posts, Profile } from "../../../Types/types";
import { useSelector } from "react-redux";
import { AppStateType} from "../../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { addPost, getProfile } from "../../../redux/profileReducer";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";

type Props = {
profile: Profile | null
}


const MyPosts: React.FC<Props> = React.memo((props) => {

  const dispatch = useAppDispatch()
  const posts = useAppSelector((state) => state.profilePage.posts)

  type FormData =
    {
      postText: string
    }

  let postResult = posts.map((c) => (
    <Post profile={props.profile} message={c.message} likeCount={c.likeCount} />
  ));

  return (
    <div>
      <h3>My posts</h3>
      <Formik initialValues={{ postText: '' }}
        validate={values => {
          const errors = {} as { postText: string };
          if (!values.postText) {
            errors.postText = 'Can\'t mend a broken heart';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(addPost(values.postText));
          resetForm({})
          setSubmitting(false)
        }}>
        {({ values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting, }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <textarea onChange={handleChange} value={values.postText} disabled={isSubmitting} className={errors.postText ? "errorField" : ""}
                name="postText"
              ></textarea>
              {errors && (
                <div className="errorMessage">{errors.postText && touched.postText && errors.postText}</div>
              )}
            </div>
            <div>
              <button>Add post</button>
            </div>
          </form>
        )
        }
      </Formik>
      <div>{postResult}</div>
    </div >
  );
});

export default MyPosts;
