import React from 'react'

const PlayerScoreCard = ({ playerData, isSelected }) => {        
    return (

        <tr>
            <td style={{ verticalAlign: "center", textAlign:"center", backgroundColor: isSelected?"orange":"white" }}>{playerData.playerName}</td>
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
                <td style={{display: index === 9 ? "block" : "none"}}>{frame.lastFrameThirdBowl()}</td>                                 
                                </tr>
                                <tr>
                                    <td colSpan={index === 9 ? 3 : 2} style={{backgroundColor: frame.getTotalScoreColor()}} align="center">{frame.getFrameScoreDisplay()}&nbsp;</td>
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
