import "./styles.css";
import "react-data-grid/lib/styles.css";


// async function format(filePath) {
//   try {
//       const [data, setData] = useState([]);

//       useEffect(() => {
//         async function fetchData() {
//           const response = await fetch(filePath);
//           const text = await response.text();
//           const parsedData = parse(text);
//           setData(parsedData);
//         }
//         fetchData();
//       }, []);

      
//       var formattedData = [];
//       for (let index = 0; index < data.repo.length; index++) {
//           var json = {};
//           json["id"] = index;
//           json["title"] = data.title;
//           json["repo"] = data.repo[index].url
//           formattedData.push(json);
//       }
//       console.log(formattedData);
//       return formattedData;
//   } catch (error) {
//       console.log(error);
//   }
// }

// const columns = [
//   {
//     name: "Title",
//     selector: (row) => row.title,
//     sortable: true
//   },
//   {
//     name: "Repo",
//     selector: (row) => row.repo,
//     sortable: true
//   }
// ];

// const rows = format("https://github.com/electric-capital/crypto-ecosystems/blob/master/data/ecosystems/c/celo.toml")

// export default function App() {
//   return <DataGrid columns={columns} rows={rows} />;
// }

import React from "react";
import CeloDataGrid from "./DataGrid";

function App() {
  return (
    <div>
      <h1>Celo Data</h1>
      <CeloDataGrid />
    </div>
  );
}

export default App;