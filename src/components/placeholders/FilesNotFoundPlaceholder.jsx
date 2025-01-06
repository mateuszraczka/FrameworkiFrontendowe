import Image from "next/image";

export default function FilesNotFoundPlaceholder() {
  return (
    <div className="w-full h-full flex justify-center items-center select-none">
      <div className="w-48 flex flex-col items-center">
        <Image
          src={"/not-files-found.png"}
          layout="responsive"
          alt="Files not found placeholder"
          width={16}
          height={9}
        ></Image>
        <span className="font-semibold text-xl">No files found</span>
      </div>
    </div>
  );
}
