import React from "react";
import { useRouter } from "next/navigation";
import { VscOrganization } from "react-icons/vsc";
import { Separator } from "@/components/ui/separator";
import { SlFire } from "react-icons/sl";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlineFeedback } from "react-icons/md";
import { VscGraphLine } from "react-icons/vsc";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

const ManagerList = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row justify-between h-screen w-full ">
      {/* menu items */}
      <Separator orientation="vertical" className="grow-0 mx-2" />

      <ul className="flex flex-col grow ">
        <li>
          <Link
            href="/manager/Organization"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/manager/Organization"
                ? "bg-[#f7fafc] text-blue"
                : ""
            }`}
          >
            <VscOrganization size={20} />
            <p>Organization</p>
          </Link>
        </li>
        <li>
          <Link
            href="/manager/Request"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer ${
              pathname === "/manager/Request" ? "bg-[#f7fafc] text-blue" : ""
            } hover:text-blue`}
          >
            <MdOutlineGroupAdd size={25} />
            <p>Request</p>
          </Link>
        </li>

        <li>
          <Link
            href="/manager/Metrics"
            className={`flex gap-2 items-center rounded-md cursor-pointer py-5 px-4 hover:text-blue ${
              pathname === "/manager/Metrics" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <VscGraphLine size={20} />
            <p>Metrics</p>
          </Link>
        </li>

        <li>
          <Link
            href="/setting"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/setting" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <IoMdSettings size={20} />
            <p>Settings</p>
          </Link>
        </li>
        <Separator orientation="horizontal" />

        <li>
          <Link
            href="/Profile"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/Profile" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <CgProfile size={20} />
            <p>Profile</p>
          </Link>
        </li>
        <li>
          <Link
            href="/Help"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/Help" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <IoMdHelpCircleOutline size={20} />
            <p>Help</p>
          </Link>
        </li>
        <li>
          <Link
            href="/FeedBack"
            className={`flex gap-2 items-center rounded-md py-5 px-4 cursor-pointer hover:text-blue ${
              pathname === "/FeedBack" ? "bg-[#f7fafc] text-blue" : ""
            }`}
          >
            <MdOutlineFeedback size={20} />
            <p>Send FeedBack</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ManagerList;
