import React, { useEffect, useState } from 'react';

const Player = ({mode, players , setPlayers}) => {
    // 페이지 로드 시 로컬스토리지에서 선수 불러오기
    useEffect(() => {
        const savedPlayers = JSON.parse(localStorage.getItem("players"));
        if (savedPlayers && savedPlayers.length > 0) {
            setPlayers(savedPlayers);
        }
    }, []);
    
    // 선수명 입력 처리
    const handlePlayerChange = (index, e) => {
        const newPlayers = [...players];
        newPlayers[index] = e.target.value;
        setPlayers(newPlayers);
    };

    // 추가 버튼 눌렀을 때 input 추가
    const addPlayer = () => {
        setPlayers([...players, ""]);
    };

    // 선수명 삭제
    const removePlayer = (index) => {
        const newPlayers = [...players];
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
    };

        
    // 로컬 스토리지에서 선수 정보를 불러오기
    const loadPlayersFromLocalStorage = () => {
        const savedPlayers = JSON.parse(localStorage.getItem("players"));
        if (savedPlayers && savedPlayers.length > 0) {
            setPlayers(savedPlayers);
            alert("저장된 선수 정보를 불러왔습니다.");
        } else {
            alert("저장된 선수 정보가 없습니다.");
        }
    };

    // 입력한 선수 정보를 로컬 스토리지에 저장
    const savePlayersToLocalStorage = () => {
        if (players.every((player) => player.trim() !== "")) {
            localStorage.setItem("players", JSON.stringify(players));
            alert("선수 정보가 저장되었습니다.");
        } else {
            alert("모든 선수 이름을 입력해주세요.");
        }
    };

    const [visibleList , setVisibleList] = useState(true);
    const handleToggle = () => {
        setVisibleList(!visibleList)
    }
    
    return (
        <div className="playerList">
            <h3 onClick={() => handleToggle()}>{mode} 선수 입력</h3>
            <button
                onClick={loadPlayersFromLocalStorage}
                className="btn-load"
            >
                불러오기
            </button>
            {
                visibleList &&
                <ul>
                    {players.map((player, index) => (
                        <li key={index}>
                            <label>선수 {index + 1}</label>
                            <input
                                type="text"
                                value={player}
                                onChange={(e) =>
                                    handlePlayerChange(index, e)
                                }
                                placeholder={`선수 ${
                                    index + 1
                                } 이름 입력`}
                            />
                            <button
                                onClick={() => removePlayer(index)}
                                className="btn-delete"
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            }
            <div className="btn-wrap" style={{marginTop:'5px'}}>
                <button onClick={addPlayer} className="btn-add">
                    선수 추가
                </button>
                <button
                    onClick={savePlayersToLocalStorage}
                    className="btn-save"
                >
                    저장
                </button>
            </div>
        </div>
    );
};

export default Player;