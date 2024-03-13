import styles from "./page.module.css";

const dummy_data = [
  {
    referenceNumber: '2024/0648/T',
    address: "4 Netherhall Gardens London NW3 5RR", 
    description: "FRONT GARDEN: 3 x Leylandii (T1) - Prune height & width up to 2.5m & shape. REAR GARDEN: 1 x Walnut Tree (T2) - Prune height & width up to 2m & shape. 2 x Laurels & Elaeagnus (T3) - Prune height & width up to 2.5m & shape. 1 x Sycamore (T4) - Prune height & width up to 2m & shape. 4 x Cypress (T4) - Prune height & width up to 2.5m & shape. 2 x Leylandii (T5) - Prune height up to 3m, width 1.5m & shape. 5 x Laurels (T6a & T6b) - Prune height up to 2.5m, width 1.5m & shape. 1 x Robinia (T7) - Fell to ground level. 1 x Catalpa (T8) - Prune by up to 2m all around.",
    applicationType: "Trees",
    date: "19-02-2024",
    status: "registered"
  },
    {
    referenceNumber: '2024/0645/T',
    address: "4 Oak Hill Park London NW3 7LG", 
    description: "FRONT GARDEN: 1 x Oak (T1) - Reduce lower canopy on drive side by 2m - 3m, up to 6m in height. Row of Leylandii (G1) - Reduce or remove lower branches as appropriate in order to give 5m clearance along driveway.",
    applicationType: "Trees",
    date: "19-02-2024",
    status: "registered"
  }
]
const tableHead = ['Reference Number', 'Address', 'Description', 'Application Type', 'Date Submited', 'Status']
export default function Home() {
  return (
    <main >
      <table>
        <tr>
      {
        tableHead.map((thead, index) => (
          <th key={index}>{thead} <button>Up</button> <button>Down</button></th>
        ))
      }
      </tr>
      {
        dummy_data?.map((application, index : any) => (
          <tr key={index} >
          <td>{application.referenceNumber}</td>
          <td>{application.address}</td>
          <td style={{maxWidth: "40rem"}}>{application.description}</td>
          <td>{application.applicationType}</td>
          <td>{application.date}</td>
          <td>{application.status}</td>
          </tr>
        ))
      
      }
      </table>
    </main>
  );
}
