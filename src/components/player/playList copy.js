import React, { Fragment } from 'react';

const PlayList = ({tournament,selectWinner , moveUp , moveDown}) => {
    return (
        <ul>
            {tournament.map(
                ({ playIndex, playList }, playIndexOuter) => {
                    // playList가 있는지 확인하고, map을 실행
                    return (
                        playList &&
                        playList.length > 0 && (
                            <Fragment key={playIndexOuter}>
                                {playList.map((team, index) => {
                                    const players =
                                        team.players.split(
                                            " vs "
                                        );
                                    return (
                                        <li key={index}>
                                            <span className="playindex-txt">
                                                {playIndex + 1}
                                                번째 경기
                                            </span>
                                            {team.isBYE ? (
                                                `${team.players}`
                                            ) : (
                                                <>
                                                    <span className="tournament-item">
                                                        <em
                                                            onClick={() =>
                                                                selectWinner(
                                                                    players[0],
                                                                    players
                                                                )
                                                            }
                                                        >
                                                            {
                                                                players[0]
                                                            }
                                                        </em>
                                                        vs{" "}
                                                        <em
                                                            onClick={() =>
                                                                selectWinner(
                                                                    players[1],
                                                                    players
                                                                )
                                                            }
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
                            </Fragment>
                        )
                    );
                }
            )}
        </ul>
    );
};

export default PlayList;