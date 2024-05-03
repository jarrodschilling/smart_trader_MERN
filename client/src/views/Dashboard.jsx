import { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom"
import CurrentPortfolio from "./CurrentPortfolio";
import DashPortfolio from "../components/DashPortfolio";
import ToDo from "./ToDo"

const DashBoard = (props) => {
    const {startPortValue} = props

    return (
        <div style={{marginBottom: "100px"}}>
            <h1>Dashboard</h1>
            <DashPortfolio startPortValue={startPortValue} />
            <div className="dashboardLinks">
                <button className="dashLinkBtn"><Link className="mainLink" to="/add">Add Trade</Link></button>
                <button className="dashLinkBtn" style={{marginBottom: "20px"}}><Link className="mainLink" to="/ledger">Trade Ledger</Link></button>
            </div>
            <ToDo />

        </div>
    )

}

export default DashBoard