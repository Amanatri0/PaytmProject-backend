interface BalanceProps {
  value: string | number | bigint;
}

export const Balance = ({ value }: BalanceProps) => {
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    //@ts-expect-error : The value should be number or string but it is not taking from the props
  }).format(value);

  return (
    <span className="flex items-center ">
      <div className="font-semibold text-2xl">Your balance</div>
      <div className="font-bold ml-4 text-xl text-green-500"> {amount}</div>
    </span>
  );
};
