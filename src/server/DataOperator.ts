import IJobData from "./types";

class DataOperator {
  private jobs: IJobData[] = [];
  async loadJobs() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    try {
      const resposnse = await fetch(
        "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
        requestOptions
      );
      const jobs = await resposnse.json();
      this.jobs = jobs;
    } catch {
      throw new Error(
        "GetJobs.ts: Failed to fetch data from: https://api.json-generator.com/templates/ZM1r0eic3XEy/data"
      );
    }
  }
  get getJobsList() {
    return this.jobs;
  }
  async getJobsPreviewList() {
    if (!this.jobs.length) {
      await this.loadJobs();
    }
    return this.jobs.map((job: IJobData) => {
      return {
        photo: job.pictures[0],
        title: job.title,
        name: job.name,
        address: job.address,
        creationDate: job.createdAt,
        id: job.id,
      };
    });
  }
  async findJobDataById(id: string) {
    if (!this.jobs.length) {
      await this.loadJobs();
    }
    return this.jobs.find((job: IJobData) => job.id === id);
  }
}

export default new DataOperator();
