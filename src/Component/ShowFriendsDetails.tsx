interface UserProps {
  otherUserDetails: {
    email: string;
    id: number | string;
    username: string;
  };
}

export function ShowFriendsDetails({ otherUserDetails }: UserProps) {
  console.log(otherUserDetails);

  return (
    <div className=" ml-[100px] absolute h-[50%] w-[40%] md:w-[20%] bg-amber-50 border z-50 rounded-3xl p-5 text-black">
      {/* <label>{user.id} </label> */}
      <div>
        {/* {user.email} */}
        {otherUserDetails.email}
      </div>
    </div>
  );
}
