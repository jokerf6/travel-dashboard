import React from "react";

export default function SearchIcon(props: { color: string }) {
  const { color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M17.5 18L14.5834 15.0833M16.6667 10.0833C16.6667 13.9954 13.4954 17.1667 9.58333 17.1667C5.67132 17.1667 2.5 13.9954 2.5 10.0833C2.5 6.17132 5.67132 3 9.58333 3C13.4954 3 16.6667 6.17132 16.6667 10.0833Z"
        stroke={color}
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
