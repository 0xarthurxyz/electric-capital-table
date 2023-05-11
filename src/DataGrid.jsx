import React, { useState, useEffect } from "react";
import ReactDataGrid from "react-data-grid";
import * as toml from "toml";

function decodeBase64(encodedData) {
    if (typeof window === "undefined") {
        // Node.js environment
        const buffer = Buffer.from(encodedData, "base64");
        return buffer.toString("utf-8");
    } else {
        // Browser environment
        const decoder = new TextDecoder();
        const data = Uint8Array.from(atob(encodedData), (c) => c.charCodeAt(0));
        return decoder.decode(data);
    }
}

async function getDataFromgithub(owner, repo, path) {
    // A function to fetch files from github using the api

    let data = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    )
        .then((d) => d.json())
        .then((d) =>
            fetch(
                `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
            )
        )
        .then((d) => d.json())
        .then((d) => {
            console.log(`d.content + ${d.content}`);
            return decodeBase64(d.content);
        });
    return data;
}

function CeloDataGrid() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // define an async function that fetches data from github
        async function fetchData() {
            // parses toml data from Github
            const parsedString = await getDataFromgithub(
                "electric-capital",
                "crypto-ecosystems",
                "data/ecosystems/c/celo.toml"
            );
            console.log(`parsedString + ${parsedString}`);

            // converts toml data to json
            const parsedData = toml.parse(parsedString);
            console.log(parsedData, JSON.stringify(parsedData));

            // formats json data for the datagrid
            var formattedData = [];
            for (let index = 0; index < parsedData.repo.length; index++) {
                var json = {};
                json["id"] = index;
                json["title"] = parsedData.title;
                json["repo"] = parsedData.repo[index].url;
                formattedData.push(json);
            }

            // sets data
            setData(formattedData);
        }

        // call the async function defined above
        fetchData();
    }, []);

    // define columns for the datagrid
    const columns = [
        { key: "id", name: "ID", sortable: true },
        { key: "title", name: "Title", sortable: true },
        { key: "repo", name: "Repo", sortable: true },
    ];

    //
    if (!data) {
        return <div>Loading...</div>; // render loading message while data is being fetched
    }

    console.log(data, JSON.stringify(data));

    return <ReactDataGrid columns={columns} rows={data} />;
}

export default CeloDataGrid;
