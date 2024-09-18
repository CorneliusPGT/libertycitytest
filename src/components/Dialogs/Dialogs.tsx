import "./Dialogs.css";
import DialogItems from "./DialogItems/DialogItems";
import Message from "./Messages/Message";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form"
import { DialogType, MessagesType, sendMessageAC } from "../../redux/dialogsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { Formik } from "formik";
import { Navigate } from "react-router-dom";

type ErrorType = {
  message: string
}

const Dialogs: React.FC = (props) => {

  const dispatch = useDispatch()
  const dialogs = useSelector((state: AppStateType) => state.messagesPage.dialogs)
  const messages = useSelector((state: AppStateType) => state.messagesPage.messages)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  /*  const { register, reset, formState: { errors }, handleSubmit } = useForm<FormData>({}) */
  let dialogsElements = dialogs.map((el) => (
    <DialogItems name={el.name} id={el.id} />
  ));

  let messagesElement = messages.map((el) => (
    <Message text={el.message} id={el.id} />
  ));

  /*   const onSubmit: SubmitHandler<FormData> = (formData) => {
      dispatch(actions.sendMessageAC(formData.messageBody));
      reset()
    }; */
  if (!isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div>
      <Formik
        initialValues={{ message: '' }}
        validate={values => {
          const errors = {} as ErrorType;
          if (!values.message) {
            errors.message = 'Can\'t mend a broken heart';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(sendMessageAC(values.message));
          resetForm({})
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <input onBlur={handleBlur} type={"text"} onChange={handleChange} value={values.message} disabled={isSubmitting} name="message"></input>
              {
                /*  {errors.message && touched.message}  */
                <div className="errorMessage">{errors.message && touched.message && errors.message}</div>
              }
            </div>
            <div>
              <button>Отправить сообщение</button>
            </div>
          </form>
        )}
      </Formik>
      <section className="dialog-section">
        <div className="dialogs">{dialogsElements}</div>
        <div className="messages">{messagesElement}</div>
      </section>

    </div >
  );
};





export default Dialogs;
