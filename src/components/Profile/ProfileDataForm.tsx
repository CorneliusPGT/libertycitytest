import { FieldArray, Form, Formik } from "formik";
import { Contacts as ContactType, Photos, Profile } from "../../Types/types";
import { ProfileStatus } from "./ProfileStatus";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/reduxHooks";

type Props =
  {
    profile: Profile,
    saveForm: SubmitHandler<Profile>,
    actualId: number | null,
    authId: number | null,
    status: string
  }



export const ProfileDataForm: React.FC<Props> = (props) => {

  const initialValues = props.profile


  const onSubmit = (values: Profile) => {
    debugger;
    props.saveForm(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, errors, touched, handleChange }) =>
      (
        <Form>
          <div>
            <button >Save</button>
          </div>
          <div>
            <input onChange={handleChange} value={values.fullName} name='fullName'></input>
          </div>
          <div>
            <textarea onChange={handleChange} value={values.aboutMe} name='aboutMe'></textarea>
          </div>
          <div>
            <input onChange={handleChange} id="lookingForAJob" type="checkbox" name='lookingForAJob'></input>
            <label htmlFor="lookingForAJob">Looking for a job</label>
          </div>
          <div>
            <textarea onChange={handleChange} value={values.lookingForAJobDescription} name='lookingForAJobDescription'></textarea>
          </div>
          <div>
            <b>Contacts</b>:{" "}
            <FieldArray name="contacts" render={() => {
              return <div>
                {Object.keys(props.profile.contacts).map((key) => {

                  return <div>
                    {key}: <input onChange={handleChange} name={"contacts." + key}></input>
                  </div>
                })}
              </div>
            }}></FieldArray>

          </div>
        </Form>
      )}

    </Formik>
  );
};
type ContactsTypes =
  {
    contactTitle: string,
    contactKey: string

  }
export const Contacts: React.FC<ContactsTypes> = ({ contactTitle, contactKey }) => {
  return (
    <div>
      {contactTitle}: {contactKey ? contactKey : "unknown"}
    </div>
  );
};
