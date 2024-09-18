import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  name: string,
  id: number
}

const DialogItems: React.FC<Props> = (props) => {
  return (
    <div>
      <NavLink to={`/dialogs/${props.id}`} className="dialog">
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItems;