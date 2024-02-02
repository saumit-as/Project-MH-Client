import Link from "next/link";

const page = () => {
  return (
    <div className="flex justify-center mt-24">
      <div className="flex flex-col space-y-4">
        <div className="border py-4 px-4 rounded-2xl flex justify-between">
          <p className="mr-6">Anxiety</p>
          <Link href={"/assessment/anxiety"}>{"->"}</Link>
        </div>
        <div className="border py-4 px-4 rounded-2xl flex justify-between">
          <p className="mr-6">Depression</p>
          <Link href={"/assessment/depression"}>{"->"}</Link>
        </div>
        <div className="border py-4 px-4 rounded-2xl flex justify-between">
          <p className="mr-6">Gaming Addiction</p>
          <Link href={"/assessment/gaming-addiction"}>{"->"}</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
