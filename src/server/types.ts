export default interface IJobData {
  id: string;
  address: string;
  benefits: string[];
  createdAt: Date;
  description: string;
  email: string;
  employment_type: string[];
  location: { lat: number; long: number };
  name: string;
  phone: string;
  pictures: string[];
  salary: string;
  title: string;
  updatedAt: Date;
}

export type TJobDataPreview = {
  photo: string;
  title: string;
  name: string;
  address: string;
  creationDate: Date;
  id: string;
};
