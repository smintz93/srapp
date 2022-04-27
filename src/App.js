import { useEffect, useState } from "react";
import "./App.css";
import WorldRanking from "./Pages/WorldRanking";

function App() {
  const friendsArray = [
    {
      name: "John",
      score: "0",
    },
    {
      name: "sam",
      score: "-16",
    },
    {
      name: "rob",
      score: "-31",
    },
    {
      name: "brett",
      score: "1",
    },
  ];
  const [friends, setFriends] = useState(friendsArray);
  const [updatedList, setUpdatedList] = useState([]);

  useEffect(() => {
    console.log("use effect called");
    let savedPlayers = localStorage.getItem("saved-people");
    savedPlayers = JSON.parse(savedPlayers);
    // setUpdatedList(savedPlayers);

    let listOfSavedNames = [];
    for (let i = 0; i < savedPlayers.length; i++) {
      listOfSavedNames.push(savedPlayers[i]);
    }

    // If score gets updated on STATE and that person is also in the saved players list
    // the score needs to be updated in the saved players list also
    // that saved players list is being saved in local storage so every time state changes the
    // local storage would have to be updated providing it matches the above information

    // Looping through intital STATE and savedPlayers list
    // if name appears in both of them

    // IDEAS:
    // let result = [];
    // let nameToCheck = "";
    // let scoreToUpdate = "";
    // for (var i = 0; i < friends.length; i++) {
    //   nameToCheck = friends[i].name;
    //   scoreToUpdate = friends[i].score;
    //   result.push([nameToCheck, scoreToUpdate]);
    // }
    // for (let i = 0; i < listOfSavedNames.length; i++) {
    //   let key = listOfSavedNames[i].name;
    //   console.log(key);
    //   let value = scoreToUpdate;
    //   let found = false;

    //   for (let k = 0; k < result.length; k++) {
    //     if (nameToCheck === key) {
    //       result[k].push(value);
    //       found = true;
    //       console.log(result);
    //     }
    //   }
    //   if (!found) {
    //     result.push([key, value]);
    //   }
    // }

    // set what is being mapped through
    // setUpdatedList(updatedList);
    // localStorage.setItem("saved-people", JSON.stringify(updatedList));
    // localStorage.getItem("saved-people", JSON.stringify(newArray));
  }, []);

  const moveClick = (friend) => {
    const friendInfo = {
      name: friend.name,
      score: friend.score,
    };

    setUpdatedList(updatedList.push(friendInfo));
    setUpdatedList([...updatedList]);
    localStorage.setItem("saved-people", JSON.stringify(updatedList));
  };

  const removePerson = (id) => {
    const updatedPeopleList = [...updatedList];
    // removing the element using splice
    updatedPeopleList.splice(id, 1);
    // updating the list
    localStorage.setItem("saved-people", JSON.stringify(updatedPeopleList));
    setUpdatedList(updatedPeopleList);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <WorldRanking /> */}
        <ul>
          {friends.map((friend, index) => (
            <li
              key={index}
              onClick={() => {
                moveClick(friend);
              }}
            >
              <span>name: {friend.name}</span> <span>age: {friend.age}</span>
              <span>age: {friend.score}</span>
            </li>
          ))}
        </ul>
        <ul>
          updated list
          {updatedList &&
            updatedList.map((watchedPerson, id) => (
              <li
                key={id}
                onClick={() => {
                  removePerson(id);
                }}
              >
                {watchedPerson.name} score: {watchedPerson.score}
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
