import React from 'react';

const NextPlay = ({winners,mode, tournament, setWinners ,setTournament}) => {
    // 다음 경기를 생성하기 위해, 이긴 팀만 추출하여 토너먼트 진행
    const generateNextMatch = () => {
        if (winners.length < 2) {
            alert("두 팀 이상을 선택해야 다음 경기를 진행할 수 있습니다.");
            return;
        }

        // 다음 경기 대진 생성
        let winList = winners;
        const nextMatches = [];

        // 홀수 팀이 있을 경우 마지막 팀은 부전승 처리
        if (winList.length % 2 !== 0) {
            // 마지막 팀은 부전승 처리
            const msg = `${winList[winList.length - 1].join(", ")} (부전승)`;
            nextMatches.push({
                type: mode,
                players: msg,
                match: winList[winList.length - 1],
                isBYE: true,
            });
            // 홀수 팀을 제외하고 대진을 구성
            winList = winList.slice(0, winList.length - 1);
        }

        // 2팀씩 묶어서 경기 대진 생성
        for (let i = 0; i < winList.length; i += 2) {
            if (winList[i + 1]) {
                nextMatches.push({
                    type: mode,
                    players:
                        winList[i].join(", ") +
                        " vs " +
                        winList[i + 1].join(", "),
                    match: [...winList[i], ...winList[i + 1]],
                    isBYE: false,
                });
            }
        }


        setTournament([
            ...tournament,
            {
                playIndex: tournament.length++,
                playList: nextMatches,
            },
        ]);
        setWinners([]);
    };

    return (
        <div className="next-play-wrap">
            <h4>다음 경기를 생성</h4>
            <button
                onClick={() => generateNextMatch()}
                className="btn-add"
            >
                다음 경기 생성
            </button>
        </div>

    );
};

export default NextPlay;