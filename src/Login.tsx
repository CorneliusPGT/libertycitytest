

import { sendUser } from "./redux/authReducer";
import React, { useEffect } from "react";
import "./Login.css";
import { AppStateType } from "./redux/reduxStore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Formik, useFormik, useFormikContext, yupToFormErrors } from "formik";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "./redux/reduxHooks";

type FormData =
  {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
    server: string
  }

const Login: React.FC = () => {

  const dispatch = useAppDispatch()
  const captchaUrl = useSelector((state: AppStateType) => state.auth.url)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const formik = useFormik({
    initialValues: {
      password: '',
      rememberMe: false,
      captcha: ''
    } as FormData,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(sendUser(
        {
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
          captcha: values.captcha,
          setFieldError: formik.setFieldError
        }
      ));
      resetForm({})
      setSubmitting(false)
    }

  })

  if (isAuth) {
    return <Navigate to="/profile" />;
  } else
    return (
      <div>
        <h1>Login</h1>
        <Formik initialValues={
          {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
          } as FormData
        }
          onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {
            dispatch(sendUser(
              {
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                captcha: values.captcha,
                setFieldError: formik.setFieldError
              }
            ));
            resetForm({})
            setSubmitting(false)
          }
          }>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setStatus,
            handleSubmit,
            isSubmitting,
            setErrors }) => (<form onSubmit={handleSubmit}>
              <div >
                <input onChange={handleChange} value={values.email} className={errors.server && "commonError"}
                  placeholder="Email"
                  name="email"
                ></input>
              </div>
              <div>
                <input onChange={handleChange} value={values.password} className={errors.server && "commonError"}
                  type="password"
                  name="password"
                  placeholder="Password"
                ></input>
              </div>
              <div>
                <label>
                  <input onChange={handleChange} className={errors.server && "commonError"} name="rememberMe" type="checkbox"></input>
                  remember me
                </label>
              </div>
              <div>
                <div>
                  {captchaUrl !== null ? <div>
                    <img src={captchaUrl}></img>
                    <input onChange={handleChange} value={values.captcha} name="captcha"></input>
                  </div> : null}
                </div>
                <button>Log in</button>
                <div className="registerBlock">
                  <button><a className="registerLink" href="https://social-network.samuraijs.com/signUp">Register</a></button>
                  <p>Регистрацию не завезли, только с основного сайта</p>
                </div>
                {errors.server && (
                  <div style={{ color: "rgb(209, 95, 42)" }}>{errors.server}</div>
                )}
              </div>
            </form>)}


        </Formik>

      </div>

    );

};


export default Login;
