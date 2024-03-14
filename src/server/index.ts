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
}