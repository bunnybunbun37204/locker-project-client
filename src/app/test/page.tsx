import { Img } from "@chakra-ui/react";
import * as React from "react";

function MyComponent() {
  return (
    <div className="bg-white flex flex-col justify-center px-16 py-12 items-start max-md:px-5">
      <span className="flex w-[650px] max-w-full flex-col ml-40 mt-24 mb-44 max-md:my-10">
        <Img
          loading="lazy"
          srcSet="..."
          className="aspect-[1.11] object-contain object-center w-[84px] overflow-hidden max-w-full self-start"
        />
        <div className="text-stone-900 text-opacity-90 text-5xl font-semibold whitespace-nowrap mr-14 mt-24 self-end max-md:text-4xl max-md:mr-2.5 max-md:mt-10">
          LOCKER
        </div>
        <div className="text-stone-800 text-center text-xl whitespace-nowrap mt-1.5 self-end">
          สโมสรนิสิตคณะวิทยาศาสตร์
        </div>
        <Img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0f68d26ea372d7a8ba6ef47075ccff8195551421453e6ed342b93fb6f4d87e1?"
          className="aspect-square object-contain object-center w-[98px] overflow-hidden max-w-full mr-24 mt-16 self-end max-md:mr-2.5 max-md:mt-10"
        />
        <span className="flex items-stretch gap-3 mr-11 mt-24 self-end max-md:mr-2.5 max-md:mt-10">
          <div className="border border-[color:var(--black,#000)] flex w-3.5 shrink-0 h-3.5 flex-col rounded-sm border-solid" />
          <div className="text-black text-center text-sm grow whitespace-nowrap">
            ยอมรับนโยบายการจัดเก็บส่วนบุคคล
          </div>
        </span>
        <span className="text-white text-opacity-90 text-center text-sm whitespace-nowrap justify-center items-stretch bg-stone-900 bg-opacity-90 mr-14 mt-5 px-5 py-3 rounded-2xl self-end max-md:mr-2.5">
          เข้าสู่ระบบ ผ่าน Chula SSO
        </span>
      </span>
    </div>
  );
}

export default MyComponent;


