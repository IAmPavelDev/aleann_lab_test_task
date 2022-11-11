import React, { FC, RefObject, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DataOperator from "./server/DataOperator";
import IJobData from "./server/types";
import { AiOutlineStar } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs/";
import { FaChevronLeft } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import shortid from "shortid";

const SliderConstructor: FC<{ pics?: string[] }> = ({ pics }) => {
  const [slidesToShow, setSlidesToShow] = useState(window.innerWidth / 220);
  const SliderRef = useRef<RefObject<Slider> & Slider>(null);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSlidesToShow(window.innerWidth / 245);
    });
    return () =>
      window.removeEventListener("resize", () => {
        setSlidesToShow(window.innerWidth / 245);
      });
  });

  const preventor = (e: WheelEvent) => e.preventDefault();

  return (
    <div
      onWheel={(e) => {
        e.deltaY > 0
          ? SliderRef.current?.slickNext()
          : SliderRef.current?.slickPrev();
      }}
      onMouseOver={() => {
        if (window.innerWidth < 740)
          document.addEventListener("wheel", preventor, {
            passive: false,
          });
      }}
      onMouseOut={() => {
        if (window.innerWidth < 740)
          document.removeEventListener("wheel", preventor);
      }}
      className="mt-8"
    >
      <Slider
        {...{
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow: Math.min(slidesToShow, pics?.length ?? 0),
          slidesToScroll: 1,
          swipeToSlide: true,
          focusOnSelect: false,
          accessibility: false,
          arrows: false,
        }}
        ref={SliderRef}
      >
        {pics?.map((pic: string) => (
          <div key={shortid.generate()} className="px-1 outline-none">
            <img className="rounded-lg" src={pic} alt="attached" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const JobDetails = () => {
  const [IsError, setIsError] = useState<string>();
  const [JobData, setJobData] = useState<IJobData>();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    (async () => {
      const data = await DataOperator.findJobDataById(
        location.pathname.split("/")[2]
      );
      data ? setJobData(data) : setIsError("Can't find job details");
    })();
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      {IsError ? (
        IsError
      ) : (
        <div className="mx-auto max-w-[700px] overflow-hidden p-4">
          <div className="mt-2 text-[28px] font-bold text-[#3A4562]">
            Job Details
          </div>
          <div className="mt-9 flex select-none">
            <div className="flex cursor-pointer items-center">
              <AiOutlineStar className="h-5 w-5 text-[#3A4562]" />
              <div className="ml-3 leading-6 text-[#38415DD1]">
                Save to my list
              </div>
            </div>
            <div className="ml-9 flex cursor-pointer items-center">
              <BsShareFill className="text-[#38415D]" />
              <div className="ml-3 text-[#38415D]">Share</div>
            </div>
          </div>
          <div className="mt-8 text-2xl font-bold text-[#3A4562]">
            {JobData?.title}
          </div>
          <div className="flex justify-between">
            <div className="mt-5 text-xs font-light leading-6 text-[#38415D9A]">
              {"Posted on " +
                JobData?.createdAt
                  .toString()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("/") +
                ", at " +
                JobData?.createdAt.toString().slice(11, 16)}
            </div>
            <div className="mt-1">
              <div className="text-lg text-[#38415DD1]">Brutto, per year</div>
              <div className="flex items-center text-xl font-bold text-[#3A4562]">
                € {JobData?.salary}
              </div>
            </div>
          </div>
          <div className="mt-4 text-[18px] leading-6 tracking-[-0.5px] text-[#38415DD1]">
            {JobData?.description}
          </div>
          <div className="mt-11 text-xl font-bold leading-6 text-[#3A4562]">
            Responsopilities
          </div>
          <div className="text-[18px] leading-6 tracking-[-0.5px] text-[#38415DD1]">
            {JobData?.description}
          </div>
          <div className="mt-8 text-xl font-bold leading-6 text-[#3A4562]">
            Compensation & Benefits:
          </div>
          <div className="text-[18px] tracking-[-0.5px] text-[#38415DD1]">
            Our physicians enjoy a wide range of benefits, including:
            {JobData?.benefits.map((benefit: string) => (
              <div className="flex items-center gap-6">
                <div className="h-2 w-2 bg-[#384564A1]" />
                {benefit}
              </div>
            ))}
          </div>
          <div className="flex w-[100%] justify-center">
            <button className="mt-11 rounded-lg bg-[#384564] py-[18px] px-[30px] text-xs font-semibold text-white">
              APPLY NOW
            </button>
          </div>
          <div className="mt-32 text-[28px] font-bold text-[#3A4562]">
            Attached images
            <SliderConstructor pics={JobData?.pictures} />
          </div>
          <div className="mt-14 text-[28px] font-bold text-[#3A4562]">
            Additional info
            <hr className="mt-2 h-[1px] bg-[#3A4562]" />
            <div className="mt-4 text-[18px] font-normal">
              Employment type
              <div className="mb-6 flex  gap-2">
                {JobData?.employment_type.map((type: string) => (
                  <div className="mt-[10px] w-[222px] rounded-lg border-[1px] border-[#55699E4D] bg-[#A1B1DB] bg-opacity-30 py-4 text-center text-base font-bold">
                    {type}
                  </div>
                ))}
              </div>
              Benefits
              <div className="flex gap-2">
                {JobData?.benefits.map((benefit: string) => (
                  <div className="mt-[10px] w-[222px] rounded-lg border-[1px] border-[#FFCF00] bg-[#FFCF00] bg-opacity-[0.15] py-4 text-center text-base font-bold text-[#988B49]">
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="mt-[90px] mb-40 flex items-center rounded-lg bg-[#384564] bg-opacity-[0.15] py-4 pr-6 text-xs font-semibold text-[#3A4562]"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft className="mx-5 text-[22.2px]" /> RETURN TO JOB BOARD
          </button>
        </div>
      )}
    </>
  );
};

export default JobDetails;
