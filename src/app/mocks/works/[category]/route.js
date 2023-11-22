import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Work from "@/models/Work";

const items = [
  {
    _id: { $oid: "655c6dca8f58df40f39037d2" },
    title: "Creative Portfolio",
    desc: 'desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",\n',
    img: "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg",
    category: "websites",
  },
  {
    _id: { $oid: "655c6de48f58df40f39037d4" },
    title: "Minimal Single Product",
    desc: 'desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",\n',
    img: "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg",
    category: "websites",
  },
  {
    _id: { $oid: "655c6df28f58df40f39037d5" },
    title: "Strong Together Charity",
    desc: 'desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",\n',
    img: "https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms",
    category: "websites",
  },
  {
    _id: { $oid: "655c6d098f58df40f39037cc" },
    title: "Creative Portfolio",
    desc: '"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",',
    category: "applications",
    img: "https://images.pexels.com/photos/3130810/pexels-photo-3130810.jpeg",
  },
  {
    _id: { $oid: "655c6d298f58df40f39037cd" },
    title: "Minimal Single Product",
    desc: 'desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",\n',
    img: "https://images.pexels.com/photos/2103127/pexels-photo-2103127.jpeg",
    category: "applications",
  },
  {
    _id: { $oid: "655c6d688f58df40f39037ce" },
    title: "Strong Together Product",
    desc: 'desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur vel tenetur necessitatibus unde natus perspiciatis, amet cupiditate ducimus possimus, eaque ex autem id nobis eum dolorem. Neque eveniet fugiat tenetur?",\n',
    img: "https://images.pexels.com/photos/2916450/pexels-photo-2916450.jpeg",
    category: "applications",
  },
];

export const GET = async (request, { params }) => {
  const { category } = params;

  const newItems = items.filter((item) => item.category === category);
  try {
    return new NextResponse(JSON.stringify(newItems), { status: 200 });
  } catch (error) {
    return new NextResponse("Database error", { status: 500 });
  }
};
