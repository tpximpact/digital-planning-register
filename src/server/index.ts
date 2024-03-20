"use server"

export async function getApplicationsByCouncil(council: string | string[]) {
const apiKey = council + '_api_key'
 const data = await fetch(`https://${council}.bops-staging.services/api/v2/planning_applications?page=1&maxresults=10`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env[apiKey]}`
  }
});

 return data.json()
// export async function getApplicationsByCouncil(page: number, resultsPerPage: number) {
//  const data = await fetch(`${process.env.NEXT_PUBLIC_BOPS_API}planning_applications?page=${page}&maxresults=${resultsPerPage}`, {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${process.env.southwark_api_key}`
//   }
// });
//  return data.json()
}

// This function search by int ID, in the future it should search by reference number
export async function getApplicationById(id:number) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BOPS_API}planning_applications/${id}`, {
      method: 'GET',
      headers: {
    'Authorization': `Bearer ${process.env.southwark_api_key}`
  }
  })
  return data.json()
}