import Link from "next/link";
import { LuNotebookPen } from "react-icons/lu";
import { SlNotebook } from "react-icons/sl";

export default function Home() {
  return (
    <div className="md:w-[550px] sm:grid-cols-1 mx-auto grid md:grid-cols-2 gap-5">
      <Link href={"/add-log"}>
        <div className="text-2xl bg-purple-950 text-white font-bold flex items-center justify-center h-[150px]">
          <p className="flex items-center gap-2">
            Add log <LuNotebookPen />
          </p>
        </div>
      </Link>
      <Link href={"/view-logs"}>
        <div className="text-2xl bg-purple-950 text-white font-bold flex items-center justify-center h-[150px]">
          <p className="flex items-center gap-2">
            View logs <SlNotebook />
          </p>
        </div>
      </Link>
    </div>
  );
}
