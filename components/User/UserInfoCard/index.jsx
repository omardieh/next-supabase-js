import Image from "next/image";
import classes from "./UserInfoCard.module.css";

export const UserInfoCard = ({
  name,
  email,
  email_verified,
  picture,
  children,
}) => {
  return (
    <div className={classes.user_info_card}>
      <Image
        unoptimized={true}
        width={"50"}
        height={"50"}
        src={picture}
        alt={name}
      />
      <ul>
        {[name, email, email_verified].map((e, i) => (
          <li key={i}> {i !== 2 ? e : e ? "verified" : "not verified"} </li>
        ))}
        {children}
      </ul>
    </div>
  );
};
