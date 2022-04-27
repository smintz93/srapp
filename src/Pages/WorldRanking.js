import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

function WorldRanking() {
  const [golfers, setGolfers] = useState([]);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const savedPlayers = localStorage.getItem("watched-golfers");
    if (savedPlayers) {
      setWatchList(JSON.parse(savedPlayers));
    }
  });
  useEffect(() => {
    axios
      .get(
        `https://feeds.datagolf.com/preds/get-dg-rankings?file_format=[ file_format ]&key=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        const responseGolfers = res.data.rankings;
        setGolfers(responseGolfers);
      });
  }, []);

  const playerClick = (player) => {
    // grab player name of what was clicked on
    // console.log(player.player_name);
    // add that player name to watchList
    // setWatchList(player.player_name);
    // allows first click to be pushed into new array

    // TO DO
    // bring over more data other than name
    const playerInfo = {
      playerName: player.player_name,
      rank: player.owgr_rank,
    };
    setWatchList(watchList.push(playerInfo));
    // add mulitple players to list
    setWatchList([...watchList]);
    console.log(watchList);
    localStorage.setItem("watched-golfers", JSON.stringify(watchList));

    // player cannot be added twice
  };

  const removePlayer = (id) => {
    const updatedWatchList = [...watchList];
    // removing the element using splice
    updatedWatchList.splice(id, 1);
    // updating the list
    localStorage.setItem("watched-golfers", JSON.stringify(updatedWatchList));
    setWatchList(updatedWatchList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>watch list:</p>
        <ul>
          {watchList.map((watchedPlayer, id) => (
            <li
              key={id}
              onClick={() => {
                removePlayer(id);
              }}
            >
              <a>
                {watchedPlayer.playerName} World Rank: {watchedPlayer.rank}
              </a>
            </li>
          ))}
        </ul>
        <p>list of players: </p>
        <ul>
          {golfers &&
            golfers.map((player) => (
              <li
                key={player.dg_id}
                onClick={() => {
                  playerClick(player);
                }}
              >
                wgr:{player.owgr_rank}
                name: {player.player_name}
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default WorldRanking;
