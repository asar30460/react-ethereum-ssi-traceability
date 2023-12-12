import { useState, useEffect, Fragment } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { FeedCard } from "./feed-components";

function createData(title, chHeader, value) {
  return { title, chHeader, value };
}
const Feed = ({ ethersProvider, ethersSigner }) => {
  const [ethersInfo, setethersInfo] = useState([]);

  useEffect(() => {
    async function fetchEthersInfo() {
      const strAccount = ethersSigner["address"];
      const blockNumber = await ethersProvider.getBlockNumber();
      const block = await ethersProvider.getBlock(blockNumber);
      const latestBlockTimestamp = await block.timestamp;

      setethersInfo([
        createData(
          "Remote Procedure Call Server",
          "RPC伺服器",
          "Localhost:8545"
        ),

        createData(
          "Connected Account",
          "連線帳戶",
          `${strAccount.slice(1, 5)}...${strAccount.slice(-5, -1)}`
        ),
        createData(
          "Chain ID",
          "鏈識別碼",
          ethersProvider._network["chainId"].toString()
        ),
        createData("Latest Block", "目前區塊編號", blockNumber),
        createData(
          "Current Timestamp",
          "目前時間",
          parseInt(Date.now() / 1000)
        ),
        createData(
          "Timestamp of Previous Block",
          "上個區塊時間",
          latestBlockTimestamp
        ),
      ]);
    }
    fetchEthersInfo(); // For first rendering.
    setInterval(() => fetchEthersInfo(), 1000);
  });

  return (
    <Grid
      container
      spacing={2}
      justifyContent="flex-start"
      alignItems="stretch"
    >
      {ethersInfo.map((idx) => (
        <Fragment key={idx.title}>
          <Grid item xs={12} sm={6} md={3}>
            <FeedCard
              chHeader={idx.chHeader}
              Header={idx.title}
              value={idx.value}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
};

export default Feed;
