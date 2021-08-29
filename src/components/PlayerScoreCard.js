import React from 'react'
import { useState } from 'react'

const PlayerScoreCard = ({ playerData, isSelected }) => {        
    return (

        <tr>
            <td style={{ verticalAlign: "center", textAlign:"center", backgroundColor: isSelected?"red":"white" }}>{playerData.playerName}</td>
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
                                    <td colSpan="2" style={{backgroundColor: frame.getTotalScoreColor()}} align="center">{frame.getFrameScoreDisplay()}&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                ))                
            }
            <td>{playerData.getTotalScore()}</td>
        </tr>

    )
}

export default PlayerScoreCard
