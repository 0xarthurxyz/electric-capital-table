import React, { useState, useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import * as toml from 'toml';


function decodeBase64(encodedData) {
    if (typeof window === 'undefined') {
      // Node.js environment
      const buffer = Buffer.from(encodedData, 'base64');
    //   console.log(`buffer.toString('utf-8') + ${buffer.toString('utf-8')}`)
      return buffer.toString('utf-8');
    } else {
      // Browser environment
      const decoder = new TextDecoder();
      const data = Uint8Array.from(atob(encodedData), c => c.charCodeAt(0));
    //   console.log(`decoder.decode(data) + ${decoder.decode(data)}`)
      return decoder.decode(data);
    }
  }

    async function getDataFromgithub (owner, repo, path) { 
    // A function to fetch files from github using the api 
    
    let data = await fetch (
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      )
        .then (d => d.json ())
        .then (d =>
          fetch (
            `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
          )
        )
        .then (d => d.json ())
        .then (d => {
          console.log(`d.content + ${d.content}`)
            return decodeBase64(d.content);
        });
        return data;
}

function CeloDataGrid() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
    //   const response = await fetch(
    //     "https://raw.githubusercontent.com/electric-capital/crypto-ecosystems/master/data/ecosystems/c/celo.toml"
    //   );
      const parsedString = await getDataFromgithub("electric-capital", "crypto-ecosystems", "data/ecosystems/c/celo.toml");
      console.log(`parsedString + ${parsedString}`);
    //   const text = await response.text();
    //   const parsedData = parse(text);
        const parsedData = toml.parse(parsedString);
        console.log(parsedData, JSON.stringify(parsedData));

      var formattedData = [];
      for (let index = 0; index < parsedData.repo.length; index++) {
          var json = {};
          json["id"] = index;
          json["title"] = parsedData.title;
          json["repo"] = parsedData.repo[index].url
          formattedData.push(json);
      }
    //   console.log(formattedData, JSON.stringify(formattedData));
      console.log(parsedData.repo[0].url);
      setData(formattedData);
    }
    fetchData();
  }, []);

  const columns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
    { key: "repo", name: "Repo" }
  ];

  if (!data) {
    return <div>Loading...</div>; // render loading message while data is being fetched
  }

  console.log(data, JSON.stringify(data));
  return <ReactDataGrid columns={columns} rows={data}  />;
}

export default CeloDataGrid;
