import React from "react";

type Props = 
{
  text: string,
  id: number
}

const Message: React.FC<Props> = (props) => {
  return (
    <div>
      <div className="message">{props.text}</div>
    </div>
  );
};

export default Message;
