"use server"

export async function getApplicationsByCouncil(council: string | string[], page: number, resultsPerPage: number) {
const apiKey = council + '_api_key'
let data: any;

if(council === 'camden') {data = await fetch(`${process.env.NEXT_PUBLIC_BOPS_API_DUMMY}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env[apiKey]}`
  }})
 } else { data = await fetch(`https://${council}${process.env.NEXT_PUBLIC_BOPS_API}planning_applications?page=${page}&maxresults=${resultsPerPage}`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${process.env[apiKey]}`
  }
})
 }

 return data.json()
}

// This function search by int ID, in the future it should search by reference number
export async function getApplicationById(id:number, council: string) {

  const apiKey = council + '_api_key'
  const data = await fetch(`https://${council}${process.env.NEXT_PUBLIC_BOPS_API}planning_applications/${id}`, {
      method: 'GET',
      headers: {
    'Authorization': `Bearer ${process.env[apiKey]}`
  }
  })
  return data.json()
}