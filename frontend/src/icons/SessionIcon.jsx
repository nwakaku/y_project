import React from "react";
export const SessionIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 25}
      height={size || height || 24}
      viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M21 7V15H6.85C5.28 15 4 16.28 4 17.85V7C4 3 5 2 9 2H16C20 2 21 3 21 7Z" fill="#839283"/>
      <path d="M21 15V18.5C21 20.43 19.43 22 17.5 22H7.5C5.57 22 4 20.43 4 18.5V17.85C4 16.28 5.28 15 6.85 15H21Z" fill="#292D32"/>
      <path d="M16.5 7.75H8.5C8.09 7.75 7.75 7.41 7.75 7C7.75 6.59 8.09 6.25 8.5 6.25H16.5C16.91 6.25 17.25 6.59 17.25 7C17.25 7.41 16.91 7.75 16.5 7.75Z" fill="#292D32"/>
      <path d="M13.5 11.25H8.5C8.09 11.25 7.75 10.91 7.75 10.5C7.75 10.09 8.09 9.75 8.5 9.75H13.5C13.91 9.75 14.25 10.09 14.25 10.5C14.25 10.91 13.91 11.25 13.5 11.25Z" fill="#292D32"/>
      </svg>
      
  );
};
