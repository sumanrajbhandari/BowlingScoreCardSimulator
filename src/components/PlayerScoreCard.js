import React from 'react'
import { useState } from 'react'

const PlayerScoreCard = ({ playerData }) => {
    //const frameData = playerData.frames.map((frame) => )
    const [cumulativeScore, setcumulativeScore] = useState([])
    return (

        <tr>
            <td style={{ padding: 0 }}>{playerData.playerName}</td>
            {
                playerData.frames.map((frame, index) => (                    
                    <td style={{ padding: 0 }} key={index}>
                        <table className="table table-bordered" style={{ margin: 0 }}>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        {frame.round1Display()}&nbsp;
                                    </td>
                                    <td align="center">
                                        {frame.round2Display()}&nbsp;
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" align="center">{cumulativeScore}&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>

                ))
            }
        </tr>

    )
}

export default PlayerScoreCard
