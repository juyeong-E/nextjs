import { styled } from "styled-components";

export const TournamentStyle = styled.section`
    padding: 10px 0;
    max-width: 640px;
    button {
        margin-right: 5px;
        padding: 8px 10px;
        border-radius: 4px;
        min-width: 100px;
    }
    .btn-wrap {
        display: flex;
        justify-content: space-between;
    }
    .btn-delete {
        min-width: auto;
    }
    .btn-add {
        background: #9e9e9e;
        color: #fff;
    }
    .btn-save {
        background: #6397ff;
        color: #fff;
    }
    .btn-load {
        background: #9e9e9e;
        color: #fff;
    }
    .playType {
        padding: 20px;
        h3 {
            margin-bottom: 10px;
            font-size: 18px;
        }
        input {
            width: 18px;
            height: 18px;
            vertical-align: middle;
        }
        label {
            font-size: 16px;
            margin-right: 10px;
        }
    }
    .playerList {
        padding: 20px;
        h3 {
            margin-bottom: 10px;
            font-size: 18px;
        }
        input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
        }
        ul {
            margin-top: 10px;
            margin-bottom: 10px;
            li {
                margin-bottom: 5px;
                label {
                    margin-right: 5px;
                    font-size: 14px;
                }
            }
        }
    }
    .next-play-wrap,
    .tournament-wrap {
        padding: 20px;
        h4 {
            display: block;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 700;
        }
        .btn-up,
        .btn-down {
            min-width: auto;
            border: 1px solid #ddd;
            padding: 4px 6px;
            font-size: 12px;
        }
        .playindex-txt {
            display: inline-block;
            margin-right: 2px;
            color: #999;
        }
        .cnt-wrap{
            margin-bottom: 10px;
            input {
                padding: 10px;
                font-size: 16px;
                border: 1px solid #ddd;
                width:50px;
                text-align: right;
            }
        }
        .tornament-list{
            padding-top:20px;
            min-height: 50px;
        }
        ul {
            margin: 10px 0 20px 0;
            border-bottom:1px solid #ddd;
        }
        li {
            margin-bottom: 10px;
        }
        .tournament-item {
            font-size: 14px;
            em {
                padding: 5px 10px;
            }
            .winner{
                font-weight: 700;
                color:#6397ff;
            }
        }
    }

    .ga {
        padding: 20px;
        a {
            display: block;
            padding: 10px;
            line-height: 1.6;
            font-style: normal;
            text-decoration: auto;
            font-weight: 700;
            border-radius: 8px;
            background: #745fff;
            color: #fff;
        }
    }
`;
