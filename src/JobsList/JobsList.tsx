import React, { FC, ReactNode, useEffect, useState } from "react";
import DataOperator from "../server/DataOperator";
import { TJobDataPreview } from "../server/types";
import style from "./JobsList.module.scss";
import { AiFillStar } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";

const Job: FC<{
  title: string;
  photo: string;
  address: string;
  creationDate: Date;
  departmentName: string;
  jobId: string;
}> = ({ title, photo, address, creationDate, departmentName, jobId }) => {
  return (
    <Link to={"job/" + jobId} className={style.wrapper__job}>
      <div className={style.job__photo}>
        <img alt="job profile" src={photo} />
      </div>
      <div className={style.job__info}>
        <div className={style.job__info__stats}>
          <div className={style.stats__bookmark}>
            <BsBookmark />
          </div>
          <div className={style.stats__rate}>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
          <div className={style.stats__date}>
            {"Posted on " +
              creationDate
                .toString()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/") +
              ", at " +
              creationDate.toString().slice(11, 16)}
          </div>
        </div>
        <div className={style.job__info__main}>
          <div className={style.info__main__title}>{title}</div>
          <div className={style.info__main__department}>{departmentName}</div>
          <div className={style.info__main__address}>
            <div>
              <ImLocation />
            </div>
            <div>{address}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const JobsList = () => {
  const [jobs, setJobs] = useState<ReactNode[]>([]);
  const [IsError, setIsError] = useState<boolean>(false);
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!jobs.length) {
      DataOperator.getJobsPreviewList().then((response: TJobDataPreview[]) => {
        if (!response) {
          setIsError(true);
        }
        setJobs(
          response.map((job) => (
            <div key={job.id}>
              <Job
                title={job.title}
                address={job.address}
                photo={job.photo}
                creationDate={job.creationDate}
                departmentName={job.name}
                jobId={job.id}
              />
            </div>
          ))
        );
        if (jobs) {
          setIsLoading(false);
        }
      });
    }
  });
  return (
    <div className={style.wrapper}>
      {IsError ? <>Failed to get data</> : IsLoading ? <>Loading...</> : jobs}
    </div>
  );
};

export default JobsList;
