import React from 'react';

const PlayList = ({tournament,selectWinner , moveUp , moveDown}) => {

    return (
        <div className="tornament-list">
            {tournament.map(
                ({ playIndex, playList, played,additionalPlayersList }, playIndexOuter) => {
                    // playList가 있는지 확인하고, map을 실행
                    return (
                        playList &&
                        playList.length > 0 && (
                            <>
                                <span className="playindex-txt">
                                    {playIndex + 1}
                                    번째 경기.{ }
                                    '{additionalPlayersList.join(",")}' 추가 경기
                                </span>
                                <ul key={playIndexOuter}>
                                    {playList.map((team, index) => {
                                        const players =
                                            team.players.split(
                                                " vs "
                                            );
                                        return (
                                            <li key={index}>
                                                <span className="playindex-txt">
                                                    {index + 1}.
                                                </span>
                                                {team.isBYE ? (
                                                    `${team.players}`
                                                ) : (
                                                    <>
                                                        <span className="tournament-item">
                                                            <em
                                                                onClick={() =>
                                                                    selectWinner(
                                                                        playIndex,
                                                                        index,
                                                                        players[0],
                                                                        players
                                                                    )
                                                                }

                                                                className={team.winner == players[0] ? 'winner' : ''}
                                                            >
                                                                {
                                                                    players[0]
                                                                }
                                                            </em>
                                                            vs{" "}
                                                            <em
                                                                onClick={() =>
                                                                    selectWinner(
                                                                        playIndex,
                                                                        index,
                                                                        players[1],
                                                                        players
                                                                    )
                                                                }
                                                                className={team.winner == players[1] ? 'winner' : ''}
                                                            >
                                                                {
                                                                    players[1]
                                                                }
                                                            </em>
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                moveUp(
                                                                    index,
                                                                    playIndex
                                                                )
                                                            }
                                                            className="btn-up"
                                                        >
                                                            위로
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                moveDown(
                                                                    index,
                                                                    playIndex
                                                                )
                                                            }
                                                            className="btn-down"
                                                        >
                                                            아래로
                                                        </button>
                                                        
                                                    </>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                            
                        )
                    );
                }
            )}
        </div>
    );
};

export default PlayList;