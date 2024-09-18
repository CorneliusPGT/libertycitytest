import { ChangeEventHandler, useEffect, useState } from "react";
import "./Status.css";
import { useDispatch } from "react-redux";
import { updateStatusThunk } from "../../redux/profileReducer";

type Props = 
{
  status: string,
  actualId: number | null,
  authId: number | null,

}

export let ProfileStatus: React.FC<Props> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const dispatch = useDispatch()

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  let activateEditMode = () => {
    if (props.actualId === props.authId) {
      setEditMode(true);
    }
  };

  let disableEditMode = () => {
    setEditMode(false);
    dispatch<any>(updateStatusThunk(status));
  };

  let onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <p onDoubleClick={activateEditMode}>{props.status}</p>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={disableEditMode}
            value={status}
          ></input>
        </div>
      )}
    </div>
  );
};
