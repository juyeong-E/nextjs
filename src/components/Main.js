import Layout from "../Layout";
import { TournamentStyle } from "../styles/TournamentStyle";
import React, { useState } from "react";
import Player from "./player/player";
// import NextPlay from "./player/nextPlay";
import PlayList from "./player/playList";

const Main = ({ title }) => {
    const [mode, setMode] = useState(""); // 복식 or 단식 선택
    const [players, setPlayers] = useState([]); // 선수명 입력 관리
    const [playCnt, setPlayCnt] = useState(3);//기본 플레이 생성횟수
    const [tournament, setTournament] = useState([]); // 토너먼트 결과 저장
    const [winners, setWinners] = useState([]); // 이긴 팀 저장
    const [losers, setLosers] = useState([]); // 진 팀 저장

    // 모드가 바뀔 때마다 초기값 설정
    const handleModeChange = (e) => {
        const selectedMode = e.target.value;
        setMode(selectedMode);
        if (players.length === 0) {
            setPlayers(Array(selectedMode === "복식" ? 4 : 2).fill(""));
        }
    };

    // 토너먼트 플레이 횟수 입력 처리
    const handlePlayCnt = (e) => {
        let num = e.target.value;
    
        if(num.length > 1){
            return;
        }
    
        num = parseInt(num, 10);
        if (isNaN(num)) {
            return;
        }

        if (num > 5) {
            setPlayCnt(5);
        } else if (num < 1) {
            setPlayCnt(1);
        } else {
            setPlayCnt(num);
        }
    }
    

    // 랜덤으로 배열 섞기
    const shuffleArray = (array) => {
        return array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    };

    // 로컬 스토리지에서 선수 정보를 불러와 토너먼트 생성
    const generateTournament = () => {
        const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
        if (mode === "") {
            alert("복식 및 단식 모드를 선택해주세요");
            return;
        }
        if (mode === "복식" && storedPlayers.length < 4) {
            alert("복식 모드에서는 최소 4명의 선수가 필요합니다.");
            return;
        }
        if (mode === "단식" && storedPlayers.length < 2) {
            alert("단식 모드에서는 최소 2명의 선수가 필요합니다.");
            return;
        }
    
        let allTournaments = [];
    
        for (let tournamentCount = 0; tournamentCount < playCnt; tournamentCount++) {
            // 선수 리스트 랜덤 섞기
            let shuffledPlayers = shuffleArray([...storedPlayers]); // 복사해서 사용
    
            const matchSize = mode === "복식" ? 4 : 2;
    
            // 추가된 선수를 추적하기 위한 배열
            let additionalPlayers = [];
    
            // 남은 선수를 처리하는 로직
            const remainingPlayersCount = shuffledPlayers.length % matchSize;
            if (remainingPlayersCount > 0) {
                const remainingPlayers = shuffledPlayers.splice(
                    -remainingPlayersCount
                );
    
                const requiredAdditionalPlayers = matchSize - remainingPlayersCount;
    
                while (additionalPlayers.length < requiredAdditionalPlayers) {
                    const randomPlayer =
                        shuffledPlayers[
                            Math.floor(Math.random() * shuffledPlayers.length)
                        ];
                    if (!additionalPlayers.includes(randomPlayer)) {
                        additionalPlayers.push(randomPlayer);
                    }
                }
    
                shuffledPlayers.push(...remainingPlayers, ...additionalPlayers);
            }
    
            // 팀 또는 매치 구성
            const tournamentTeams = [];
            for (let i = 0; i < shuffledPlayers.length; i += matchSize) {
                const match = shuffledPlayers.slice(i, i + matchSize);
    
                // 추가된 선수가 포함된 매치에 isAdditional 속성을 추가
                const matchWithAdditionalFlag = match.map(player => {
                    return {
                        name: player,
                        isAdditional: additionalPlayers.includes(player), // 추가된 선수 여부 표시
                    };
                });
    
                if (mode === "복식") {
                    tournamentTeams.push({
                        type: "복식",
                        players:
                            matchWithAdditionalFlag.slice(0, 2).map(p => p.name).join(", ") +
                            " vs " +
                            matchWithAdditionalFlag.slice(2, 4).map(p => p.name).join(", "),
                        team: matchWithAdditionalFlag,
                        isBYE: false, // 부전승 체크
                    });
                } else {
                    tournamentTeams.push({
                        type: "단식",
                        players: matchWithAdditionalFlag[0].name + " vs " + matchWithAdditionalFlag[1].name,
                        team: matchWithAdditionalFlag,
                        isBYE: false, // 부전승 체크
                    });
                }
            }
    
            // 각 토너먼트 저장 + additionalPlayers 추가
            allTournaments.push({
                playIndex: tournamentCount,
                playList: tournamentTeams,
                additionalPlayersList: additionalPlayers, // 형제 레벨에 추가
            });
        }
    
        // 토너먼트 상태 저장
        setTournament(allTournaments);
    
    
        // 토너먼트를 로컬스토리지에 저장
        localStorage.setItem("tournament", JSON.stringify(allTournaments));
    };
    
    
    //토너먼트 저장
    const saveTornament = () => {
         // 토너먼트를 로컬스토리지에 저장
         localStorage.setItem("tournament", JSON.stringify(tournament));
    }

    //토너먼트 삭제
    const deleteTournament = () => {
        if(confirm('현재 토너먼트 리스트를 삭제합니다')){
            setTournament([])
        }
    }

    // 토너먼트 불러오기 함수
    const loadTournament = () => {
        const savedTournament = JSON.parse(localStorage.getItem("tournament"));
        if (savedTournament){
            if(savedTournament.length > 0) {
                setTournament(savedTournament);
                alert("저장된 토너먼트 정보를 불러왔습니다.");
            }else{
                alert("저장된 토너먼트 정보가 없습니다.");
            }
        } else {
            alert("저장된 토너먼트 정보가 없습니다.");
        }
    };

    // 토너먼트 순서 변경 함수 (위로 이동)
    const moveUp = (index, playIndex) => {
        if (index > 0) {
            // 기존 상태를 변경하지 않고 새로운 배열을 생성하여 업데이트
            const newTournament = [...tournament];
            const newPlayList = [...newTournament[playIndex].playList];

            // 순서를 변경
            [newPlayList[index], newPlayList[index - 1]] = [
                newPlayList[index - 1],
                newPlayList[index],
            ];

            // 새로운 상태로 갱신
            newTournament[playIndex].playList = newPlayList;
            setTournament(newTournament);
        }
    };

    // 토너먼트 순서 변경 함수 (아래로 이동)
    const moveDown = (index, playIndex) => {
        if (index < tournament[playIndex].playList.length - 1) {
            // 기존 상태를 변경하지 않고 새로운 배열을 생성하여 업데이트
            const newTournament = [...tournament];
            const newPlayList = [...newTournament[playIndex].playList];

            // 순서를 변경
            [newPlayList[index], newPlayList[index + 1]] = [
                newPlayList[index + 1],
                newPlayList[index],
            ];

            // 새로운 상태로 갱신
            newTournament[playIndex].playList = newPlayList;
            setTournament(newTournament);
        }
    };

    // 이긴 팀 선택 후 해당 팀을 다음 경기로 진행
    const selectWinner = (playIndex, index, winnerTeam, players) => {
        // 이긴 팀을 winners 배열에 추가
        const teamMembers = winnerTeam.split(",");

        // 이긴 팀을 winners 배열에 추가
        setWinners([...winners, teamMembers]);

        // 패자를 자동으로 losers 배열에 추가
        const loser = players.find((player) => !teamMembers.includes(player));
        setLosers([...losers, loser]);

        const newTornament = tournament.map((t) => {
            if (t.playIndex !== playIndex) return t;
            
            let played = false;
            const newPlayList = t.playList?.map((list, idx) => {
                if (idx !== index) return list;
        
                if (list.winner === winnerTeam) {
                    const { winner, idx, ...rest } = list; // winner와 idx를 삭제한 새로운 객체
                    return rest;
                } else {
                    played = true;
                    return {
                        ...list,
                        idx: index,
                        winner: winnerTeam,
                    };
                }
            });
        
            return {
                ...t,
                played,
                playList: newPlayList,
            };
        });
        

        setTournament(newTornament)

    
    };

    

    return (
        <Layout pageTitle={title}>
            <TournamentStyle>
                <div>
                    <div className="playType">
                        <h3>팀 배정 방식 선택</h3>
                        <label>
                            <input
                                type="radio"
                                value="복식"
                                checked={mode === "복식"}
                                onChange={handleModeChange}
                            />
                            복식 (2:2)
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="단식"
                                checked={mode === "단식"}
                                onChange={handleModeChange}
                            />
                            단식 (1:1)
                        </label>
                    </div>
                    {mode && (
                       <Player mode={mode} players={players} setPlayers={setPlayers}/>
                    )}
                    <div className="tournament-wrap">
                        <h4>토너먼트 생성</h4>
                        <div className="cnt-wrap">
                            <input 
                            type="number" 
                            value={playCnt} 
                            onChange={(e) =>
                                handlePlayCnt(e)
                            }
                            max={5}
                            min={1}
                            maxLength="1"/>
                            회의 경기를 진행(최대 5회)
                        </div>

                        <div className="btn-wrap">
                            <button
                                onClick={generateTournament}
                                className="btn-add"
                            >
                                토너먼트 생성
                            </button>
                            <button
                                onClick={saveTornament}
                            >
                                토너먼트 저장
                            </button>
                        </div>
                       
                       
                        <PlayList tournament={tournament} moveDown={moveDown} moveUp={moveUp} selectWinner={selectWinner}/>
                        <div className="btn-wrap">
                            <button
                                onClick={deleteTournament}
                                className="btn-delete"
                            >
                                토너먼트 삭제
                            </button>
                            <button onClick={loadTournament}>
                                토너먼트 불러오기
                            </button>
                        </div>
                    </div>

                    {/* <NextPlay winners={winners} mode={mode} tournament={tournament} setWinners={setWinners} setTournament={setTournament}/> */}
                </div>

                <div className="ga">
                    <a href="https://otakukaraoke.com/" target="_blank">
                        경기 한 판 뛰고 노래방 ㄱㄱ?
                        <br />
                        오타쿠 가라오케
                    </a>
                </div>
            </TournamentStyle>
        </Layout>
    );
};

export default Main;
