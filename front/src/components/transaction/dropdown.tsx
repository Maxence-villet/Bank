const Dropdown = () => {
  return (
    <div className="relative w-[230px]">
      <select style={{borderWidth:"3px"}}
        className=" text-[#002222]
          w-full 
          appearance-none              
          border-solid border-[#CBD2E0]
          py-2 pl-4 pr-10               
          rounded-[6px] text-[16px] h-[48px]
        "
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </select>

      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 inline-block"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <g transform="translate(-0,8)">
        <path
          d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.29289 7.70711C6.68342 8.09763 7.31658 8.09763 7.70711 7.70711L13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893Z"
          fill="#002222"
        />
        </g>
      </svg>
    </div>
  );
};

export default Dropdown;
