import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaMailBulk } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import { IoMdArchive } from "react-icons/io";
import { SiTestcafe } from "react-icons/si";
import { IoLogoWechat } from "react-icons/io5";
import { MdLibraryBooks } from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";

export const menuArray = [
  {
    id: 1,
    icon: <TbLayoutDashboardFilled />,
    name: "Asosiy Sahifa",
    link: "home",
  },
  {
    id: 2,
    icon: <FaMailBulk />,
    name: "Arizalar",
    link: "applications",
  },
  {
    id: 3,
    icon: <MdBookmarkAdded />,
    name: "Qabul qilinganlar",
    link: "accepted-candidates",
  },
  {
    id: 4,
    icon: <IoMdArchive />,
    name: "Arxiv",
    link: "achive",
  },
  {
    id: 5,
    icon: <SiTestcafe />,
    name: "Tests",
    link: "tests",
  },
  {
    id: 6,
    icon: <IoLogoWechat />,
    name: "Muloqot",
    link: "chat",
  },
  {
    id: 7,
    icon: <MdLibraryBooks />,
    name: "Kutubxona",
    link: "library",
  },
  {
    id: 8,
    icon: <BsFillCollectionFill />,
    name: "Kolleksiya",
    link: "collection",
  },
];
