import {axiosInstance} from './api'

const candidatesApi = {
  removeCandidate: (id: number) => axiosInstance.post(`/candidate/delete/${id}`),
  getCandidate: (city: string, specialty: string, skills: string[]) =>
    axiosInstance.get(`/candidates?city=${city}&specialty=${specialty}&skills=${skills}`),
  getSomeCandidate: (id: number) => axiosInstance.get(`/candidate/${id}`),
  createCandidate: (data: any) => axiosInstance.post(`/candidate/add`, {data: data}),
  editCandidate: (data: any) => axiosInstance.post(`/candidate/update`, {data: data}),
  addResumeFileCandidate: (data: any) => axiosInstance.post(`/parse/cv`, {file: data}),
  addResumeZipCandidates: (data: any) => axiosInstance.post(`/parse/zip`, {file: data}),
  getParsStatusZip: (id: any) => axiosInstance.get(`/parse/status/${id}`),
  //     addPhotoCandidate: (data: any)=>axiosInstance.post(`/candidate/update`, {data: data}),
}

export default candidatesApi
